export interface OpenApiSchema {
    type?: string
    description?: string
    default?: unknown
    properties?: Record<string, OpenApiSchema>
    required?: string[]
    example?: unknown
}

export interface OpenApiParameterLike {
    name: string
    in: 'query' | 'header' | 'path' | 'cookie'
    required?: boolean
    description?: string
    schema?: OpenApiSchema
    example?: unknown
}

export interface OpenApiMediaType {
    schema?: OpenApiSchema
    example?: unknown
}

export interface OpenApiResponse {
    description: string
    content?: Record<string, OpenApiMediaType>
}

export interface OpenApiOperationLike {
    summary?: string
    description?: string
    operationId?: string
    parameters?: OpenApiParameterLike[]
    requestBody?: {
        required: boolean
        content: Record<string, OpenApiMediaType>
    }
    responses: Record<string, OpenApiResponse>
}

export interface OpenApiDocumentLike {
    openapi: '3.1.0'
    info: {
        title: string
        version: string
    }
    paths: Record<string, Record<string, OpenApiOperationLike>>
}