import type { OpenApiDocumentLike, OpenApiMediaType, OpenApiOperationLike, OpenApiParameterLike, OpenApiResponse, OpenApiSchema } from '../types/open-api'

type JsonLike = null | boolean | number | string | JsonLike[] | { [key: string]: JsonLike }

type ShapeNode =
    | { kind: 'primitive', type: string }
    | { kind: 'array', item: ShapeNode }
    | { kind: 'object', signature: string, properties: ShapeProperty[] }
    | { kind: 'union', types: ShapeNode[] }

interface ShapeProperty {
    key: string
    optional: boolean
    shape: ShapeNode
}

interface InterfaceDeclaration {
    kind: 'interface'
    name: string
    baseName: string
    rawShape: Extract<ShapeNode, { kind: 'object' }>
    properties: ShapeProperty[]
}

interface InterfaceAliasDeclaration {
    kind: 'interface-alias'
    name: string
    target: string
}

interface TypeReferenceAliasDeclaration {
    kind: 'type-alias'
    name: string
    target: string
}

interface ShapeAliasDeclaration {
    kind: 'shape-alias'
    name: string
    shape: ShapeNode
}

type Declaration =
    | InterfaceDeclaration
    | InterfaceAliasDeclaration
    | TypeReferenceAliasDeclaration
    | ShapeAliasDeclaration

interface GeneratorContext {
    declarations: Declaration[]
    declarationByName: Map<string, Declaration>
    nameBySignature: Map<string, string>
    usedNames: Set<string>
}

interface SemanticModel {
    path: string
    method: string
    name: string
    role: 'response' | 'responseExample' | 'input' | 'query' | 'header' | 'params'
    shape: ShapeNode
    collisionSuffix: string
}

interface OperationTypeRefs {
    response: string
    responseExample: string
    input: string
    query: string
    header: string
    params: string
}

interface PayloadSchemaCandidate {
    schema?: OpenApiSchema
    example?: unknown
}

const emptyObjectShape = createObjectShape([])

export const generateTypeScriptModule = (
    value: JsonLike,
    rootTypeName = 'GeneratedOutput'
): string => {
    if (isOpenApiDocumentLike(value)) {
        return generateOpenApiTypeScriptModule(value, rootTypeName)
    }

    return generateGenericTypeScriptModule(value, rootTypeName)
}

