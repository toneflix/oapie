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
    name: string
    role: 'response' | 'input' | 'query' | 'header' | 'params'
    shape: ShapeNode
    collisionSuffix: string
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

    for (const model of collectSemanticModels(document)) {
        registerNamedShape(namespaceTopLevelShape(model.shape, model.role), model.name, context, model.collisionSuffix)
    }

    const declarations = context.declarations
        .map((declaration) => renderDeclaration(declaration))
        .join('\n\n')
    const variableName = toCamelCase(rootTypeName)

    return [
        declarations,
        renderOpenApiDocumentDefinitions(rootTypeName),
        `export const ${variableName}: ${rootTypeName} = ${JSON.stringify(document, null, 2)}`,
        '',
        `export default ${variableName}`,
    ].filter(Boolean).join('\n\n')
}

const collectSemanticModels = (document: OpenApiDocumentLike): SemanticModel[] => {
    const models: SemanticModel[] = []

    for (const [path, operations] of Object.entries(document.paths)) {
        const baseName = deriveBaseTypeNameFromPath(path)

        for (const [method, operation] of Object.entries(operations)) {
            const collisionSuffix = `${sanitizeTypeName(method)}${baseName}`

            models.push({ name: baseName, role: 'response', shape: getSuccessResponseShape(operation.responses), collisionSuffix })
            models.push({ name: `${baseName}Input`, role: 'input', shape: getRequestInputShape(operation.requestBody), collisionSuffix })
            models.push({ name: `${baseName}Query`, role: 'query', shape: createParameterGroupShape(operation.parameters, 'query'), collisionSuffix })
            models.push({ name: `${baseName}Header`, role: 'header', shape: createParameterGroupShape(operation.parameters, 'header'), collisionSuffix })
            models.push({ name: `${baseName}Params`, role: 'params', shape: createParameterGroupShape(operation.parameters, 'path'), collisionSuffix })
        }
    }

    return models
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

    const dataSchema = getDataSchema(mediaType.schema, mediaType.example)

    if (!dataSchema) {
        return schemaToShape(mediaType.schema, 'Response', mediaType.example)
    }

    if (resolveSchemaType(dataSchema) === 'array') {
        return schemaToShape(dataSchema.items, 'Item', extractExampleArrayItem(dataSchema.example))
    }

    return schemaToShape(dataSchema, 'Response', mediaType.example)
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
        const properties = Object.entries(schema.properties ?? {})
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([key, entry]) => ({
                key,
                optional: !(schema.required ?? []).includes(key),
                shape: schemaToShape(entry, key, isRecord(schema.example) ? schema.example[key] : undefined),
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

const getDataSchema = (schema: OpenApiSchema | undefined, example: unknown): OpenApiSchema | undefined => {
    if (schema?.properties?.data) {
        return schema.properties.data
    }

    if (isRecord(example) && 'data' in example) {
        return {
            example: example.data,
            ...inferSchemaTypeFromExample(example.data),
        }
    }

    return undefined
}

const inferSchemaTypeFromExample = (value: unknown): OpenApiSchema => {
    if (Array.isArray(value)) {
        return {
            type: 'array',
            items: inferSchemaTypeFromExample(value[0]),
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

const resolveSchemaType = (schema: OpenApiSchema): string | undefined => {
    return schema.type ?? (schema.properties ? 'object' : undefined)
}

const extractExampleArrayItem = (value: unknown): unknown => {
    return Array.isArray(value) ? value[0] : undefined
}

const renderOpenApiDocumentDefinitions = (rootTypeName: string): string => {
    return [
        'export interface OpenApiInfo {\n  title: string\n  version: string\n}',
        'export interface OpenApiSchemaDefinition {\n  type?: string\n  description?: string\n  default?: unknown\n  properties?: Record<string, OpenApiSchemaDefinition>\n  items?: OpenApiSchemaDefinition\n  required?: string[]\n  example?: unknown\n}',
        'export interface OpenApiParameterDefinition {\n  name: string\n  in: \'query\' | \'header\' | \'path\' | \'cookie\'\n  required?: boolean\n  description?: string\n  schema?: OpenApiSchemaDefinition\n  example?: unknown\n}',
        'export interface OpenApiMediaTypeDefinition {\n  schema?: OpenApiSchemaDefinition\n  example?: unknown\n}',
        'export interface OpenApiResponseDefinition {\n  description: string\n  content?: Record<string, OpenApiMediaTypeDefinition>\n}',
        'export interface OpenApiRequestBodyDefinition {\n  required: boolean\n  content: Record<string, OpenApiMediaTypeDefinition>\n}',
        'export interface OpenApiOperationDefinition {\n  summary?: string\n  description?: string\n  operationId?: string\n  parameters?: OpenApiParameterDefinition[]\n  requestBody?: OpenApiRequestBodyDefinition\n  responses: Record<string, OpenApiResponseDefinition>\n}',
        `export interface ${rootTypeName} {\n  openapi: '3.1.0'\n  info: OpenApiInfo\n  paths: Record<string, Record<string, OpenApiOperationDefinition>>\n}`,
    ].join('\n\n')
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

    candidate = `${baseName}${collisionName}`

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

const deriveBaseTypeNameFromPath = (path: string): string => {
    const segments = path
        .split('/')
        .map((segment) => segment.trim())
        .filter(Boolean)
        .filter((segment) => !/^v\d+$/i.test(segment))
        .filter((segment) => !segment.startsWith('{') && !segment.endsWith('}'))
    const baseSegment = segments[segments.length - 1] ?? 'resource'

    return sanitizeTypeName(singularize(baseSegment))
}

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
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : JSON.stringify(key)
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