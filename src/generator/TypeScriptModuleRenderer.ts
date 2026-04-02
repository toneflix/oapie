import { Declaration, InterfaceDeclaration, OperationTypeRefs, ShapeNode } from './types'

import type { OpenApiDocumentLike } from '../types/open-api'

export class TypeScriptModuleRenderer {
    /**
     * Render a TypeScript declaration (interface, type alias, or shape alias) into its 
     * string representation.
     * 
     * @param declaration 
     * @returns 
     */
    renderDeclaration (declaration: Declaration): string {
        switch (declaration.kind) {
            case 'interface':
                return this.renderInterface(declaration)
            case 'interface-alias':
                return `export interface ${declaration.name} extends ${declaration.target} {}`
            case 'type-alias':
                return `export type ${declaration.name} = ${declaration.target}`
            case 'shape-alias':
                return `export type ${declaration.name} = ${this.renderShape(declaration.shape)}`
        }
    }

    /**
     * Render the TypeScript type definitions for an OpenAPI document, including the main 
     * document structure and the individual operation definitions, using the provided type 
     * references for each operation.
     * 
     * @param rootTypeName 
     * @param document 
     * @param operationTypeRefs 
     * @returns 
     */
    renderOpenApiDocumentDefinitions (
        rootTypeName: string,
        document: OpenApiDocumentLike,
        operationTypeRefs: Map<string, OperationTypeRefs>
    ): string {
        const pathDeclarations = Object.entries(document.paths).map(([path, operations]) => {
            const pathTypeName = this.derivePathTypeName(path)
            const operationDeclarations = Object.keys(operations).map((method) => {
                const operationTypeName = this.deriveOperationInterfaceName(path, method)
                const refs = operationTypeRefs.get(`${path}::${method}`) ?? {
                    response: 'Record<string, never>',
                    responseExample: 'unknown',
                    input: 'Record<string, never>',
                    query: 'Record<string, never>',
                    header: 'Record<string, never>',
                    params: 'Record<string, never>',
                }

                return `export interface ${operationTypeName} extends OpenApiOperationDefinition<${refs.response}, ${refs.responseExample}, ${refs.input}, ${refs.query}, ${refs.header}, ${refs.params}> {}`
            }).join('\n\n')
            const pathBody = Object.keys(operations)
                .map((method) => `  ${method}: ${this.deriveOperationInterfaceName(path, method)}`)
                .join('\n')

            return [
                operationDeclarations,
                `export interface ${pathTypeName} {\n${pathBody}\n}`,
            ].join('\n\n')
        }).join('\n\n')
        const pathsBody = Object.keys(document.paths)
            .map((path) => `  ${this.formatPropertyKey(path)}: ${this.derivePathTypeName(path)}`)
            .join('\n')

        return [
            'export interface OpenApiInfo {\n  title: string\n  version: string\n}',
            'export interface OpenApiSchemaDefinition {\n  type?: string\n  description?: string\n  default?: unknown\n  properties?: Record<string, OpenApiSchemaDefinition>\n  items?: OpenApiSchemaDefinition\n  required?: string[]\n  example?: unknown\n}',
            'export interface OpenApiParameterDefinition {\n  name: string\n  in: \'query\' | \'header\' | \'path\' | \'cookie\'\n  required?: boolean\n  description?: string\n  schema?: OpenApiSchemaDefinition\n  example?: unknown\n}',
            'export interface OpenApiMediaTypeDefinition<TExample = unknown> {\n  schema?: OpenApiSchemaDefinition\n  example?: TExample\n}',
            'export interface OpenApiResponseDefinition<TResponse = unknown, TExample = unknown> {\n  description: string\n  content?: Record<string, OpenApiMediaTypeDefinition<TExample>>\n}',
            'export interface OpenApiRequestBodyDefinition<TInput = unknown> {\n  required: boolean\n  content: Record<string, OpenApiMediaTypeDefinition<TInput>>\n}',
            'export interface OpenApiOperationDefinition<TResponse = unknown, TResponseExample = unknown, TInput = Record<string, never>, TQuery = Record<string, never>, THeader = Record<string, never>, TParams = Record<string, never>> {\n  summary?: string\n  description?: string\n  operationId?: string\n  parameters?: OpenApiParameterDefinition[]\n  requestBody?: OpenApiRequestBodyDefinition<TInput>\n  responses: Record<string, OpenApiResponseDefinition<TResponse, TResponseExample>>\n}',
            pathDeclarations,
            `export interface Paths {\n${pathsBody}\n}`,
            `export interface ${rootTypeName} {\n  openapi: '3.1.0'\n  info: OpenApiInfo\n  paths: Paths\n}`,
        ].join('\n\n')
    }

