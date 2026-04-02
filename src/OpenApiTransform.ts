import { OpenApiDocumentLike, OpenApiMediaType, OpenApiOperationLike, OpenApiParameterLike, OpenApiResponse, OpenApiSchema } from './types/open-api'
import type { ReadmeOperation, ReadmeParameter, ReadmeResponseBody } from './types/base'

import { JsonRepair } from './JsonRepair'
import { isRecord } from './Core'
import { parseLooseStructuredValue } from './ReadmeExtractor'

type NormalizedOperation = { path: string, method: string, operation: OpenApiOperationLike }

export class OpenApiTransformer {
    createDocument (
        operations: ReadmeOperation[],
        title = 'Extracted API',
        version = '0.0.0'
    ): OpenApiDocumentLike {
        const paths: OpenApiDocumentLike['paths'] = {}

        for (const operation of operations) {
            const normalized = this.transformOperation(operation)

            if (!normalized || this.shouldSkipNormalizedOperation(normalized)) {
                continue
            }

            paths[normalized.path] ??= {}
            paths[normalized.path][normalized.method] = normalized.operation
        }

        return {
            openapi: '3.1.0',
            info: {
                title,
                version,
            },
            paths,
        }
    }

    transformOperation (operation: ReadmeOperation): NormalizedOperation | null {
        if (!operation.method || !operation.url) {
            return null
        }

        const url = new URL(operation.url)

        if (this.shouldSkipPlaceholderOperation(url, operation)) {
            return null
        }

        const method = operation.method.toLowerCase()
        const path = this.decodeOpenApiPathname(url.pathname)
        const summary = operation.sidebarLinks.find((link) => link.active)?.label

        return {
            path,
            method,
            operation: {
                summary,
                description: operation.description ?? undefined,
                operationId: this.buildOperationId(method, path),
                parameters: this.createParameters(operation.requestParams),
                requestBody: this.createRequestBody(
                    operation.requestParams,
                    operation.requestExampleNormalized?.body,
                    this.hasExtractedBodyParams(operation.requestParams) ? null : this.resolveFallbackRequestBodyExample(operation),
                ),
                responses: this.createResponses(operation.responseSchemas, operation.responseBodies),
            },
        }
    }

    private shouldSkipNormalizedOperation (normalized: NormalizedOperation): boolean {
        return normalized.path === '/'
            && normalized.method === 'get'
            && normalized.operation.operationId === 'get'
            && Object.keys(normalized.operation.responses).length === 0
    }

    private shouldSkipPlaceholderOperation (url: URL, operation: ReadmeOperation): boolean {
        if (url.hostname !== 'example.com' || url.pathname !== '/') {
            return false
        }

        return operation.requestParams.length === 0
            && operation.responseSchemas.length === 0
            && operation.responseBodies.length === 0
            && operation.requestExampleNormalized?.url === 'https://example.com/'
    }

    private decodeOpenApiPathname (pathname: string): string {
        return pathname
            .split('/')
            .map((segment) => {
                if (!segment) {
                    return segment
                }

                try {
                    return decodeURIComponent(segment)
                } catch {
                    return segment
                }
            })
            .join('/')
    }

    private hasExtractedBodyParams (params: ReadmeParameter[]): boolean {
        return params.some((param) => param.in === 'body' || param.in === null)
    }

    private createParameters (params: ReadmeParameter[]): OpenApiOperationLike['parameters'] | undefined {
        const parameters = params
            .filter((param) => this.isOpenApiParameterLocation(param.in))
            .map((param) => this.createParameter(param))

        return parameters.length > 0 ? parameters : undefined
    }

    private createRequestBody (
        params: ReadmeParameter[],
        example: unknown | null,
        fallbackExample: unknown | null
    ): OpenApiOperationLike['requestBody'] | undefined {
        const bodyParams = params.filter((param) => param.in === 'body' || param.in === null)

        if (bodyParams.length === 0 && example == null) {
            return undefined
        }

        const schema = this.buildRequestBodySchema(bodyParams, example, fallbackExample)
        const hasBodyParams = bodyParams.length > 0

        return {
            required: hasBodyParams ? bodyParams.some((param) => param.required) : false,
            content: {
                'application/json': {
                    schema,
                    ...(example != null ? { example } : {}),
                },
            },
        }
    }

