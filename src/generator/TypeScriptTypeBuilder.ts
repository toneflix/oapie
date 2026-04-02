import { GeneratorContext, InterfaceAliasDeclaration, InterfaceDeclaration, OperationTypeRefs, PayloadSchemaCandidate, SdkGroupManifest, SdkManifest, SdkOperationManifest, SdkParameterManifest, SemanticModel, ShapeAliasDeclaration, ShapeNode, ShapeProperty } from './types'
import type { OpenApiDocumentLike, OpenApiMediaType, OpenApiOperationLike, OpenApiParameterLike, OpenApiResponse, OpenApiSchema } from '../types/open-api'

export class TypeScriptTypeBuilder {
    static contextualTailSegments = new Set([
        'history',
        'status',
        'detail',
        'details',
    ])

    static nestedContextSegments = new Set([
        'account',
        'accounts',
        'transaction',
        'transactions',
        'wallet',
        'wallets',
        'virtual-account',
        'virtual-accounts',
        'history',
    ])

    static roleSuffixes = ['Input', 'Query', 'Header', 'Params'] as const

    private get emptyObjectShape (): Extract<ShapeNode, { kind: 'object' }> {
        return this.createObjectShape([])
    }

    /**
     * Create a new generator context to hold type declarations and naming state during the 
     * generation process.
     * 
     * @returns A new generator context.
     */
    createContext (): GeneratorContext {
        return {
            declarations: [],
            declarationByName: new Map(),
            nameBySignature: new Map(),
            usedNames: new Set(),
        }
    }

    /**
     * Collect semantic models from the provided OpenAPI document.
     * 
     * @param document 
     * @returns 
     */
    collectSemanticModels (document: OpenApiDocumentLike): SemanticModel[] {
        const models: SemanticModel[] = []

        for (const [path, operations] of Object.entries(document.paths)) {
            const naming = this.deriveOperationNaming(path)
            const baseName = naming.baseName
            const sortedOperations = Object.entries(operations).sort(([, leftOperation], [, rightOperation]) => {
                return this.getOperationPriority(rightOperation) - this.getOperationPriority(leftOperation)
            })

            for (const [method, operation] of sortedOperations) {
                const collisionSuffix = naming.collisionSuffix || this.fallbackCollisionSuffix(method, path, baseName)

                models.push({ path, method, name: baseName, role: 'response', shape: this.getSuccessResponseShape(operation.responses), collisionSuffix })
                models.push({ path, method, name: `${baseName}ResponseExample`, role: 'responseExample', shape: this.getResponseExampleShape(operation.responses), collisionSuffix })
                models.push({ path, method, name: `${baseName}Input`, role: 'input', shape: this.getRequestInputShape(operation.requestBody), collisionSuffix })
                models.push({ path, method, name: `${baseName}Query`, role: 'query', shape: this.createParameterGroupShape(operation.parameters, 'query'), collisionSuffix })
                models.push({ path, method, name: `${baseName}Header`, role: 'header', shape: this.createParameterGroupShape(operation.parameters, 'header'), collisionSuffix })
                models.push({ path, method, name: `${baseName}Params`, role: 'params', shape: this.createParameterGroupShape(operation.parameters, 'path'), collisionSuffix })
            }
        }

        return models
    }