    /**
     * Render a value into a string representation suitable for inclusion in TypeScript 
     * type definitions,
     * 
     * @param value 
     * @returns 
     */
    renderValue (value: unknown): string {
        return JSON.stringify(value, null, 2)
    }

    /**
     * Convert a string to camelCase, sanitizing it to create a valid TypeScript identifier.
     * 
     * @param value 
     * @returns 
     */
    toCamelCase (value: string): string {
        const typeName = this.sanitizeTypeName(value)

        return typeName.charAt(0).toLowerCase() + typeName.slice(1)
    }

    private renderInterface (declaration: InterfaceDeclaration): string {
        const body = declaration.properties
            .map((property) => `  ${this.formatPropertyKey(property.key)}${property.optional ? '?' : ''}: ${this.renderShape(property.shape)}`)
            .join('\n')

        return `export interface ${declaration.name} {\n${body}\n}`
    }

    private renderShape (shape: ShapeNode): string {
        switch (shape.kind) {
            case 'primitive':
                return shape.type
            case 'array':
                return `${this.wrapUnion(this.renderShape(shape.item))}[]`
            case 'union':
                return shape.types.map((entry) => this.renderShape(entry)).join(' | ')
            case 'object':
                return this.inlineObjectShape(shape)
        }
    }

    private inlineObjectShape (shape: Extract<ShapeNode, { kind: 'object' }>): string {
        if (shape.properties.length === 0) {
            return 'Record<string, never>'
        }

        return `{ ${shape.properties.map((property) => `${this.formatPropertyKey(property.key)}${property.optional ? '?' : ''}: ${this.renderShape(property.shape)}`).join('; ')} }`
    }

    private wrapUnion (value: string): string {
        return value.includes(' | ') ? `(${value})` : value
    }

    private derivePathTypeName (path: string): string {
        const segments = path
            .split('/')
            .map((segment) => segment.trim())
            .filter(Boolean)
            .filter((segment) => !/^v\d+$/i.test(segment))
            .map((segment) => this.isPathParam(segment) ? `by ${this.stripPathParam(segment)}` : segment)

        return `${this.sanitizeTypeName(segments.join(' '))}Path`
    }

    private deriveOperationInterfaceName (path: string, method: string): string {
        return `${this.derivePathTypeName(path)}${this.sanitizeTypeName(method)}Operation`
    }

    private sanitizeTypeName (value: string): string {
        const normalized = value.replace(/[^A-Za-z0-9]+/g, ' ').trim()

        if (!normalized) {
            return 'GeneratedEntity'
        }

        const pascalCased = normalized
            .split(/\s+/)
            .filter(Boolean)
            .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
            .join('')

        return /^[A-Za-z_$]/.test(pascalCased) ? pascalCased : `Type${pascalCased}`
    }

    private formatPropertyKey (key: string): string {
        return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
            ? key
            : `'${key.replace(/\\/g, String.raw`\\`).replace(/'/g, String.raw`\'`)}'`
    }

    private isPathParam (segment: string): boolean {
        return segment.startsWith('{') && segment.endsWith('}')
    }

    private stripPathParam (segment: string): string {
        return segment.replace(/^\{/, '').replace(/\}$/, '')
    }
}