    private buildRequestBodySchema (
        params: ReadmeParameter[],
        example: unknown | null,
        fallbackExample: unknown | null
    ): OpenApiSchema {
        const schema = this.mergeOpenApiSchemas(
            this.createExampleSchema(example),
            this.createExampleSchema(fallbackExample),
        ) ?? { type: 'object' }

        if (example != null) {
            schema.example = example
        } else if (fallbackExample != null) {
            schema.example = fallbackExample
        }

        for (const param of params) {
            this.insertRequestBodyParam(schema, param)
        }

        return schema
    }

    private inferSchemaFromExample (value: unknown): OpenApiSchema | undefined {
        if (Array.isArray(value)) {
            return {
                type: 'array',
                items: this.inferSchemaFromExample(value[0]) ?? {},
                example: value,
            }
        }

        if (isRecord(value)) {
            return {
                type: 'object',
                properties: Object.fromEntries(Object.entries(value).map(([key, entryValue]) => [
                    key,
                    this.inferSchemaFromExample(entryValue) ?? {},
                ])),
                example: value,
            }
        }

        if (typeof value === 'string') {
            return {
                type: 'string',
                example: value,
            }
        }

        if (typeof value === 'number') {
            return {
                type: Number.isInteger(value) ? 'integer' : 'number',
                example: value,
            }
        }

        if (typeof value === 'boolean') {
            return {
                type: 'boolean',
                example: value,
            }
        }

        if (value === null) {
            return {}
        }

        return undefined
    }

    private insertRequestBodyParam (rootSchema: OpenApiSchema, param: ReadmeParameter): void {
        const path = param.path.length > 0 ? param.path : [param.name]
        let currentSchema = rootSchema

        for (const [index, segment] of path.slice(0, -1).entries()) {
            currentSchema.properties ??= {}
            currentSchema.properties[segment] ??= { type: 'object' }

            if (param.required) {
                currentSchema.required = Array.from(new Set([...(currentSchema.required ?? []), segment]))
            }

            currentSchema = currentSchema.properties[segment]
            currentSchema.type ??= 'object'

            if (index === path.length - 2 && param.required) {
                currentSchema.required ??= []
            }
        }

        const leafKey = path[path.length - 1] ?? param.name

        currentSchema.properties ??= {}
        currentSchema.properties[leafKey] = this.createParameterSchema(param)

        if (param.required) {
            currentSchema.required = Array.from(new Set([...(currentSchema.required ?? []), leafKey]))
        }
    }

    private createParameter (param: ReadmeParameter): OpenApiParameterLike {
        return {
            name: param.name,
            in: param.in as OpenApiParameterLike['in'],
            required: param.in === 'path' ? true : param.required,
            description: param.description ?? undefined,
            schema: this.createParameterSchema(param),
            example: param.defaultValue ?? undefined,
        }
    }

    private createParameterSchema (param: ReadmeParameter): OpenApiSchema {
        return {
            type: param.type ?? undefined,
            description: param.description ?? undefined,
            default: param.defaultValue ?? undefined,
        }
    }

    private createResponses (
        schemas: ReadmeOperation['responseSchemas'],
        responseBodies: ReadmeResponseBody[]
    ): Record<string, OpenApiResponse> {
        const responses: Record<string, OpenApiResponse> = {}

        for (const schema of schemas) {
            if (!schema.statusCode) {
                continue
            }

            const matchingBodies = responseBodies.filter((body) => body.statusCode === schema.statusCode)
            const content = this.createResponseContent(matchingBodies)

            responses[schema.statusCode] = {
                description: schema.description ?? schema.statusCode,
                ...(content ? { content } : {}),
            }
        }

        for (const body of responseBodies) {
            if (!body.statusCode || responses[body.statusCode]) {
                continue
            }

            const content = this.createResponseContent([body])

            responses[body.statusCode] = {
                description: body.label ?? body.statusCode,
                ...(content ? { content } : {}),
            }
        }

        return responses
    }

