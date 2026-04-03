import { OperationTypeRefs, SdkManifest, SdkNamingStrategyOptions, SdkSecurityRequirementManifest, SdkSecuritySchemeManifest, SemanticModel, ShapeNode } from './types'

import type { GeneratorContext } from './types'
import type { OpenApiDocumentLike, OpenApiSecurityRequirementLike, OpenApiSecuritySchemeLike } from '../types/open-api'
import { NamingSupport } from './NamingSupport'
import { TypeScriptShapeBuilder } from './TypeScriptShapeBuilder'

export class TypeBuilder {
    private naming = new NamingSupport()
    private shapes = new TypeScriptShapeBuilder(this.naming)

    /**
     * Creates a new generator context, which holds the state of the type generation process.
     * 
     * @returns 
     */
    createContext (): GeneratorContext {
        return this.shapes.createContext()
    }

    /**
     * Collects semantic models from the given OpenAPI document, which represent the various 
     * shapes and types that need to be generated for the SDK, along with their associated 
     * metadata such as paths, methods, and roles.
     * 
     * @param document The OpenAPI document to extract semantic models from.
     * @returns An array of semantic models representing the shapes and types for the SDK.
     */
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

    /**
     * Builds the SDK manifest from the given OpenAPI document, using the provided operation 
     * type references and naming strategy options.
     * 
     * @param document              The OpenAPI document to build the SDK manifest from.
     * @param operationTypeRefs     A map of operation type references.
     * @param options               Naming strategy options for the SDK manifest.
     * @returns                     The generated SDK manifest.
     */
    buildSdkManifest (
        document: OpenApiDocumentLike,
        operationTypeRefs: Map<string, OperationTypeRefs>,
        options: SdkNamingStrategyOptions = {}
    ): SdkManifest {
        const sdkGroupNamesBySignature = this.naming.deriveSdkGroupNamesBySignature(document, options.namespaceStrategy ?? 'smart')
        const groups = new Map<string, SdkManifest['groups'][number]>()
        const securitySchemes = this.buildSecuritySchemes(document)
        const globalSecurity = this.buildSecurityRequirements(document.security)

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
                    description: operation.description,
                    operationId: operation.operationId,
                    requestBodyDescription: operation.requestBody?.description,
                    responseDescription: this.resolveSuccessResponseDescription(operation.responses),
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
                    security: this.buildSecurityRequirements(operation.security),
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
            securitySchemes,
            security: globalSecurity,
        }
    }

    /** 
     * Infers a shape node from a given example value, using the provided name hint for 
     * type naming purposes.
     * 
     * @param value         The example value to infer the shape from.
     * @param nameHint      A hint for naming the inferred type.
     * @returns             The inferred shape node.
     */
    inferShapeFromExample (value: unknown, nameHint: string): ShapeNode {
        return this.shapes.inferShapeFromExample(value, nameHint)
    }

    /**
     * Sanitizes a given string to be used as a type name in TypeScript.
     * 
     * @param value The string to sanitize.
     * @returns     The sanitized type name.
     */
    sanitizeTypeName (value: string): string {
        return this.naming.sanitizeTypeName(value)
    }

    /**
     * Registers a shape with a preferred name and returns the assigned type name, ensuring 
     * that it is unique within the given context. 
     * 
     * @param shape             The shape node to register.
     * @param preferredName     The preferred name for the type.
     * @param context           The generator context.
     * @param collisionSuffix   The suffix to use in case of name collisions. 
     * @returns                 The assigned type name.
     */
    registerNamedShape (
        shape: ShapeNode,
        preferredName: string,
        context: GeneratorContext,
        collisionSuffix: string
    ): string {
        return this.shapes.registerNamedShape(shape, preferredName, context, collisionSuffix)
    }

    /**
     * Determines the top-level shape for a given shape and its semantic role, which can 
     * be used for namespace grouping in the generated SDK.
     * 
     * @param shape     The shape node to evaluate.
     * @param role      The semantic role of the shape.
     * @returns         The top-level shape node for the given shape and role.
     */
    namespaceTopLevelShape (shape: ShapeNode, role: SemanticModel['role']): ShapeNode {
        return this.shapes.namespaceTopLevelShape(shape, role)
    }

    /**
     * Registers the given object shape and returns the assigned type name. 
     * 
     * @param shape             The object shape to register.
     * @param preferredName     The preferred name for the type.
     * @param context           The generator context.
     * @param collisionSuffix   The suffix to use in case of name collisions.
     * @param emitAlias         Whether to emit a type alias.
     * @returns                 The assigned type name.
     */
    registerObjectShape (
        shape: Extract<ShapeNode, { kind: 'object' }>,
        preferredName: string,
        context: GeneratorContext,
        collisionSuffix: string,
        emitAlias = false
    ): string {
        return this.shapes.registerObjectShape(shape, preferredName, context, collisionSuffix, emitAlias)
    }

    /**
     * Determines the priority of an operation based on its characteristics, such as the 
     * presence of a request body, which can be used for sorting operations when generating the SDK.
     * 
     * @param operation The operation object to evaluate.
     * @returns         The priority of the operation.
     */
    private getOperationPriority (operation: { requestBody?: unknown }): number {
        return Number(Boolean(operation.requestBody)) * 10
    }

    /**
     * Resolves the description for a successful response from the given responses 
     * object, preferring common success status codes and falling back to any available 
     * description if necessary.
     * 
     * @param responses The responses object to evaluate.
     * @returns         The description of the successful response, or undefined if none is found.
     */
    private resolveSuccessResponseDescription (responses: Record<string, { description: string }>): string | undefined {
        const preferredStatusCodes = ['200', '201', '202', '204']

        for (const statusCode of preferredStatusCodes) {
            const description = responses[statusCode]?.description?.trim()

            if (description) {
                return description
            }
        }

        for (const response of Object.values(responses)) {
            const description = response.description?.trim()

            if (description) {
                return description
            }
        }

        return undefined
    }

    /**
     * Builds the security schemes for the entire API, based on the provided OpenAPI document.
     * 
     * @param document  The OpenAPI document to build the security schemes from.
     * @returns         The security scheme manifest objects.
     */
    private buildSecuritySchemes (document: OpenApiDocumentLike): SdkSecuritySchemeManifest[] {
        return Object.entries(document.components?.securitySchemes ?? {})
            .map(([name, scheme]) => this.createSecuritySchemeManifest(name, scheme))
            .filter((entry): entry is SdkSecuritySchemeManifest => entry !== null)
            .sort((left, right) => left.name.localeCompare(right.name))
    }

    /**
     * Builds the security requirements for an operation or the entire API, based on the 
     * provided OpenAPI security requirement objects.
     * 
     * @param name      The name of the security requirement (used for logging or error messages).
     * @param scheme    The OpenAPI security scheme object to create the manifest from.
     * @returns         The security scheme manifest object, or null if the scheme type is not supported.
     */
    private createSecuritySchemeManifest (
        name: string,
        scheme: OpenApiSecuritySchemeLike
    ): SdkSecuritySchemeManifest | null {
        const helperName = this.createSecurityHelperName(name)

        if (scheme.type === 'apiKey') {
            return {
                name,
                helperName,
                description: scheme.description,
                type: 'apiKey',
                authType: 'apiKey',
                in: scheme.in,
                parameterName: scheme.name,
            }
        }

        if (scheme.type === 'oauth2') {
            return {
                name,
                helperName,
                description: scheme.description,
                type: 'oauth2',
                authType: 'oauth2',
                scopes: this.collectSecurityScopes(scheme),
            }
        }

        if (scheme.type === 'openIdConnect') {
            return {
                name,
                helperName,
                description: scheme.description,
                type: 'openIdConnect',
                authType: 'oauth2',
                openIdConnectUrl: scheme.openIdConnectUrl,
            }
        }

        const normalizedScheme = scheme.scheme.toLowerCase()

        return {
            name,
            helperName,
            description: scheme.description,
            type: 'http',
            authType: normalizedScheme === 'basic' ? 'basic' : 'bearer',
            scheme: scheme.scheme,
            bearerFormat: scheme.bearerFormat,
        }
    }

    /**
     * Builds the security requirements for an operation or the entire API, based on the 
     * provided OpenAPI security requirement objects.
     * 
     * @param requirements    The OpenAPI security requirement objects to build the manifest from.
     * @returns               The security requirement manifest objects, or undefined if none are provided.
     */
    private buildSecurityRequirements (
        requirements?: OpenApiSecurityRequirementLike[]
    ): SdkSecurityRequirementManifest[] | undefined {
        if (!requirements || requirements.length === 0) {
            return undefined
        }

        const normalized = requirements
            .map((requirement) => ({
                schemes: Object.entries(requirement)
                    .map(([name, scopes]) => ({
                        name,
                        scopes: [...scopes].sort(),
                    }))
                    .sort((left, right) => left.name.localeCompare(right.name)),
            }))
            .filter((requirement) => requirement.schemes.length > 0)

        return normalized.length > 0 ? normalized : undefined
    }

    private collectSecurityScopes (
        scheme: Extract<OpenApiSecuritySchemeLike, { type: 'oauth2' }>
    ): string[] | undefined {
        const scopes = new Set<string>()

        for (const flow of Object.values(scheme.flows ?? {})) {
            for (const scope of Object.keys(flow.scopes ?? {})) {
                scopes.add(scope)
            }
        }

        return scopes.size > 0 ? Array.from(scopes).sort() : undefined
    }

    private createSecurityHelperName (name: string): string {
        const sanitized = this.naming.sanitizeTypeName(name)

        return sanitized.endsWith('Auth')
            ? `create${sanitized}`
            : `create${sanitized}Auth`
    }
}