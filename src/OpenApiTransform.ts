import { OpenApiDocumentLike, OpenApiMediaType, OpenApiOperationLike, OpenApiResponse, OpenApiSchema } from './types/open-api'
import type { ReadmeOperation, ReadmeParameter, ReadmeResponseBody } from './types/base'

export const createOpenApiDocumentFromReadmeOperations = (
    operations: ReadmeOperation[],
    title = 'Extracted API', version = '0.0.0'
): OpenApiDocumentLike => {
    const paths: OpenApiDocumentLike['paths'] = {}

    for (const operation of operations) {
        const normalized = transformReadmeOperationToOpenApi(operation)

        if (!normalized) {
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

export const transformReadmeOperationToOpenApi = (
    operation: ReadmeOperation
): { path: string, method: string, operation: OpenApiOperationLike } | null => {
    if (!operation.method || !operation.url) {
        return null
    }

    const url = new URL(operation.url)
    const method = operation.method.toLowerCase()
    const path = url.pathname
    const summary = operation.sidebarLinks.find((link) => link.active)?.label

    return {
        path,
        method,
        operation: {
            summary,
            description: operation.description ?? undefined,
            operationId: buildOperationId(method, path),
            requestBody: createRequestBody(operation.requestParams, operation.requestExampleNormalized?.body),
            responses: createResponses(operation.responseSchemas, operation.responseBodies),
        },
    }
}

const createRequestBody = (
    params: ReadmeParameter[],
    example: unknown | null
): OpenApiOperationLike['requestBody'] | undefined => {
    if (params.length === 0) {
        return undefined
    }

    const properties = Object.fromEntries(params.map((param) => [
        param.name,
        createParameterSchema(param),
    ]))
    const required = params.filter((param) => param.required).map((param) => param.name)

    return {
        required: required.length > 0,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties,
                    required,
                    example: isRecord(example) ? example : undefined,
                },
                example: example ?? undefined,
            },
        },
    }
}

const createParameterSchema = (param: ReadmeParameter): OpenApiSchema => {
    return {
        type: param.type ?? undefined,
        description: param.description ?? undefined,
        default: param.defaultValue ?? undefined,
    }
}

const createResponses = (
    schemas: ReadmeOperation['responseSchemas'],
    responseBodies: ReadmeResponseBody[]
): Record<string, OpenApiResponse> => {
    const responses: Record<string, OpenApiResponse> = {}

    for (const schema of schemas) {
        if (!schema.statusCode) {
            continue
        }

        const matchingBodies = responseBodies.filter((body) => body.statusCode === schema.statusCode)
        const content = createResponseContent(matchingBodies)

        responses[schema.statusCode] = {
            description: schema.description ?? schema.statusCode,
            ...(content ? { content } : {}),
        }
    }

    for (const body of responseBodies) {
        if (!body.statusCode || responses[body.statusCode]) {
            continue
        }

        const content = createResponseContent([body])

        responses[body.statusCode] = {
            description: body.label ?? body.statusCode,
            ...(content ? { content } : {}),
        }
    }

    return responses
}

const createResponseContent = (
    bodies: ReadmeResponseBody[]
): Record<string, OpenApiMediaType> | undefined => {
    if (bodies.length === 0) {
        return undefined
    }

    const content: Record<string, OpenApiMediaType> = {}

    for (const body of bodies) {
        const contentType = body.contentType ?? 'text/plain'

        content[contentType] = {
            schema: inferSchemaFromBody(body.body, body.format),
            example: body.body,
        }
    }

    return content
}

const inferSchemaFromBody = (
    body: unknown,
    format: ReadmeResponseBody['format']
): OpenApiSchema | undefined => {
    if (format === 'json' && isRecord(body)) {
        return {
            type: 'object',
            example: body,
        }
    }

    if (format === 'json' && Array.isArray(body)) {
        return {
            type: 'array',
            example: body,
        }
    }

    if (format === 'text') {
        return {
            type: 'string',
            example: body,
        }
    }

    return undefined
}

const buildOperationId = (method: string, path: string): string => {
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

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}