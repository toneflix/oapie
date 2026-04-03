import { Declaration, InterfaceDeclaration, OperationTypeRefs, SdkManifest, SdkOperationManifest, ShapeNode } from './types'

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
            'export interface OpenApiResponseDefinition<_TResponse = unknown, TExample = unknown> {\n  description: string\n  content?: Record<string, OpenApiMediaTypeDefinition<TExample>>\n}',
            'export interface OpenApiRequestBodyDefinition<TInput = unknown> {\n  description?: string\n  required: boolean\n  content: Record<string, OpenApiMediaTypeDefinition<TInput>>\n}',
            'export interface OpenApiOperationDefinition<_TResponse = unknown, TResponseExample = unknown, TInput = Record<string, never>, _TQuery = Record<string, never>, _THeader = Record<string, never>, _TParams = Record<string, never>> {\n  summary?: string\n  description?: string\n  operationId?: string\n  parameters?: OpenApiParameterDefinition[]\n  requestBody?: OpenApiRequestBodyDefinition<TInput>\n  responses: Record<string, OpenApiResponseDefinition<_TResponse, TResponseExample>>\n}',
            'export interface OpenApiSdkParameterManifest {\n  name: string\n  accessor: string\n  in: \'query\' | \'header\' | \'path\'\n  required: boolean\n  description?: string\n}',
            'export interface OpenApiSdkOperationManifest {\n  path: string\n  method: \'GET\' | \'POST\' | \'PUT\' | \'PATCH\' | \'DELETE\'\n  methodName: string\n  summary?: string\n  description?: string\n  operationId?: string\n  requestBodyDescription?: string\n  responseDescription?: string\n  responseType: string\n  inputType: string\n  queryType: string\n  headerType: string\n  paramsType: string\n  hasBody: boolean\n  bodyRequired: boolean\n  pathParams: OpenApiSdkParameterManifest[]\n  queryParams: OpenApiSdkParameterManifest[]\n  headerParams: OpenApiSdkParameterManifest[]\n}',
            'export interface OpenApiSdkGroupManifest {\n  className: string\n  propertyName: string\n  operations: OpenApiSdkOperationManifest[]\n}',
            'export interface OpenApiSdkManifest {\n  groups: OpenApiSdkGroupManifest[]\n}',
            'export interface OpenApiRuntimeBundle<TApi = unknown> {\n  document: unknown\n  manifest: OpenApiSdkManifest\n  __api?: TApi\n}',
            pathDeclarations,
            `export interface Paths {\n${pathsBody}\n}`,
            `export interface ${rootTypeName} {\n  openapi: '3.1.0'\n  info: OpenApiInfo\n  paths: Paths\n}`,
        ].join('\n\n')
    }

    renderSdkApiInterface (rootTypeName: string, manifest: SdkManifest): string {
        const groupBodies = manifest.groups.map((group) => {
            const methods = group.operations
                .map((operation) => `    ${operation.methodName}${this.renderSdkMethodSignature(operation)}`)
                .join('\n')

            return `  ${group.propertyName}: {\n${methods}\n  }`
        }).join('\n')

        return `export interface ${rootTypeName}Api {\n${groupBodies}\n}`
    }

    renderSdkManifest (variableName: string, manifest: SdkManifest): string {
        return `export const ${variableName}Manifest = ${this.renderValue(manifest)} as const satisfies OpenApiSdkManifest`
    }

    renderSdkBundle (variableName: string, rootTypeName: string): string {
        return [
            `export const ${variableName}Sdk: OpenApiRuntimeBundle<${rootTypeName}Api> = {`,
            `  document: ${variableName},`,
            `  manifest: ${variableName}Manifest,`,
            '}',
        ].join('\n')
    }

    /**
     * Render a value into a string representation suitable for inclusion in TypeScript 
     * type definitions,
     * 
     * @param value 
     * @returns 
     */
    renderValue (value: unknown): string {
        return this.renderLiteral(value, 0)
    }

    renderOpenApiDocumentValue (document: OpenApiDocumentLike): string {
        return this.renderLiteral(this.normalizeOpenApiDocument(document), 0)
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
            : `'${this.escapeStringLiteral(key)}'`
    }

    private renderSdkMethodSignature (operation: SdkOperationManifest): string {
        const args: string[] = []

        if (operation.pathParams.length > 0) {
            args.push(`(params: ${operation.paramsType}`)
        }

        if (operation.queryParams.length > 0) {
            args.push(`${args.length === 0 ? '(' : ', '}query: ${operation.queryType}`)
        }

        if (operation.hasBody) {
            args.push(`${args.length === 0 ? '(' : ', '}body${operation.bodyRequired ? '' : '?'}: ${operation.inputType}`)
        }

        if (operation.headerParams.length > 0) {
            args.push(`${args.length === 0 ? '(' : ', '}headers?: ${operation.headerType}`)
        }

        if (args.length === 0) {
            return `(): Promise<${operation.responseType}>`
        }

        return `${args.join('')}): Promise<${operation.responseType}>`
    }

    private renderLiteral (value: unknown, indentLevel: number): string {
        if (value === null) {
            return 'null'
        }

        if (typeof value === 'string') {
            return `'${this.escapeStringLiteral(value)}'`
        }

        if (typeof value === 'number' || typeof value === 'boolean') {
            return String(value)
        }

        if (Array.isArray(value)) {
            if (value.length === 0) {
                return '[]'
            }

            const nextIndent = this.indent(indentLevel + 1)
            const currentIndent = this.indent(indentLevel)

            return `[\n${value.map((entry) => `${nextIndent}${this.renderLiteral(entry, indentLevel + 1)}`).join(',\n')}\n${currentIndent}]`
        }

        if (typeof value === 'object') {
            const entries = Object.entries(value)

            if (entries.length === 0) {
                return '{}'
            }

            const nextIndent = this.indent(indentLevel + 1)
            const currentIndent = this.indent(indentLevel)

            return `{\n${entries.map(([key, entry]) => `${nextIndent}${this.formatPropertyKey(key)}: ${this.renderLiteral(entry, indentLevel + 1)}`).join(',\n')}\n${currentIndent}}`
        }

        return 'undefined'
    }

    private normalizeOpenApiDocument (document: OpenApiDocumentLike): OpenApiDocumentLike {
        return this.normalizeObject(document, (key, value, parent) => {
            if (key === 'example' && parent && typeof parent === 'object' && !Array.isArray(parent)) {
                const owner = parent as Record<string, unknown>

                if (owner.schema && this.isPlainObject(owner.schema)) {
                    return this.normalizeExample(value, owner.schema as Record<string, unknown>)
                }

                if (this.isSchemaLike(owner)) {
                    return this.normalizeExample(value, owner)
                }
            }

            return value
        }) as OpenApiDocumentLike
    }

    private normalizeObject (
        value: unknown,
        transform: (key: string, value: unknown, parent: unknown) => unknown
    ): unknown {
        if (Array.isArray(value)) {
            return value
                .map((entry) => this.normalizeObject(entry, transform))
                .filter((entry) => entry !== undefined)
        }

        if (!this.isPlainObject(value)) {
            return value
        }

        const output: Record<string, unknown> = {}

        for (const [key, entry] of Object.entries(value)) {
            const transformed = transform(key, entry, value)
            const normalized = this.normalizeObject(transformed, transform)

            if (normalized !== undefined) {
                output[key] = normalized
            }
        }

        return output
    }

    private normalizeExample (example: unknown, schema: Record<string, unknown>): unknown {
        if (example === undefined) {
            return undefined
        }

        const type = typeof schema.type === 'string' ? schema.type : undefined

        if (type === 'string') {
            if (typeof example === 'string') return example
            if (typeof example === 'number' || typeof example === 'boolean') return String(example)

            return undefined
        }

        if (type === 'number' || type === 'integer') {
            if (typeof example === 'number') return example
            if (typeof example === 'string' && example.trim() !== '' && Number.isFinite(Number(example))) {
                return Number(example)
            }

            return undefined
        }

        if (type === 'boolean') {
            if (typeof example === 'boolean') return example
            if (example === 'true') return true
            if (example === 'false') return false

            return undefined
        }

        if (type === 'array') {
            if (!Array.isArray(example)) {
                return undefined
            }

            const itemSchema = this.isPlainObject(schema.items) ? schema.items as Record<string, unknown> : undefined

            if (!itemSchema) {
                return example
            }

            return example
                .map((entry) => this.normalizeExample(entry, itemSchema))
                .filter((entry) => entry !== undefined)
        }

        if (type === 'object') {
            if (!this.isPlainObject(example)) {
                return undefined
            }

            const properties = this.isPlainObject(schema.properties)
                ? schema.properties as Record<string, Record<string, unknown>>
                : {}
            const required = Array.isArray(schema.required)
                ? schema.required.filter((entry): entry is string => typeof entry === 'string')
                : []
            const normalized: Record<string, unknown> = {}

            for (const [key, entry] of Object.entries(example)) {
                const propertySchema = properties[key]
                const normalizedEntry = propertySchema
                    ? this.normalizeExample(entry, propertySchema)
                    : entry

                if (normalizedEntry !== undefined) {
                    normalized[key] = normalizedEntry
                }
            }

            for (const requiredKey of required) {
                if (requiredKey in normalized) {
                    continue
                }

                const propertySchema = properties[requiredKey]

                if (!propertySchema) {
                    return undefined
                }

                const fallback = propertySchema.default !== undefined
                    ? this.normalizeExample(propertySchema.default, propertySchema)
                    : propertySchema.example !== undefined
                        ? this.normalizeExample(propertySchema.example, propertySchema)
                        : undefined

                if (fallback === undefined) {
                    return undefined
                }

                normalized[requiredKey] = fallback
            }

            return normalized
        }

        return example
    }

    private isPlainObject (value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null && !Array.isArray(value)
    }

    private isSchemaLike (value: Record<string, unknown>): boolean {
        return 'type' in value
            || 'properties' in value
            || 'items' in value
            || 'required' in value
            || 'default' in value
    }

    private indent (level: number): string {
        return '  '.repeat(level)
    }

    private escapeStringLiteral (value: string): string {
        return value
            .replace(/\\/g, String.raw`\\`)
            .replace(/'/g, String.raw`\'`)
            .replace(/\r/g, String.raw`\r`)
            .replace(/\n/g, String.raw`\n`)
            .replace(/\t/g, String.raw`\t`)
            .replace(/\f/g, String.raw`\f`)
            // eslint-disable-next-line no-control-regex
            .replace(/\x08/g, String.raw`\b`)
            .replace(/\u2028/g, String.raw`\u2028`)
            .replace(/\u2029/g, String.raw`\u2029`)
    }

    private isPathParam (segment: string): boolean {
        return (segment.startsWith('{') && segment.endsWith('}'))
            || /^:[A-Za-z0-9_]+$/.test(segment)
    }

    private stripPathParam (segment: string): string {
        return segment
            .replace(/^\{/, '')
            .replace(/\}$/, '')
            .replace(/^:/, '')
    }
}