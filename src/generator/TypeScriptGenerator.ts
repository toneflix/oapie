import { Declaration, GeneratorContext, InterfaceAliasDeclaration, InterfaceDeclaration, JsonLike, OperationTypeRefs, PayloadSchemaCandidate, SemanticModel, ShapeAliasDeclaration, ShapeNode, ShapeProperty } from './types'
import type { OpenApiDocumentLike, OpenApiMediaType, OpenApiOperationLike, OpenApiParameterLike, OpenApiResponse, OpenApiSchema } from '../types/open-api'

export class TypeScriptGenerator {
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

    static generateModule = (
        value: JsonLike,
        rootTypeName = 'GeneratedOutput'
    ): string => {
        return new TypeScriptGenerator().generate(value, rootTypeName)
    }

    generate (value: JsonLike, rootTypeName = 'GeneratedOutput'): string {
        if (this.isOpenApiDocumentLike(value)) {
            return this.generateModule(value, rootTypeName)
        }

        return this.generateGenericModule(value, rootTypeName)
    }

    generateModule (document: OpenApiDocumentLike, rootTypeName: string): string {
        const context = this.createContext()
        const operationTypeRefs = new Map<string, OperationTypeRefs>()

        for (const model of this.collectSemanticModels(document)) {
            const operationKey = `${model.path}::${model.method}`
            const resolvedName = this.registerNamedShape(this.namespaceTopLevelShape(model.shape, model.role), model.name, context, model.collisionSuffix)
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
            .map((declaration) => this.renderDeclaration(declaration))
            .join('\n\n')
        const variableName = this.toCamelCase(rootTypeName)

        return [
            declarations,
            this.renderOpenApiDocumentDefinitions(rootTypeName, document, operationTypeRefs),
            `export const ${variableName}: ${rootTypeName} = ${this.renderValue(document)}`,
            '',
            `export default ${variableName}`,
        ].filter(Boolean).join('\n\n')
    }

    private generateGenericModule (value: JsonLike, rootTypeName: string): string {
        const context = this.createContext()
        const rootShape = this.inferShapeFromExample(value, rootTypeName)
        const rootSanitizedName = this.sanitizeTypeName(rootTypeName)
        let rootType = rootSanitizedName

        if (rootShape.kind === 'object') {
            rootType = this.registerObjectShape(rootShape, rootSanitizedName, context, rootSanitizedName)
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
        const variableName = this.toCamelCase(rootTypeName)

        return [
            context.declarations.map((declaration) => this.renderDeclaration(declaration)).join('\n\n'),
            rootAlias,
            `export const ${variableName}: ${rootTypeName} = ${this.renderValue(value)}`,
            '',
            `export default ${variableName}`,
        ].filter(Boolean).join('\n\n')
    }

    private createContext (): GeneratorContext {
        return {
            declarations: [],
            declarationByName: new Map(),
            nameBySignature: new Map(),
            usedNames: new Set(),
        }
    }
    private collectSemanticModels (document: OpenApiDocumentLike): SemanticModel[] {
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

    private getOperationPriority (operation: OpenApiOperationLike): number {
        return Number(Boolean(operation.requestBody)) * 10
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

    private registerNamedShape (
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

    private namespaceTopLevelShape (
        shape: ShapeNode,
        role: SemanticModel['role']
    ): ShapeNode {
        if (shape.kind !== 'object') {
            return shape
        }

        return {
            ...shape,
            signature: `${role}:${shape.signature}`,
        }
    }

    private registerObjectShape (
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

    private renderDeclaration (declaration: Declaration): string {
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

    private inferShapeFromExample (value: unknown, nameHint: string): ShapeNode {
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

    private getPreferredMediaType (content: Record<string, OpenApiMediaType> | undefined): OpenApiMediaType | undefined {
        if (!content) {
            return undefined
        }

        return content['application/json']
            ?? content['application/*+json']
            ?? Object.values(content)[0]
    }

    private resolveResponsePayloadSchema (schema: OpenApiSchema | undefined, example: unknown): PayloadSchemaCandidate {
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

    private getSchemaAtPath (schema: OpenApiSchema | undefined, path: string[]): OpenApiSchema | undefined {
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

    private renderOpenApiDocumentDefinitions (
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
        const pathSegments = path
            .split('/')
            .map((segment) => segment.trim())
            .filter(Boolean)
            .filter((segment) => !/^v\d+$/i.test(segment))
        const staticSegments = pathSegments.filter((segment) => !this.isPathParam(segment)).map((segment) => this.singularize(segment))
        const paramSegments = pathSegments.filter((segment) => this.isPathParam(segment)).map((segment) => this.singularize(this.stripPathParam(segment)))
        const tailSegment = staticSegments[staticSegments.length - 1] ?? 'resource'
        const parentSegment = staticSegments[staticSegments.length - 2] ?? null
        const hasPathParamBeforeTail = pathSegments.slice(0, -1).some((segment) => this.isPathParam(segment))
        const shouldPrefixParent = Boolean(
            parentSegment
            && (
                TypeScriptGenerator.contextualTailSegments.has(tailSegment.toLowerCase())
                || (hasPathParamBeforeTail && TypeScriptGenerator.nestedContextSegments.has(tailSegment.toLowerCase()))
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
        const pathSegments = path
            .split('/')
            .map((segment) => segment.trim())
            .filter(Boolean)
            .filter((segment) => !/^v\d+$/i.test(segment))
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

        for (const roleSuffix of TypeScriptGenerator.roleSuffixes) {
            if (baseName.endsWith(roleSuffix) && baseName.length > roleSuffix.length) {
                return `${baseName.slice(0, -roleSuffix.length)}${collisionName}${roleSuffix}`
            }
        }

        return `${baseName}${collisionName}`
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

    private toCamelCase (value: string): string {
        const typeName = this.sanitizeTypeName(value)

        return typeName.charAt(0).toLowerCase() + typeName.slice(1)
    }

    private isRecord (value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null && !Array.isArray(value)
    }

    private isOpenApiDocumentLike (value: unknown): value is OpenApiDocumentLike {
        return this.isRecord(value)
            && value.openapi === '3.1.0'
            && this.isRecord(value.info)
            && typeof value.info.title === 'string'
            && typeof value.info.version === 'string'
            && this.isRecord(value.paths)
    }

    private renderValue (value: unknown): string {
        return JSON.stringify(value, null, 2)
    }
}