import { OperationTypeRefs, SdkManifest, SdkNamingStrategyOptions, SemanticModel, ShapeNode } from './types'

import type { GeneratorContext } from './types'
import type { OpenApiDocumentLike } from '../types/open-api'
import { TypeScriptNamingSupport } from './TypeScriptNamingSupport'
import { TypeScriptShapeBuilder } from './TypeScriptShapeBuilder'

export class TypeScriptTypeBuilder {
    private naming = new TypeScriptNamingSupport()
    private shapes = new TypeScriptShapeBuilder(this.naming)

    createContext (): GeneratorContext {
        return this.shapes.createContext()
    }

    collectSemanticModels (document: OpenApiDocumentLike): SemanticModel[] {
        const models: SemanticModel[] = []

        for (const [path, operations] of Object.entries(document.paths)) {
            const naming = this.naming.deriveOperationNaming(path)
            const baseName = naming.baseName
            const sortedOperations = Object.entries(operations).sort(([, leftOperation], [, rightOperation]) => {
                return this.getOperationPriority(rightOperation) - this.getOperationPriority(leftOperation)
            })

            for (const [method, operation] of sortedOperations) {
                const collisionSuffix = naming.collisionSuffix || this.naming.fallbackCollisionSuffix(method, path, baseName)

                models.push({ path, method, name: baseName, role: 'response', shape: this.shapes.getSuccessResponseShape(operation.responses), collisionSuffix })
                models.push({ path, method, name: `${baseName}ResponseExample`, role: 'responseExample', shape: this.shapes.getResponseExampleShape(operation.responses), collisionSuffix })
                models.push({ path, method, name: `${baseName}Input`, role: 'input', shape: this.shapes.getRequestInputShape(operation.requestBody), collisionSuffix })
                models.push({ path, method, name: `${baseName}Query`, role: 'query', shape: this.shapes.createParameterGroupShape(operation.parameters, 'query', path), collisionSuffix })
                models.push({ path, method, name: `${baseName}Header`, role: 'header', shape: this.shapes.createParameterGroupShape(operation.parameters, 'header', path), collisionSuffix })
                models.push({ path, method, name: `${baseName}Params`, role: 'params', shape: this.shapes.createParameterGroupShape(operation.parameters, 'path', path), collisionSuffix })
            }
        }

        return models
    }

    buildSdkManifest (
        document: OpenApiDocumentLike,
        operationTypeRefs: Map<string, OperationTypeRefs>,
        options: SdkNamingStrategyOptions = {}
    ): SdkManifest {
        const sdkGroupNamesBySignature = this.naming.deriveSdkGroupNamesBySignature(document, options.namespaceStrategy ?? 'smart')
        const groups = new Map<string, SdkManifest['groups'][number]>()

        for (const [path, operations] of Object.entries(document.paths)) {
            const staticSignature = this.naming.getStaticPathSegments(path).join('/')
            const sdkGroupName = sdkGroupNamesBySignature.get(staticSignature) ?? 'Resource'
            const className = sdkGroupName
            const propertyName = this.naming.toCamelCase(this.naming.pluralize(className))
            const group = groups.get(propertyName) ?? {
                className,
                propertyName,
                operations: [],
            }

            for (const [method, operation] of Object.entries(operations)) {
                const refs = operationTypeRefs.get(`${path}::${method}`) ?? {
                    response: 'Record<string, never>',
                    responseExample: 'unknown',
                    input: 'Record<string, never>',
                    query: 'Record<string, never>',
                    header: 'Record<string, never>',
                    params: 'Record<string, never>',
                }

                group.operations.push({
                    path,
                    method: method.toUpperCase(),
                    methodName: this.naming.deriveSdkMethodName(method, path, operation, options.methodStrategy ?? 'smart'),
                    summary: operation.summary,
                    operationId: operation.operationId,
                    responseType: this.shapes.resolveSdkResponseType(operation.responses, refs.response),
                    inputType: refs.input,
                    queryType: refs.query,
                    headerType: refs.header,
                    paramsType: refs.params,
                    hasBody: Boolean(operation.requestBody),
                    bodyRequired: operation.requestBody?.required ?? false,
                    pathParams: this.naming.createSdkParameterManifest(operation.parameters, 'path', path),
                    queryParams: this.naming.createSdkParameterManifest(operation.parameters, 'query', path),
                    headerParams: this.naming.createSdkParameterManifest(operation.parameters, 'header', path),
                })
            }

            groups.set(propertyName, group)
        }

        return {
            groups: Array.from(groups.values())
                .map((group) => ({
                    ...group,
                    operations: this.naming.ensureUniqueSdkMethodNames(group.operations),
                }))
                .sort((left, right) => left.propertyName.localeCompare(right.propertyName)),
        }
    }

    inferShapeFromExample (value: unknown, nameHint: string): ShapeNode {
        return this.shapes.inferShapeFromExample(value, nameHint)
    }

    sanitizeTypeName (value: string): string {
        return this.naming.sanitizeTypeName(value)
    }

    registerNamedShape (
        shape: ShapeNode,
        preferredName: string,
        context: GeneratorContext,
        collisionSuffix: string
    ): string {
        return this.shapes.registerNamedShape(shape, preferredName, context, collisionSuffix)
    }

    namespaceTopLevelShape (shape: ShapeNode, role: SemanticModel['role']): ShapeNode {
        return this.shapes.namespaceTopLevelShape(shape, role)
    }

    registerObjectShape (
        shape: Extract<ShapeNode, { kind: 'object' }>,
        preferredName: string,
        context: GeneratorContext,
        collisionSuffix: string,
        emitAlias = false
    ): string {
        return this.shapes.registerObjectShape(shape, preferredName, context, collisionSuffix, emitAlias)
    }

    private getOperationPriority (operation: { requestBody?: unknown }): number {
        return Number(Boolean(operation.requestBody)) * 10
    }
}