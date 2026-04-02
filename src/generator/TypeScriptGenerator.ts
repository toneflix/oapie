import { JsonLike, OperationTypeRefs, SdkNamingStrategyOptions, ShapeAliasDeclaration } from './types'

import type { OpenApiDocumentLike } from '../types/open-api'
import { TypeScriptModuleRenderer } from './TypeScriptModuleRenderer'
import { TypeScriptTypeBuilder } from './TypeScriptTypeBuilder'

export class TypeScriptGenerator {
    private typeBuilder = new TypeScriptTypeBuilder()
    private moduleRenderer = new TypeScriptModuleRenderer()

    /**
     * Static helper method to generate a TypeScript module string from a generic JSON-like 
     * value, inferring types and creating type definitions as needed, using the provided root 
     * type name.
     * 
     * @param value 
     * @param rootTypeName 
     * @returns 
     */
    static generateModule = (
        value: JsonLike,
        rootTypeName = 'GeneratedOutput',
        options: SdkNamingStrategyOptions = {}
    ): string => {
        return new TypeScriptGenerator().generate(value, rootTypeName, options)
    }

    /**
     * Generate a TypeScript module string from a generic JSON-like value, inferring types 
     * and creating type definitions as needed.
     * 
     * @param value 
     * @param rootTypeName 
     * @returns 
     */
    generate (value: JsonLike, rootTypeName = 'GeneratedOutput', options: SdkNamingStrategyOptions = {}): string {
        if (this.isOpenApiDocumentLike(value)) {
            return this.generateModule(value, rootTypeName, options)
        }

        return this.generateGenericModule(value, rootTypeName)
    }

    /**
     * Generate a TypeScript module string from an OpenAPI document, including type definitions
     * 
     * @param document 
     * @param rootTypeName 
     * @returns 
     */
    generateModule (document: OpenApiDocumentLike, rootTypeName: string, options: SdkNamingStrategyOptions = {}): string {
        const context = this.typeBuilder.createContext()
        const operationTypeRefs = new Map<string, OperationTypeRefs>()

        for (const model of this.typeBuilder.collectSemanticModels(document)) {
            const operationKey = `${model.path}::${model.method}`
            const resolvedName = this.typeBuilder.registerNamedShape(
                this.typeBuilder.namespaceTopLevelShape(model.shape, model.role),
                model.name,
                context,
                model.collisionSuffix,
            )
            const existingRefs = operationTypeRefs.get(operationKey) ?? {
                response: 'Record<string, never>',
                responseExample: 'unknown',
                input: 'Record<string, never>',
                query: 'Record<string, never>',
                header: 'Record<string, never>',
                params: 'Record<string, never>',
            }

            existingRefs[model.role] = resolvedName
            operationTypeRefs.set(operationKey, existingRefs)
        }

        const declarations = context.declarations
            .map((declaration) => this.moduleRenderer.renderDeclaration(declaration))
            .join('\n\n')
        const variableName = this.moduleRenderer.toCamelCase(rootTypeName)
        const sdkManifest = this.typeBuilder.buildSdkManifest(document, operationTypeRefs, options)

        return [
            declarations,
            this.moduleRenderer.renderOpenApiDocumentDefinitions(rootTypeName, document, operationTypeRefs),
            this.moduleRenderer.renderSdkApiInterface(rootTypeName, sdkManifest),
            this.moduleRenderer.renderSdkManifest(variableName, sdkManifest),
            `export const ${variableName}: ${rootTypeName} = ${this.moduleRenderer.renderValue(document)}`,
            this.moduleRenderer.renderSdkBundle(variableName, rootTypeName),
            '',
            `export default ${variableName}`,
        ].filter(Boolean).join('\n\n')
    }

    private generateGenericModule (value: JsonLike, rootTypeName: string): string {
        const context = this.typeBuilder.createContext()
        const rootShape = this.typeBuilder.inferShapeFromExample(value, rootTypeName)
        const rootSanitizedName = this.typeBuilder.sanitizeTypeName(rootTypeName)
        let rootType = rootSanitizedName

        if (rootShape.kind === 'object') {
            rootType = this.typeBuilder.registerObjectShape(rootShape, rootSanitizedName, context, rootSanitizedName)
        } else {
            const declaration: ShapeAliasDeclaration = {
                kind: 'shape-alias',
                name: rootSanitizedName,
                shape: rootShape,
            }

            context.declarations.push(declaration)
            context.declarationByName.set(rootSanitizedName, declaration)
        }

        const rootAlias = rootType === rootTypeName ? '' : `export type ${rootTypeName} = ${rootType}`
        const variableName = this.moduleRenderer.toCamelCase(rootTypeName)

        return [
            context.declarations.map((declaration) => this.moduleRenderer.renderDeclaration(declaration)).join('\n\n'),
            rootAlias,
            `export const ${variableName}: ${rootTypeName} = ${this.moduleRenderer.renderValue(value)}`,
            '',
            `export default ${variableName}`,
        ].filter(Boolean).join('\n\n')
    }

    private isOpenApiDocumentLike (value: unknown): value is OpenApiDocumentLike {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            return false
        }

        const candidate = value as Record<string, unknown>

        if (typeof candidate.info !== 'object' || candidate.info === null || Array.isArray(candidate.info)) {
            return false
        }

        const info = candidate.info as Record<string, unknown>

        return candidate.openapi === '3.1.0'
            && typeof info.title === 'string'
            && typeof info.version === 'string'
            && typeof candidate.paths === 'object'
            && candidate.paths !== null
            && !Array.isArray(candidate.paths)
    }
}