const generateOpenApiTypeScriptModule = (
    document: OpenApiDocumentLike,
    rootTypeName: string
): string => {
    const context: GeneratorContext = {
        declarations: [],
        declarationByName: new Map(),
        nameBySignature: new Map(),
        usedNames: new Set(),
    }

    const operationTypeRefs = new Map<string, OperationTypeRefs>()

    for (const model of collectSemanticModels(document)) {
        const operationKey = `${model.path}::${model.method}`
        const resolvedName = registerNamedShape(namespaceTopLevelShape(model.shape, model.role), model.name, context, model.collisionSuffix)
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
        .map((declaration) => renderDeclaration(declaration))
        .join('\n\n')
    const variableName = toCamelCase(rootTypeName)

    return [
        declarations,
        renderOpenApiDocumentDefinitions(rootTypeName, document, operationTypeRefs),
        `export const ${variableName}: ${rootTypeName} = ${JSON.stringify(document, null, 2)}`,
        '',
        `export default ${variableName}`,
    ].filter(Boolean).join('\n\n')
}

const collectSemanticModels = (document: OpenApiDocumentLike): SemanticModel[] => {
    const models: SemanticModel[] = []

    for (const [path, operations] of Object.entries(document.paths)) {
        const naming = deriveOperationNaming(path)
        const baseName = naming.baseName
        const sortedOperations = Object.entries(operations).sort(([, leftOperation], [, rightOperation]) => {
            return getOperationPriority(rightOperation) - getOperationPriority(leftOperation)
        })

        for (const [method, operation] of sortedOperations) {
            const collisionSuffix = naming.collisionSuffix || fallbackCollisionSuffix(method, path, baseName)

            models.push({ path, method, name: baseName, role: 'response', shape: getSuccessResponseShape(operation.responses), collisionSuffix })
            models.push({ path, method, name: `${baseName}ResponseExample`, role: 'responseExample', shape: getResponseExampleShape(operation.responses), collisionSuffix })
            models.push({ path, method, name: `${baseName}Input`, role: 'input', shape: getRequestInputShape(operation.requestBody), collisionSuffix })
            models.push({ path, method, name: `${baseName}Query`, role: 'query', shape: createParameterGroupShape(operation.parameters, 'query'), collisionSuffix })
            models.push({ path, method, name: `${baseName}Header`, role: 'header', shape: createParameterGroupShape(operation.parameters, 'header'), collisionSuffix })
            models.push({ path, method, name: `${baseName}Params`, role: 'params', shape: createParameterGroupShape(operation.parameters, 'path'), collisionSuffix })
        }
    }

    return models
}

const getOperationPriority = (operation: OpenApiOperationLike): number => {
    return Number(Boolean(operation.requestBody)) * 10
}

const getSuccessResponseShape = (responses: Record<string, OpenApiResponse>): ShapeNode => {
    const successResponse = Object.entries(responses)
        .filter(([statusCode]) => /^2\d\d$/.test(statusCode))
        .sort(([left], [right]) => left.localeCompare(right))[0]?.[1]

    if (!successResponse) {
        return emptyObjectShape
    }

    const mediaType = getPreferredMediaType(successResponse.content)

    if (!mediaType) {
        return emptyObjectShape
    }

    const payload = resolveResponsePayloadSchema(mediaType.schema, mediaType.example)

    if (!payload.schema) {
        return schemaToShape(mediaType.schema, 'Response', mediaType.example)
    }

    if (resolveSchemaType(payload.schema) === 'array') {
        return schemaToShape(payload.schema.items, 'Item', extractExampleArrayItem(payload.example))
    }

    return schemaToShape(payload.schema, 'Response', payload.example)
}

const getRequestInputShape = (requestBody: OpenApiOperationLike['requestBody']): ShapeNode => {
    if (!requestBody) {
        return emptyObjectShape
    }

    const mediaType = getPreferredMediaType(requestBody.content)

    if (!mediaType) {
        return emptyObjectShape
    }

    return schemaToShape(mediaType.schema, 'Input', mediaType.example)
}

const getResponseExampleShape = (responses: Record<string, OpenApiResponse>): ShapeNode => {
    const shapes = Object.entries(responses)
        .sort(([left], [right]) => left.localeCompare(right))
        .flatMap(([, response]) => {
            const mediaType = getPreferredMediaType(response.content)

            if (!mediaType) {
                return []
            }

            const fullExample = mediaType.example ?? mediaType.schema?.example

            if (mediaType.schema) {
                return [schemaToShape(mediaType.schema, 'ResponseExample', fullExample)]
            }

            if (fullExample !== undefined) {
                return [inferShapeFromExample(fullExample, 'ResponseExample')]
            }

            return []
        })
    const uniqueShapes = dedupeShapes(shapes)

    if (uniqueShapes.length === 0) {
        return { kind: 'primitive', type: 'unknown' }
    }

    return uniqueShapes.length === 1 ? uniqueShapes[0] : { kind: 'union', types: uniqueShapes }
}

const createParameterGroupShape = (
    parameters: OpenApiParameterLike[] | undefined,
    location: OpenApiParameterLike['in']
): ShapeNode => {
    const relevantParameters = (parameters ?? [])
        .filter((parameter) => parameter.in === location)
        .sort((left, right) => left.name.localeCompare(right.name))

    if (relevantParameters.length === 0) {
        return emptyObjectShape
    }

    return createObjectShape(relevantParameters.map((parameter) => ({
        key: parameter.name,
        optional: !(parameter.required ?? false),
        shape: schemaToShape(parameter.schema, parameter.name, parameter.example),
    })))
}

const registerNamedShape = (
    shape: ShapeNode,
    preferredName: string,
    context: GeneratorContext,
    collisionSuffix: string
): string => {
    if (shape.kind === 'object') {
        return registerObjectShape(shape, preferredName, context, collisionSuffix, true)
    }

    const name = createUniqueTypeName(preferredName, context, collisionSuffix)
    const declaration: ShapeAliasDeclaration = {
        kind: 'shape-alias',
        name,
        shape: prepareNestedShape(shape, preferredName, context),
    }

    context.declarations.push(declaration)
    context.declarationByName.set(name, declaration)

    return name
}

const namespaceTopLevelShape = (
    shape: ShapeNode,
    role: SemanticModel['role']
): ShapeNode => {
    if (shape.kind !== 'object') {
        return shape
    }

    return {
        ...shape,
        signature: `${role}:${shape.signature}`,
    }
}

const registerObjectShape = (
    shape: Extract<ShapeNode, { kind: 'object' }>,
    preferredName: string,
    context: GeneratorContext,
    collisionSuffix: string,
    emitAlias = false
): string => {
    const existingName = context.nameBySignature.get(shape.signature)
    const compatibleDeclaration = findCompatibleObjectDeclaration(shape, preferredName, context)

    if (existingName) {
        if (emitAlias && existingName !== preferredName && !context.declarationByName.has(preferredName)) {
            const aliasName = createUniqueTypeName(preferredName, context, collisionSuffix)

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
        if (isObjectShapeAssignableTo(shape, compatibleDeclaration.rawShape)) {
            context.nameBySignature.set(shape.signature, compatibleDeclaration.name)

            return compatibleDeclaration.name
        }

        const mergedShape = mergeObjectShapes(compatibleDeclaration.rawShape, shape)

        compatibleDeclaration.rawShape = mergedShape
        compatibleDeclaration.properties = mergedShape.properties.map((property) => ({
            ...property,
            shape: prepareNestedShape(property.shape, property.key, context),
        }))
        context.nameBySignature.set(shape.signature, compatibleDeclaration.name)
        context.nameBySignature.set(mergedShape.signature, compatibleDeclaration.name)

        return compatibleDeclaration.name
    }

    const declarationName = createUniqueTypeName(preferredName, context, collisionSuffix)
    const declaration: InterfaceDeclaration = {
        kind: 'interface',
        name: declarationName,
        baseName: sanitizeTypeName(preferredName),
        rawShape: shape,
        properties: [],
    }

    context.nameBySignature.set(shape.signature, declarationName)
    context.declarations.push(declaration)
    context.declarationByName.set(declarationName, declaration)

    declaration.properties = shape.properties.map((property) => ({
        ...property,
        shape: prepareNestedShape(property.shape, property.key, context),
    }))

    return declarationName
}

const findCompatibleObjectDeclaration = (
    shape: Extract<ShapeNode, { kind: 'object' }>,
    preferredName: string,
    context: GeneratorContext
): InterfaceDeclaration | undefined => {
    const baseName = sanitizeTypeName(preferredName)

    return context.declarations.find((declaration): declaration is InterfaceDeclaration => {
        if (declaration.kind !== 'interface' || declaration.baseName !== baseName) {
            return false
        }

        return isObjectShapeAssignableTo(shape, declaration.rawShape)
            || isObjectShapeAssignableTo(declaration.rawShape, shape)
            || canMergeObjectShapes(declaration.rawShape, shape)
    })
}

const canMergeObjectShapes = (
    left: Extract<ShapeNode, { kind: 'object' }>,
    right: Extract<ShapeNode, { kind: 'object' }>
): boolean => {
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

        if (!canMergeShapes(leftProperty.shape, rightProperty.shape)) {
            return false
        }
    }

    return true
}

const isObjectShapeAssignableTo = (
    source: Extract<ShapeNode, { kind: 'object' }>,
    target: Extract<ShapeNode, { kind: 'object' }>
): boolean => {
    const targetProperties = new Map(target.properties.map((property) => [property.key, property]))

    for (const sourceProperty of source.properties) {
        const targetProperty = targetProperties.get(sourceProperty.key)

        if (!targetProperty) {
            return false
        }

        if (sourceProperty.optional && !targetProperty.optional) {
            return false
        }

        if (!isShapeAssignableTo(sourceProperty.shape, targetProperty.shape)) {
            return false
        }
    }

    return target.properties.every((targetProperty) => {
        return source.properties.some((sourceProperty) => sourceProperty.key === targetProperty.key)
            || targetProperty.optional
    })
}

const isShapeAssignableTo = (source: ShapeNode, target: ShapeNode): boolean => {
    if (target.kind === 'union') {
        return target.types.some((targetType) => isShapeAssignableTo(source, targetType))
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

            return isShapeAssignableTo(source.item, target.item)
        case 'union':
            return source.types.every((sourceType) => isShapeAssignableTo(sourceType, target))
        case 'object':
            if (target.kind !== 'object') {
                return false
            }

            return isObjectShapeAssignableTo(source, target)
    }
}

const canMergeShapes = (left: ShapeNode, right: ShapeNode): boolean => {
    if (left.kind === 'union') {
        return left.types.every((leftType) => canMergeShapes(leftType, right))
    }

    if (right.kind === 'union') {
        return right.types.every((rightType) => canMergeShapes(left, rightType))
    }

    if (left.kind === 'primitive' && right.kind === 'primitive') {
        return true
    }

    if (left.kind === 'array' && right.kind === 'array') {
        return canMergeShapes(left.item, right.item)
    }

    if (left.kind === 'object' && right.kind === 'object') {
        return canMergeObjectShapes(left, right)
    }

    return false
}

const mergeObjectShapes = (
    left: Extract<ShapeNode, { kind: 'object' }>,
    right: Extract<ShapeNode, { kind: 'object' }>
): Extract<ShapeNode, { kind: 'object' }> => {
    const keys = new Set([...left.properties.map((property) => property.key), ...right.properties.map((property) => property.key)])

    return createObjectShape(Array.from(keys).map((key) => {
        const leftProperty = left.properties.find((property) => property.key === key)
        const rightProperty = right.properties.find((property) => property.key === key)

        if (leftProperty && rightProperty) {
            return {
                key,
                optional: leftProperty.optional || rightProperty.optional,
                shape: mergeShapes(leftProperty.shape, rightProperty.shape),
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

const mergeShapes = (left: ShapeNode, right: ShapeNode): ShapeNode => {
    if (left.kind === 'union' || right.kind === 'union') {
        return createUnionShape(left, right)
    }

    if (left.kind !== right.kind) {
        return createUnionShape(left, right)
    }

    switch (left.kind) {
        case 'primitive':
            return right.kind === 'primitive' && left.type === right.type ? left : createUnionShape(left, right)
        case 'array':
            if (right.kind !== 'array') {
                return left
            }

            return {
                kind: 'array',
                item: mergeShapes(left.item, right.item),
            }
        case 'object':
            if (right.kind !== 'object') {
                return left
            }

            return mergeObjectShapes(left, right)
    }
}

const createUnionShape = (...shapes: ShapeNode[]): ShapeNode => {
    const flattened = shapes.flatMap((shape) => shape.kind === 'union' ? shape.types : [shape])
    const deduped = dedupeShapes(flattened)

    return deduped.length === 1
        ? deduped[0]
        : { kind: 'union', types: deduped }
}

const prepareNestedShape = (shape: ShapeNode, keyHint: string, context: GeneratorContext): ShapeNode => {
    if (shape.kind === 'object') {
        const name = registerObjectShape(
            shape,
            sanitizeTypeName(singularize(keyHint)),
            context,
            sanitizeTypeName(keyHint),
        )

        return { kind: 'primitive', type: name }
    }

    if (shape.kind === 'array') {
        return {
            kind: 'array',
            item: prepareNestedShape(shape.item, singularize(keyHint), context),
        }
    }

    if (shape.kind === 'union') {
        return {
            kind: 'union',
            types: shape.types.map((entry) => prepareNestedShape(entry, keyHint, context)),
        }
    }

    return shape
}

const renderDeclaration = (declaration: Declaration): string => {
    switch (declaration.kind) {
        case 'interface':
            return renderInterface(declaration)
        case 'interface-alias':
            return `export interface ${declaration.name} extends ${declaration.target} {}`
        case 'type-alias':
            return `export type ${declaration.name} = ${declaration.target}`
        case 'shape-alias':
            return `export type ${declaration.name} = ${renderShape(declaration.shape)}`
    }
}

const renderInterface = (declaration: InterfaceDeclaration): string => {
    const body = declaration.properties
        .map((property) => `  ${formatPropertyKey(property.key)}${property.optional ? '?' : ''}: ${renderShape(property.shape)}`)
        .join('\n')

    return `export interface ${declaration.name} {\n${body}\n}`
}

const renderShape = (shape: ShapeNode): string => {
    switch (shape.kind) {
        case 'primitive':
            return shape.type
        case 'array':
            return `${wrapUnion(renderShape(shape.item))}[]`
        case 'union':
            return shape.types.map((entry) => renderShape(entry)).join(' | ')
        case 'object':
            return inlineObjectShape(shape)
    }
}

const inlineObjectShape = (shape: Extract<ShapeNode, { kind: 'object' }>): string => {
    if (shape.properties.length === 0) {
        return 'Record<string, never>'
    }

    return `{ ${shape.properties.map((property) => `${formatPropertyKey(property.key)}${property.optional ? '?' : ''}: ${renderShape(property.shape)}`).join('; ')} }`
}

const wrapUnion = (value: string): string => {
    return value.includes(' | ') ? `(${value})` : value
}

const schemaToShape = (
    schema: OpenApiSchema | undefined,
    nameHint: string,
    fallbackExample?: unknown
): ShapeNode => {
    if (!schema) {
        return inferShapeFromExample(fallbackExample, nameHint)
    }

    const schemaType = resolveSchemaType(schema)

    if (schemaType === 'array') {
        return {
            kind: 'array',
            item: schemaToShape(schema.items, singularize(nameHint), extractExampleArrayItem(schema.example) ?? extractExampleArrayItem(fallbackExample)),
        }
    }

    if (schemaType === 'object') {
        const propertyExamples = isRecord(schema.example)
            ? schema.example
            : isRecord(fallbackExample)
                ? fallbackExample
                : undefined
        const properties = Object.entries(schema.properties ?? {})
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([key, entry]) => ({
                key,
                optional: !(schema.required ?? []).includes(key),
                shape: schemaToShape(entry, key, propertyExamples?.[key]),
            }))

        if (properties.length > 0) {
            return createObjectShape(properties)
        }

        return inferShapeFromExample(schema.example ?? fallbackExample, nameHint)
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
        return inferShapeFromExample(schema.example ?? fallbackExample, nameHint)
    }

    return { kind: 'primitive', type: 'unknown' }
}

const inferShapeFromExample = (value: unknown, nameHint: string): ShapeNode => {
    if (value === null) {
        return { kind: 'primitive', type: 'null' }
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return { kind: 'array', item: { kind: 'primitive', type: 'unknown' } }
        }

        const itemShapes = dedupeShapes(value.map((entry) => inferShapeFromExample(entry, singularize(nameHint))))

        return {
            kind: 'array',
            item: itemShapes.length === 1 ? itemShapes[0] : { kind: 'union', types: itemShapes },
        }
    }

    if (isRecord(value)) {
        return createObjectShape(Object.entries(value)
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([key, entry]) => ({
                key,
                optional: false,
                shape: inferShapeFromExample(entry, key),
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

const dedupeShapes = (shapes: ShapeNode[]): ShapeNode[] => {
    const seen = new Set<string>()

    return shapes.filter((shape) => {
        const signature = getShapeSignature(shape)

        if (seen.has(signature)) {
            return false
        }

        seen.add(signature)

        return true
    })
}

function createObjectShape (properties: ShapeProperty[]): Extract<ShapeNode, { kind: 'object' }> {
    const normalizedProperties = properties
        .map((property) => ({ ...property }))
        .sort((left, right) => left.key.localeCompare(right.key))
    const signature = JSON.stringify(normalizedProperties.map((property) => ({
        key: property.key,
        optional: property.optional,
        shape: getShapeSignature(property.shape),
    })))

    return {
        kind: 'object',
        signature,
        properties: normalizedProperties,
    }
}

const getShapeSignature = (shape: ShapeNode): string => {
    switch (shape.kind) {
        case 'primitive':
            return `primitive:${shape.type}`
        case 'array':
            return `array:${getShapeSignature(shape.item)}`
        case 'union':
            return `union:${shape.types.map((entry) => getShapeSignature(entry)).join('|')}`
        case 'object':
            return `object:${shape.signature}`
    }
}

const getPreferredMediaType = (content: Record<string, OpenApiMediaType> | undefined): OpenApiMediaType | undefined => {
    if (!content) {
        return undefined
    }

    return content['application/json']
        ?? content['application/*+json']
        ?? Object.values(content)[0]
}

const resolveResponsePayloadSchema = (schema: OpenApiSchema | undefined, example: unknown): PayloadSchemaCandidate => {
    for (const path of [['data'], ['meta', 'data']]) {
        const candidate = getSchemaCandidateAtPath(schema, example, path)

        if (candidate) {
            return candidate
        }
    }

    return {}
}

const getSchemaCandidateAtPath = (
    schema: OpenApiSchema | undefined,
    example: unknown,
    path: string[]
): PayloadSchemaCandidate | undefined => {
    const schemaAtPath = getSchemaAtPath(schema, path)
    const exampleAtPath = getExampleAtPath(example, path)

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
            ...inferSchemaTypeFromExample(exampleAtPath),
            example: exampleAtPath,
        },
        example: exampleAtPath,
    }
}

const getSchemaAtPath = (schema: OpenApiSchema | undefined, path: string[]): OpenApiSchema | undefined => {
    let currentSchema = schema

    for (const segment of path) {
        if (!currentSchema?.properties?.[segment]) {
            return undefined
        }

        currentSchema = currentSchema.properties[segment]
    }

    return currentSchema
}

const getExampleAtPath = (example: unknown, path: string[]): unknown => {
    let currentValue = example

    for (const segment of path) {
        if (!isRecord(currentValue) || !(segment in currentValue)) {
            return undefined
        }

        currentValue = currentValue[segment]
    }

    return currentValue
}

const inferSchemaTypeFromExample = (value: unknown): OpenApiSchema => {
    if (Array.isArray(value)) {
        const itemSchema = value
            .map((entry) => inferSchemaTypeFromExample(entry))
            .find((entry) => hasSchemaDetails(entry))

        return {
            type: 'array',
            items: itemSchema ?? {},
        }
    }

    if (isRecord(value)) {
        return {
            type: 'object',
            properties: Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, inferSchemaTypeFromExample(entry)])),
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

const hasSchemaDetails = (schema: OpenApiSchema | undefined): boolean => {
    return Boolean(
        schema?.type
        || schema?.properties
        || schema?.items
        || schema?.example !== undefined
    )
}

const resolveSchemaType = (schema: OpenApiSchema): string | undefined => {
    return schema.type ?? (schema.properties ? 'object' : undefined)
}

const extractExampleArrayItem = (value: unknown): unknown => {
    return Array.isArray(value) ? value[0] : undefined
}

const renderOpenApiDocumentDefinitions = (
    rootTypeName: string,
    document: OpenApiDocumentLike,
    operationTypeRefs: Map<string, OperationTypeRefs>
): string => {
    const pathDeclarations = Object.entries(document.paths).map(([path, operations]) => {
        const pathTypeName = derivePathTypeName(path)
        const operationDeclarations = Object.keys(operations).map((method) => {
            const operationTypeName = deriveOperationInterfaceName(path, method)
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
            .map((method) => `  ${method}: ${deriveOperationInterfaceName(path, method)}`)
            .join('\n')

        return [
            operationDeclarations,
            `export interface ${pathTypeName} {\n${pathBody}\n}`,
        ].join('\n\n')
    }).join('\n\n')
    const pathsBody = Object.keys(document.paths)
        .map((path) => `  ${formatPropertyKey(path)}: ${derivePathTypeName(path)}`)
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

const derivePathTypeName = (path: string): string => {
    const segments = path
        .split('/')
        .map((segment) => segment.trim())
        .filter(Boolean)
        .filter((segment) => !/^v\d+$/i.test(segment))
        .map((segment) => isPathParam(segment) ? `by ${stripPathParam(segment)}` : segment)

    return `${sanitizeTypeName(segments.join(' '))}Path`
}

const deriveOperationInterfaceName = (path: string, method: string): string => {
    return `${derivePathTypeName(path)}${sanitizeTypeName(method)}Operation`
}

const generateGenericTypeScriptModule = (value: JsonLike, rootTypeName: string): string => {
    const context: GeneratorContext = {
        declarations: [],
        declarationByName: new Map(),
        nameBySignature: new Map(),
        usedNames: new Set(),
    }
    const rootShape = inferShapeFromExample(value, rootTypeName)
    const rootSanitizedName = sanitizeTypeName(rootTypeName)
    let rootType = rootSanitizedName

    if (rootShape.kind === 'object') {
        rootType = registerObjectShape(rootShape, rootSanitizedName, context, rootSanitizedName)
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
    const variableName = toCamelCase(rootTypeName)

    return [
        context.declarations.map((declaration) => renderDeclaration(declaration)).join('\n\n'),
        rootAlias,
        `export const ${variableName}: ${rootTypeName} = ${JSON.stringify(value, null, 2)}`,
        '',
        `export default ${variableName}`,
    ].filter(Boolean).join('\n\n')
}

const createUniqueTypeName = (preferredName: string, context: GeneratorContext, collisionSuffix: string): string => {
    const baseName = sanitizeTypeName(preferredName) || 'GeneratedEntity'
    const collisionName = sanitizeTypeName(collisionSuffix)
    let candidate = baseName
    let suffix = 2

    if (!context.usedNames.has(candidate)) {
        context.usedNames.add(candidate)

        return candidate
    }

    candidate = insertCollisionSuffix(baseName, collisionName)

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

const deriveOperationNaming = (path: string): { baseName: string, collisionSuffix: string } => {
    const pathSegments = path
        .split('/')
        .map((segment) => segment.trim())
        .filter(Boolean)
        .filter((segment) => !/^v\d+$/i.test(segment))
    const staticSegments = pathSegments.filter((segment) => !isPathParam(segment)).map((segment) => singularize(segment))
    const paramSegments = pathSegments.filter((segment) => isPathParam(segment)).map((segment) => singularize(stripPathParam(segment)))
    const tailSegment = staticSegments[staticSegments.length - 1] ?? 'resource'
    const parentSegment = staticSegments[staticSegments.length - 2] ?? null
    const hasPathParamBeforeTail = pathSegments.slice(0, -1).some((segment) => isPathParam(segment))
    const shouldPrefixParent = Boolean(
        parentSegment
        && (
            contextualTailSegments.has(tailSegment.toLowerCase())
            || (hasPathParamBeforeTail && nestedContextSegments.has(tailSegment.toLowerCase()))
        )
    )
    const baseName = sanitizeTypeName(shouldPrefixParent ? `${parentSegment} ${tailSegment}` : tailSegment)
    const collisionSuffix = paramSegments.length > 0
        ? `By ${paramSegments.map((segment) => sanitizeTypeName(segment)).join(' And ')}`
        : parentSegment && !shouldPrefixParent
            ? sanitizeTypeName(parentSegment)
            : ''

    return {
        baseName,
        collisionSuffix,
    }
}

const fallbackCollisionSuffix = (method: string, path: string, baseName: string): string => {
    const pathSegments = path
        .split('/')
        .map((segment) => segment.trim())
        .filter(Boolean)
        .filter((segment) => !/^v\d+$/i.test(segment))
    const staticSegments = pathSegments.filter((segment) => !isPathParam(segment))
    const tailSegment = staticSegments[staticSegments.length - 1] ?? ''
    const hasParams = pathSegments.some((segment) => isPathParam(segment))

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

    return `${sanitizeTypeName(method)}${baseName}`
}

const insertCollisionSuffix = (baseName: string, collisionName: string): string => {
    if (!collisionName) {
        return baseName
    }

    for (const roleSuffix of roleSuffixes) {
        if (baseName.endsWith(roleSuffix) && baseName.length > roleSuffix.length) {
            return `${baseName.slice(0, -roleSuffix.length)}${collisionName}${roleSuffix}`
        }
    }

    return `${baseName}${collisionName}`
}

const isPathParam = (segment: string): boolean => {
    return segment.startsWith('{') && segment.endsWith('}')
}

const stripPathParam = (segment: string): string => {
    return segment.replace(/^\{/, '').replace(/\}$/, '')
}

const contextualTailSegments = new Set([
    'history',
    'status',
    'detail',
    'details',
])

const nestedContextSegments = new Set([
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

const roleSuffixes = ['Input', 'Query', 'Header', 'Params']

const singularize = (value: string): string => {
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

const sanitizeTypeName = (value: string): string => {
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

const formatPropertyKey = (key: string): string => {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
        ? key
        : `'${key.replace(/\\/g, String.raw`\\`).replace(/'/g, String.raw`\'`)}'`
}

const toCamelCase = (value: string): string => {
    const typeName = sanitizeTypeName(value)

    return typeName.charAt(0).toLowerCase() + typeName.slice(1)
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const isOpenApiDocumentLike = (value: unknown): value is OpenApiDocumentLike => {
    return isRecord(value)
        && value.openapi === '3.1.0'
        && isRecord(value.info)
        && typeof value.info.title === 'string'
        && typeof value.info.version === 'string'
        && isRecord(value.paths)
}