export interface OpenApiSchema {
    type?: string
    description?: string
    default?: unknown
    properties?: Record<string, OpenApiSchema>
    items?: OpenApiSchema
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

export interface OpenApiOauthFlowLike {
    authorizationUrl?: string
    tokenUrl?: string
    refreshUrl?: string
    scopes?: Record<string, string>
}

export type OpenApiSecurityRequirementLike = Record<string, string[]>

export type OpenApiSecuritySchemeLike =
    | {
        type: 'http'
        description?: string
        scheme: string
        bearerFormat?: string
    }
    | {
        type: 'apiKey'
        description?: string
        name: string
        in: 'query' | 'header' | 'cookie'
    }
    | {
        type: 'oauth2'
        description?: string
        flows?: Record<string, OpenApiOauthFlowLike>
    }
    | {
        type: 'openIdConnect'
        description?: string
        openIdConnectUrl: string
    }

export interface OpenApiOperationLike {
    summary?: string
    description?: string
    operationId?: string
    security?: OpenApiSecurityRequirementLike[]
    parameters?: OpenApiParameterLike[]
    requestBody?: {
        description?: string
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
    components?: {
        securitySchemes?: Record<string, OpenApiSecuritySchemeLike>
    }
    security?: OpenApiSecurityRequirementLike[]
    paths: Record<string, Record<string, OpenApiOperationLike>>
}