    buildSdkManifest (
        document: OpenApiDocumentLike,
        operationTypeRefs: Map<string, OperationTypeRefs>
    ): SdkManifest {
        const sdkGroupNamesBySignature = this.deriveSdkGroupNamesBySignature(document)
        const groups = new Map<string, SdkGroupManifest>()

        for (const [path, operations] of Object.entries(document.paths)) {
            const staticSignature = this.getStaticPathSegments(path).join('/')
            const sdkGroupName = sdkGroupNamesBySignature.get(staticSignature) ?? 'Resource'
            const className = sdkGroupName
            const propertyName = this.toCamelCase(this.pluralize(className))
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
                    methodName: this.deriveSdkMethodName(method, path),
                    summary: operation.summary,
                    operationId: operation.operationId,
                    responseType: this.resolveSdkResponseType(operation.responses, refs.response),
                    inputType: refs.input,
                    queryType: refs.query,
                    headerType: refs.header,
                    paramsType: refs.params,
                    hasBody: Boolean(operation.requestBody),
                    bodyRequired: operation.requestBody?.required ?? false,
                    pathParams: this.createSdkParameterManifest(operation.parameters, 'path'),
                    queryParams: this.createSdkParameterManifest(operation.parameters, 'query'),
                    headerParams: this.createSdkParameterManifest(operation.parameters, 'header'),
                })
            }

            groups.set(propertyName, group)
        }

        return {
            groups: Array.from(groups.values())
                .map((group) => ({
                    ...group,
                    operations: this.ensureUniqueSdkMethodNames(group.operations),
                }))
                .sort((left, right) => left.propertyName.localeCompare(right.propertyName)),
        }
    }

    /**
     * Infer a TypeScript type shape from the provided example value, using the name hint to 
     * generate meaningful type names for nested structures.
     * 
     * @param value The example value to infer the type from.
     * @param nameHint A hint for generating meaningful type names for nested structures.
     * @returns The inferred TypeScript type shape.
     */
    inferShapeFromExample (value: unknown, nameHint: string): ShapeNode {
        if (value === null) {
            return { kind: 'primitive', type: 'null' }
        }

        if (Array.isArray(value)) {
            if (value.length === 0) {
                return { kind: 'array', item: { kind: 'primitive', type: 'unknown' } }
            }

            const itemShapes = this.dedupeShapes(value.map((entry) => this.inferShapeFromExample(entry, this.singularize(nameHint))))

            return {
                kind: 'array',
                item: itemShapes.length === 1 ? itemShapes[0] : { kind: 'union', types: itemShapes },
            }
        }

        if (this.isRecord(value)) {
            return this.createObjectShape(Object.entries(value)
                .sort(([left], [right]) => left.localeCompare(right))
                .map(([key, entry]) => ({
                    key,
                    optional: false,
                    shape: this.inferShapeFromExample(entry, key),
                })))
        }

        switch (typeof value) {
            case 'string':
                return { kind: 'primitive', type: 'string' }
            case 'number':
                return { kind: 'primitive', type: 'number' }
            case 'boolean':
                return { kind: 'primitive', type: 'boolean' }
            default:
                return { kind: 'primitive', type: 'unknown' }
        }
    }

    /**
     * Sanitize a string to create a valid TypeScript type name.
     * 
     * @param value 
     * @returns 
     */
    sanitizeTypeName (value: string): string {
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

    /**
     * Check if a value is a record (i.e., a non-null object that is not an array).
     * 
     * @param shape 
     * @param preferredName 
     * @param context 
     * @param collisionSuffix 
     * @returns 
     */
    registerNamedShape (
        shape: ShapeNode,
        preferredName: string,
        context: GeneratorContext,
        collisionSuffix: string
    ): string {
        if (shape.kind === 'object') {
            return this.registerObjectShape(shape, preferredName, context, collisionSuffix, true)
        }

        const name = this.createUniqueTypeName(preferredName, context, collisionSuffix)
        const declaration: ShapeAliasDeclaration = {
            kind: 'shape-alias',
            name,
            shape: this.prepareNestedShape(shape, preferredName, context),
        }

        context.declarations.push(declaration)
        context.declarationByName.set(name, declaration)

        return name
    }

    /**
     * Check if a value is a record (i.e., a non-null object that is not an array).
     * 
     * @param shape 
     * @param role 
     * @returns 
     */
    namespaceTopLevelShape (shape: ShapeNode, role: SemanticModel['role']): ShapeNode {
        if (shape.kind !== 'object') {
            return shape
        }

        return {
            ...shape,
            signature: `${role}:${shape.signature}`,
        }
    }

    /**
     * Create a new object shape with the provided properties.
     * 
     * @param shape 
     * @param preferredName 
     * @param context 
     * @param collisionSuffix 
     * @param emitAlias 
     * @returns 
     */
    registerObjectShape (
        shape: Extract<ShapeNode, { kind: 'object' }>,
        preferredName: string,
        context: GeneratorContext,
        collisionSuffix: string,
        emitAlias = false
    ): string {
        const existingName = context.nameBySignature.get(shape.signature)
        const compatibleDeclaration = this.findCompatibleObjectDeclaration(shape, preferredName, context)

        if (existingName) {
            if (emitAlias && existingName !== preferredName && !context.declarationByName.has(preferredName)) {
                const aliasName = this.createUniqueTypeName(preferredName, context, collisionSuffix)

                if (aliasName !== existingName) {
                    const aliasDeclaration: InterfaceAliasDeclaration = {
                        kind: 'interface-alias',
                        name: aliasName,
                        target: existingName,
                    }

                    context.declarations.push(aliasDeclaration)
                    context.declarationByName.set(aliasName, aliasDeclaration)
                }
            }

            return existingName
        }

        if (compatibleDeclaration) {
            if (this.isObjectShapeAssignableTo(shape, compatibleDeclaration.rawShape)) {
                context.nameBySignature.set(shape.signature, compatibleDeclaration.name)

                return compatibleDeclaration.name
            }

            const mergedShape = this.mergeObjectShapes(compatibleDeclaration.rawShape, shape)

            compatibleDeclaration.rawShape = mergedShape
            compatibleDeclaration.properties = mergedShape.properties.map((property) => ({
                ...property,
                shape: this.prepareNestedShape(property.shape, property.key, context),
            }))
            context.nameBySignature.set(shape.signature, compatibleDeclaration.name)
            context.nameBySignature.set(mergedShape.signature, compatibleDeclaration.name)

            return compatibleDeclaration.name
        }

        const declarationName = this.createUniqueTypeName(preferredName, context, collisionSuffix)
        const declaration: InterfaceDeclaration = {
            kind: 'interface',
            name: declarationName,
            baseName: this.sanitizeTypeName(preferredName),
            rawShape: shape,
            properties: [],
        }

        context.nameBySignature.set(shape.signature, declarationName)
        context.declarations.push(declaration)
        context.declarationByName.set(declarationName, declaration)

        declaration.properties = shape.properties.map((property) => ({
            ...property,
            shape: this.prepareNestedShape(property.shape, property.key, context),
        }))

        return declarationName
    }

    private getOperationPriority (operation: OpenApiOperationLike): number {
        return Number(Boolean(operation.requestBody)) * 10
    }

    private resolveSdkResponseType (responses: Record<string, OpenApiResponse>, fallbackType: string): string {
        const successResponse = Object.entries(responses)
            .filter(([statusCode]) => /^2\d\d$/.test(statusCode))
            .sort(([left], [right]) => left.localeCompare(right))[0]?.[1]

        if (!successResponse) {
            return fallbackType
        }

        const mediaType = this.getPreferredMediaType(successResponse.content)

        if (!mediaType) {
            return fallbackType
        }

        const payload = this.resolveResponsePayloadSchema(mediaType.schema, mediaType.example)
        const responseSchema = payload.schema ?? mediaType.schema

        return responseSchema && this.resolveSchemaType(responseSchema) === 'array'
            ? `${fallbackType}[]`
            : fallbackType
    }

    private getSuccessResponseShape (responses: Record<string, OpenApiResponse>): ShapeNode {
        const successResponse = Object.entries(responses)
            .filter(([statusCode]) => /^2\d\d$/.test(statusCode))
            .sort(([left], [right]) => left.localeCompare(right))[0]?.[1]

        if (!successResponse) {
            return this.emptyObjectShape
        }

        const mediaType = this.getPreferredMediaType(successResponse.content)

        if (!mediaType) {
            return this.emptyObjectShape
        }

        const payload = this.resolveResponsePayloadSchema(mediaType.schema, mediaType.example)

        if (!payload.schema) {
            return this.schemaToShape(mediaType.schema, 'Response', mediaType.example)
        }

        if (this.resolveSchemaType(payload.schema) === 'array') {
            return this.schemaToShape(payload.schema.items, 'Item', this.extractExampleArrayItem(payload.example))
        }

        return this.schemaToShape(payload.schema, 'Response', payload.example)
    }

    private getRequestInputShape (requestBody: OpenApiOperationLike['requestBody']): ShapeNode {
        if (!requestBody) {
            return this.emptyObjectShape
        }

        const mediaType = this.getPreferredMediaType(requestBody.content)

        if (!mediaType) {
            return this.emptyObjectShape
        }

        return this.schemaToShape(mediaType.schema, 'Input', mediaType.example)
    }

    private getResponseExampleShape (responses: Record<string, OpenApiResponse>): ShapeNode {
        const shapes = Object.entries(responses)
            .sort(([left], [right]) => left.localeCompare(right))
            .flatMap(([, response]) => {
                const mediaType = this.getPreferredMediaType(response.content)

                if (!mediaType) {
                    return []
                }

                const fullExample = mediaType.example ?? mediaType.schema?.example

                if (mediaType.schema) {
                    return [this.schemaToShape(mediaType.schema, 'ResponseExample', fullExample)]
                }

                if (fullExample !== undefined) {
                    return [this.inferShapeFromExample(fullExample, 'ResponseExample')]
                }

                return []
            })
        const uniqueShapes = this.dedupeShapes(shapes)

        if (uniqueShapes.length === 0) {
            return { kind: 'primitive', type: 'unknown' }
        }

        return uniqueShapes.length === 1 ? uniqueShapes[0] : { kind: 'union', types: uniqueShapes }
    }

    private createParameterGroupShape (
        parameters: OpenApiParameterLike[] | undefined,
        location: OpenApiParameterLike['in']
    ): ShapeNode {
        const relevantParameters = (parameters ?? [])
            .filter((parameter) => parameter.in === location)
            .sort((left, right) => left.name.localeCompare(right.name))

        if (relevantParameters.length === 0) {
            return this.emptyObjectShape
        }

        return this.createObjectShape(relevantParameters.map((parameter) => ({
            key: parameter.name,
            optional: !(parameter.required ?? false),
            shape: this.schemaToShape(parameter.schema, parameter.name, parameter.example),
        })))
    }

    private findCompatibleObjectDeclaration (
        shape: Extract<ShapeNode, { kind: 'object' }>,
        preferredName: string,
        context: GeneratorContext
    ): InterfaceDeclaration | undefined {
        const baseName = this.sanitizeTypeName(preferredName)

        return context.declarations.find((declaration): declaration is InterfaceDeclaration => {
            if (declaration.kind !== 'interface' || declaration.baseName !== baseName) {
                return false
            }

            return this.isObjectShapeAssignableTo(shape, declaration.rawShape)
                || this.isObjectShapeAssignableTo(declaration.rawShape, shape)
                || this.canMergeObjectShapes(declaration.rawShape, shape)
        })
    }

    private canMergeObjectShapes (
        left: Extract<ShapeNode, { kind: 'object' }>,
        right: Extract<ShapeNode, { kind: 'object' }>
    ): boolean {
        const keys = new Set([...left.properties.map((property) => property.key), ...right.properties.map((property) => property.key)])

        for (const key of keys) {
            const leftProperty = left.properties.find((property) => property.key === key)
            const rightProperty = right.properties.find((property) => property.key === key)

            if (!leftProperty || !rightProperty) {
                const property = leftProperty ?? rightProperty

                if (!property?.optional) {
                    return false
                }

                continue
            }

            if (!this.canMergeShapes(leftProperty.shape, rightProperty.shape)) {
                return false
            }
        }

        return true
    }

    private isObjectShapeAssignableTo (
        source: Extract<ShapeNode, { kind: 'object' }>,
        target: Extract<ShapeNode, { kind: 'object' }>
    ): boolean {
        const targetProperties = new Map(target.properties.map((property) => [property.key, property]))

        for (const sourceProperty of source.properties) {
            const targetProperty = targetProperties.get(sourceProperty.key)

            if (!targetProperty) {
                return false
            }

            if (sourceProperty.optional && !targetProperty.optional) {
                return false
            }

            if (!this.isShapeAssignableTo(sourceProperty.shape, targetProperty.shape)) {
                return false
            }
        }

        return target.properties.every((targetProperty) => {
            return source.properties.some((sourceProperty) => sourceProperty.key === targetProperty.key)
                || targetProperty.optional
        })
    }

    private isShapeAssignableTo (source: ShapeNode, target: ShapeNode): boolean {
        if (target.kind === 'union') {
            return target.types.some((targetType) => this.isShapeAssignableTo(source, targetType))
        }

        switch (source.kind) {
            case 'primitive':
                if (target.kind !== 'primitive') {
                    return false
                }

                return source.type === target.type
            case 'array':
                if (target.kind !== 'array') {
                    return false
                }

                return this.isShapeAssignableTo(source.item, target.item)
            case 'union':
                return source.types.every((sourceType) => this.isShapeAssignableTo(sourceType, target))
            case 'object':
                if (target.kind !== 'object') {
                    return false
                }

                return this.isObjectShapeAssignableTo(source, target)
        }
    }

    private canMergeShapes (left: ShapeNode, right: ShapeNode): boolean {
        if (left.kind === 'union') {
            return left.types.every((leftType) => this.canMergeShapes(leftType, right))
        }

        if (right.kind === 'union') {
            return right.types.every((rightType) => this.canMergeShapes(left, rightType))
        }

        if (left.kind === 'primitive' && right.kind === 'primitive') {
            return true
        }

        if (left.kind === 'array' && right.kind === 'array') {
            return this.canMergeShapes(left.item, right.item)
        }

        if (left.kind === 'object' && right.kind === 'object') {
            return this.canMergeObjectShapes(left, right)
        }

        return false
    }

    private mergeObjectShapes (
        left: Extract<ShapeNode, { kind: 'object' }>,
        right: Extract<ShapeNode, { kind: 'object' }>
    ): Extract<ShapeNode, { kind: 'object' }> {
        const keys = new Set([...left.properties.map((property) => property.key), ...right.properties.map((property) => property.key)])

        return this.createObjectShape(Array.from(keys).map((key) => {
            const leftProperty = left.properties.find((property) => property.key === key)
            const rightProperty = right.properties.find((property) => property.key === key)

            if (leftProperty && rightProperty) {
                return {
                    key,
                    optional: leftProperty.optional || rightProperty.optional,
                    shape: this.mergeShapes(leftProperty.shape, rightProperty.shape),
                }
            }

            const property = leftProperty ?? rightProperty

            return {
                key,
                optional: true,
                shape: property!.shape,
            }
        }))
    }

    private mergeShapes (left: ShapeNode, right: ShapeNode): ShapeNode {
        if (left.kind === 'union' || right.kind === 'union') {
            return this.createUnionShape(left, right)
        }

        if (left.kind !== right.kind) {
            return this.createUnionShape(left, right)
        }

        switch (left.kind) {
            case 'primitive':
                return right.kind === 'primitive' && left.type === right.type ? left : this.createUnionShape(left, right)
            case 'array':
                if (right.kind !== 'array') {
                    return left
                }

                return {
                    kind: 'array',
                    item: this.mergeShapes(left.item, right.item),
                }
            case 'object':
                if (right.kind !== 'object') {
                    return left
                }

                return this.mergeObjectShapes(left, right)
        }
    }

    private createUnionShape (...shapes: ShapeNode[]): ShapeNode {
        const flattened = shapes.flatMap((shape) => shape.kind === 'union' ? shape.types : [shape])
        const deduped = this.dedupeShapes(flattened)

        return deduped.length === 1
            ? deduped[0]
            : { kind: 'union', types: deduped }
    }

    private prepareNestedShape (shape: ShapeNode, keyHint: string, context: GeneratorContext): ShapeNode {
        if (shape.kind === 'object') {
            const name = this.registerObjectShape(
                shape,
                this.sanitizeTypeName(this.singularize(keyHint)),
                context,
                this.sanitizeTypeName(keyHint),
            )

            return { kind: 'primitive', type: name }
        }

        if (shape.kind === 'array') {
            return {
                kind: 'array',
                item: this.prepareNestedShape(shape.item, this.singularize(keyHint), context),
            }
        }

        if (shape.kind === 'union') {
            return {
                kind: 'union',
                types: shape.types.map((entry) => this.prepareNestedShape(entry, keyHint, context)),
            }
        }

        return shape
    }

    private schemaToShape (
        schema: OpenApiSchema | undefined,
        nameHint: string,
        fallbackExample?: unknown
    ): ShapeNode {
        if (!schema) {
            return this.inferShapeFromExample(fallbackExample, nameHint)
        }

        const schemaType = this.resolveSchemaType(schema)

        if (schemaType === 'array') {
            return {
                kind: 'array',
                item: this.schemaToShape(schema.items, this.singularize(nameHint), this.extractExampleArrayItem(schema.example) ?? this.extractExampleArrayItem(fallbackExample)),
            }
        }

        if (schemaType === 'object') {
            const propertyExamples = this.isRecord(schema.example)
                ? schema.example
                : this.isRecord(fallbackExample)
                    ? fallbackExample
                    : undefined
            const properties = Object.entries(schema.properties ?? {})
                .sort(([left], [right]) => left.localeCompare(right))
                .map(([key, entry]) => ({
                    key,
                    optional: !(schema.required ?? []).includes(key),
                    shape: this.schemaToShape(entry, key, propertyExamples?.[key]),
                }))

            if (properties.length > 0) {
                return this.createObjectShape(properties)
            }

            return this.inferShapeFromExample(schema.example ?? fallbackExample, nameHint)
        }

        if (schemaType === 'integer' || schemaType === 'number') {
            return { kind: 'primitive', type: 'number' }
        }

        if (schemaType === 'string') {
            return { kind: 'primitive', type: 'string' }
        }

        if (schemaType === 'boolean') {
            return { kind: 'primitive', type: 'boolean' }
        }

        if (schema.example === null || fallbackExample === null) {
            return { kind: 'primitive', type: 'null' }
        }

        if (schema.example !== undefined || fallbackExample !== undefined) {
            return this.inferShapeFromExample(schema.example ?? fallbackExample, nameHint)
        }

        return { kind: 'primitive', type: 'unknown' }
    }

    private dedupeShapes (shapes: ShapeNode[]): ShapeNode[] {
        const seen = new Set<string>()

        return shapes.filter((shape) => {
            const signature = this.getShapeSignature(shape)

            if (seen.has(signature)) {
                return false
            }

            seen.add(signature)

            return true
        })
    }

    private createObjectShape (properties: ShapeProperty[]): Extract<ShapeNode, { kind: 'object' }> {
        const normalizedProperties = properties
            .map((property) => ({ ...property }))
            .sort((left, right) => left.key.localeCompare(right.key))
        const signature = JSON.stringify(normalizedProperties.map((property) => ({
            key: property.key,
            optional: property.optional,
            shape: this.getShapeSignature(property.shape),
        })))

        return {
            kind: 'object',
            signature,
            properties: normalizedProperties,
        }
    }

    private getShapeSignature (shape: ShapeNode): string {
        switch (shape.kind) {
            case 'primitive':
                return `primitive:${shape.type}`
            case 'array':
                return `array:${this.getShapeSignature(shape.item)}`
            case 'union':
                return `union:${shape.types.map((entry) => this.getShapeSignature(entry)).join('|')}`
            case 'object':
                return `object:${shape.signature}`
        }
    }

    private getPreferredMediaType (
        content: Record<string, OpenApiMediaType> | undefined
    ): OpenApiMediaType | undefined {
        if (!content) {
            return undefined
        }

        return content['application/json']
            ?? content['application/*+json']
            ?? Object.values(content)[0]
    }

    private resolveResponsePayloadSchema (
        schema: OpenApiSchema | undefined,
        example: unknown
    ): PayloadSchemaCandidate {
        for (const path of [['data'], ['meta', 'data']]) {
            const candidate = this.getSchemaCandidateAtPath(schema, example, path)

            if (candidate) {
                return candidate
            }
        }

        return {}
    }

    private getSchemaCandidateAtPath (
        schema: OpenApiSchema | undefined,
        example: unknown,
        path: string[]
    ): PayloadSchemaCandidate | undefined {
        const schemaAtPath = this.getSchemaAtPath(schema, path)
        const exampleAtPath = this.getExampleAtPath(example, path)

        if (!schemaAtPath && exampleAtPath === undefined) {
            return undefined
        }

        if (schemaAtPath) {
            return {
                schema: schemaAtPath.example === undefined && exampleAtPath !== undefined
                    ? { ...schemaAtPath, example: exampleAtPath }
                    : schemaAtPath,
                example: exampleAtPath ?? schemaAtPath.example,
            }
        }

        return {
            schema: {
                ...this.inferSchemaTypeFromExample(exampleAtPath),
                example: exampleAtPath,
            },
            example: exampleAtPath,
        }
    }

    private getSchemaAtPath (
        schema: OpenApiSchema | undefined,
        path: string[]
    ): OpenApiSchema | undefined {
        let currentSchema = schema

        for (const segment of path) {
            if (!currentSchema?.properties?.[segment]) {
                return undefined
            }

            currentSchema = currentSchema.properties[segment]
        }

        return currentSchema
    }

    private getExampleAtPath (example: unknown, path: string[]): unknown {
        let currentValue = example

        for (const segment of path) {
            if (!this.isRecord(currentValue) || !(segment in currentValue)) {
                return undefined
            }

            currentValue = currentValue[segment]
        }

        return currentValue
    }

    private inferSchemaTypeFromExample (value: unknown): OpenApiSchema {
        if (Array.isArray(value)) {
            const itemSchema = value
                .map((entry) => this.inferSchemaTypeFromExample(entry))
                .find((entry) => this.hasSchemaDetails(entry))

            return {
                type: 'array',
                items: itemSchema ?? {},
            }
        }

        if (this.isRecord(value)) {
            return {
                type: 'object',
                properties: Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, this.inferSchemaTypeFromExample(entry)])),
            }
        }

        if (typeof value === 'string') {
            return { type: 'string' }
        }

        if (typeof value === 'number') {
            return { type: 'number' }
        }

        if (typeof value === 'boolean') {
            return { type: 'boolean' }
        }

        return {}
    }

    private hasSchemaDetails (schema: OpenApiSchema | undefined): boolean {
        return Boolean(
            schema?.type
            || schema?.properties
            || schema?.items
            || schema?.example !== undefined
        )
    }

    private resolveSchemaType (schema: OpenApiSchema): string | undefined {
        return schema.type ?? (schema.properties ? 'object' : undefined)
    }

    private extractExampleArrayItem (value: unknown): unknown {
        return Array.isArray(value) ? value[0] : undefined
    }

    private createUniqueTypeName (preferredName: string, context: GeneratorContext, collisionSuffix: string): string {
        const baseName = this.sanitizeTypeName(preferredName) || 'GeneratedEntity'
        const collisionName = this.sanitizeTypeName(collisionSuffix)
        let candidate = baseName
        let suffix = 2

        if (!context.usedNames.has(candidate)) {
            context.usedNames.add(candidate)

            return candidate
        }

        candidate = this.insertCollisionSuffix(baseName, collisionName)

        if (!context.usedNames.has(candidate)) {
            context.usedNames.add(candidate)

            return candidate
        }

        while (context.usedNames.has(candidate)) {
            candidate = `${baseName}${suffix}`
            suffix += 1
        }

        context.usedNames.add(candidate)

        return candidate
    }

    private deriveOperationNaming (path: string): { baseName: string, collisionSuffix: string } {
        const pathSegments = this.getNormalizedPathSegments(path)
        const staticSegments = pathSegments.filter((segment) => !this.isPathParam(segment)).map((segment) => this.singularize(segment))
        const paramSegments = pathSegments.filter((segment) => this.isPathParam(segment)).map((segment) => this.singularize(this.stripPathParam(segment)))
        const tailSegment = staticSegments[staticSegments.length - 1] ?? 'resource'
        const parentSegment = staticSegments[staticSegments.length - 2] ?? null
        const hasPathParamBeforeTail = pathSegments.slice(0, -1).some((segment) => this.isPathParam(segment))
        const shouldPrefixParent = Boolean(
            parentSegment
            && (
                TypeScriptTypeBuilder.contextualTailSegments.has(tailSegment.toLowerCase())
                || (hasPathParamBeforeTail && TypeScriptTypeBuilder.nestedContextSegments.has(tailSegment.toLowerCase()))
            )
        )
        const baseName = this.sanitizeTypeName(shouldPrefixParent ? `${parentSegment} ${tailSegment}` : tailSegment)
        const collisionSuffix = paramSegments.length > 0
            ? `By ${paramSegments.map((segment) => this.sanitizeTypeName(segment)).join(' And ')}`
            : parentSegment && !shouldPrefixParent
                ? this.sanitizeTypeName(parentSegment)
                : ''

        return {
            baseName,
            collisionSuffix,
        }
    }

    private fallbackCollisionSuffix (method: string, path: string, baseName: string): string {
        const pathSegments = this.getNormalizedPathSegments(path)
        const staticSegments = pathSegments.filter((segment) => !this.isPathParam(segment))
        const tailSegment = staticSegments[staticSegments.length - 1] ?? ''
        const hasParams = pathSegments.some((segment) => this.isPathParam(segment))

        if (method === 'get' && !hasParams && /s$/i.test(tailSegment)) {
            return 'List'
        }

        if (method === 'post' && !hasParams) {
            return 'Create'
        }

        if ((method === 'put' || method === 'patch') && hasParams) {
            return 'Update'
        }

        if (method === 'delete') {
            return 'Delete'
        }

        return `${this.sanitizeTypeName(method)}${baseName}`
    }

    private insertCollisionSuffix (baseName: string, collisionName: string): string {
        if (!collisionName) {
            return baseName
        }

        for (const roleSuffix of TypeScriptTypeBuilder.roleSuffixes) {
            if (baseName.endsWith(roleSuffix) && baseName.length > roleSuffix.length) {
                return `${baseName.slice(0, -roleSuffix.length)}${collisionName}${roleSuffix}`
            }
        }

        return `${baseName}${collisionName}`
    }

    private deriveSdkGroupNamesBySignature (document: OpenApiDocumentLike): Map<string, string> {
        const entries = Array.from(new Set(Object.keys(document.paths).map((path) => this.getStaticPathSignature(path))))
            .map((signature) => {
                const staticSegments = signature.split('/').filter(Boolean)

                return {
                    signature,
                    staticSegments,
                    candidates: this.buildSdkGroupNameCandidates(signature),
                }
            })
            .sort((left, right) => {
                return left.staticSegments.length - right.staticSegments.length
                    || left.signature.localeCompare(right.signature)
            })

        const groupNamesBySignature = new Map<string, string>()
        const usedNames = new Set<string>()

        for (const entry of entries) {
            const className = entry.candidates.find((candidate) => !usedNames.has(candidate))
                ?? this.createUniqueSdkGroupName(entry.candidates[entry.candidates.length - 1] ?? 'Resource', usedNames)

            usedNames.add(className)
            groupNamesBySignature.set(entry.signature, className)
        }

        return groupNamesBySignature
    }

    private buildSdkGroupNameCandidates (staticSignature: string): string[] {
        const staticSegments = staticSignature.split('/').filter(Boolean)
        const defaultName = this.deriveOperationNaming(`/${staticSegments.join('/')}`).baseName
        const contextualNames = staticSegments
            .map((_, index, segments) => this.sanitizeTypeName(segments.slice(index).join(' ')))
            .reverse()

        return Array.from(new Set([defaultName, ...contextualNames].filter(Boolean)))
    }

    private createUniqueSdkGroupName (baseName: string, usedNames: Set<string>): string {
        let suffix = 2
        let candidate = baseName

        while (usedNames.has(candidate)) {
            candidate = `${baseName}${suffix}`
            suffix += 1
        }

        return candidate
    }

    private getNormalizedPathSegments (path: string): string[] {
        return path
            .split('/')
            .map((segment) => segment.trim())
            .filter(Boolean)
            .filter((segment) => !/^v\d+$/i.test(segment))
    }

    private getStaticPathSegments (path: string): string[] {
        return this.getNormalizedPathSegments(path)
            .filter((segment) => !this.isPathParam(segment))
            .map((segment) => this.singularize(segment))
    }

    private getStaticPathSignature (path: string): string {
        return this.getStaticPathSegments(path).join('/')
    }

    private isPathParam (segment: string): boolean {
        return segment.startsWith('{') && segment.endsWith('}')
    }

    private stripPathParam (segment: string): string {
        return segment.replace(/^\{/, '').replace(/\}$/, '')
    }

    private singularize (value: string): string {
        if (/ies$/i.test(value)) {
            return `${value.slice(0, -3)}y`
        }

        if (/(sses|shes|ches|xes|zes)$/i.test(value)) {
            return value.slice(0, -2)
        }

        if (value.endsWith('s') && !value.endsWith('ss') && value.length > 1) {
            return value.slice(0, -1)
        }

        return value
    }

    private pluralize (value: string): string {
        if (/y$/i.test(value)) {
            return `${value.slice(0, -1)}ies`
        }

        if (/s$/i.test(value)) {
            return value
        }

        return `${value}s`
    }

    private toCamelCase (value: string): string {
        const typeName = this.sanitizeTypeName(value)

        return typeName.charAt(0).toLowerCase() + typeName.slice(1)
    }

    private deriveSdkMethodName (method: string, path: string): string {
        const hasPathParams = path.split('/').some((segment) => this.isPathParam(segment))

        if (method === 'get') {
            return hasPathParams ? 'get' : 'list'
        }

        if (method === 'post') {
            return 'create'
        }

        if (method === 'patch' || method === 'put') {
            return 'update'
        }

        if (method === 'delete') {
            return 'delete'
        }

        return this.toCamelCase(this.sanitizeTypeName(method))
    }

    private ensureUniqueSdkMethodNames (operations: SdkOperationManifest[]): SdkOperationManifest[] {
        const counts = new Map<string, number>()

        return operations.map((operation) => {
            const count = counts.get(operation.methodName) ?? 0

            counts.set(operation.methodName, count + 1)

            if (count === 0) {
                return operation
            }

            const suffix = this.sanitizeTypeName(this.fallbackCollisionSuffix(operation.method.toLowerCase(), operation.path, 'Operation'))

            return {
                ...operation,
                methodName: `${operation.methodName}${suffix}`,
            }
        })
    }

    private createSdkParameterManifest (
        parameters: OpenApiParameterLike[] | undefined,
        location: 'query' | 'header' | 'path'
    ): SdkParameterManifest[] {
        return (parameters ?? [])
            .filter((parameter) => parameter.in === location)
            .sort((left, right) => left.name.localeCompare(right.name))
            .map((parameter) => ({
                name: parameter.name,
                accessor: this.toParameterAccessor(parameter.name),
                in: location,
                required: parameter.required ?? false,
            }))
    }

    private toParameterAccessor (value: string): string {
        const normalized = value
            .replace(/[^A-Za-z0-9]+/g, ' ')
            .trim()

        if (!normalized) {
            return 'value'
        }

        const [first, ...rest] = normalized
            .split(/\s+/)
            .filter(Boolean)

        const camelValue = [
            first.toLowerCase(),
            ...rest.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()),
        ].join('')

        return /^[A-Za-z_$]/.test(camelValue) ? camelValue : `value${camelValue}`
    }

    private isRecord (value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null && !Array.isArray(value)
    }
}