    private createResponseContent (bodies: ReadmeResponseBody[]): Record<string, OpenApiMediaType> | undefined {
        if (bodies.length === 0) {
            return undefined
        }

        const content: Record<string, OpenApiMediaType> = {}

        for (const body of bodies) {
            const contentType = body.contentType ?? (body.format === 'json' ? 'application/json' : 'text/plain')
            const normalizedExample = this.normalizeResponseExampleValue(body.body, body.format)

            content[contentType] = {
                schema: this.inferSchemaFromBody(normalizedExample, body.format),
                example: normalizedExample,
            }
        }

        return content
    }

    private inferSchemaFromBody (body: unknown, format: ReadmeResponseBody['format']): OpenApiSchema | undefined {
        if (format === 'json') {
            return this.inferSchemaFromExample(body)
        }

        if (format === 'text') {
            return {
                type: 'string',
                example: body,
            }
        }

        return undefined
    }

    private normalizeResponseExampleValue (body: unknown, format: ReadmeResponseBody['format']): unknown {
        if (format !== 'json' || typeof body !== 'string') {
            return body
        }

        return JsonRepair.parsePossiblyTruncated(body) ?? parseLooseStructuredValue(body) ?? body
    }

    private resolveFallbackRequestBodyExample (operation: ReadmeOperation): unknown | null {
        const jsonResponseBody = operation.responseBodies.find((body) => body.format === 'json')?.body

        if (jsonResponseBody != null) {
            return jsonResponseBody
        }

        if (typeof operation.responseExample === 'object' && operation.responseExample !== null) {
            return operation.responseExample
        }

        if (typeof operation.responseExampleRaw === 'string') {
            return JsonRepair.parsePossiblyTruncated(operation.responseExampleRaw)
        }

        if (typeof operation.responseExample === 'string') {
            return JsonRepair.parsePossiblyTruncated(operation.responseExample)
        }

        return null
    }

    private createExampleSchema (value: unknown): OpenApiSchema | null {
        if (value == null) {
            return null
        }

        return this.inferSchemaFromExample(value) ?? null
    }

    private mergeOpenApiSchemas (
        left: OpenApiSchema | null,
        right: OpenApiSchema | null
    ): OpenApiSchema | null {
        if (!left) {
            return right
        }

        if (!right) {
            return left
        }

        const merged: OpenApiSchema = {
            ...right,
            ...left,
            ...(left.type || right.type ? { type: left.type ?? right.type } : {}),
            ...(left.description || right.description ? { description: left.description ?? right.description } : {}),
            ...(left.default !== undefined || right.default !== undefined ? { default: left.default ?? right.default } : {}),
            ...(left.example !== undefined || right.example !== undefined ? { example: left.example ?? right.example } : {}),
        }

        if (left.properties || right.properties) {
            const propertyKeys = new Set([
                ...Object.keys(left.properties ?? {}),
                ...Object.keys(right.properties ?? {}),
            ])

            merged.properties = Object.fromEntries(Array.from(propertyKeys).map((key) => [
                key,
                this.mergeOpenApiSchemas(left.properties?.[key] ?? null, right.properties?.[key] ?? null) ?? {},
            ]))
        }

        if (left.items || right.items) {
            merged.items = this.mergeOpenApiSchemas(left.items ?? null, right.items ?? null) ?? {}
        }

        if (left.required || right.required) {
            merged.required = Array.from(new Set([...(right.required ?? []), ...(left.required ?? [])]))
        }

        return merged
    }

    private buildOperationId (method: string, path: string): string {
        const normalizedPath = path
            .replace(/\{([^}]+)\}/g, '$1')
            .split('/')
            .filter(Boolean)
            .map((segment) => segment.replace(/[^a-zA-Z0-9]+/g, ' '))
            .map((segment) => segment.trim())
            .filter(Boolean)
            .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/\s+(.)/g, (_match, char: string) => char.toUpperCase()))
            .join('')

        return `${method}${normalizedPath}`
    }

    private isOpenApiParameterLocation (value: ReadmeParameter['in']): value is OpenApiParameterLike['in'] {
        return value === 'query' || value === 'header' || value === 'path' || value === 'cookie'
    }
}

export const transformer = new OpenApiTransformer() 