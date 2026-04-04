export interface OpenApiSdkParameterManifest {
    name: string
    accessor: string
    in: 'path' | 'query' | 'header'
    required: boolean
}

export interface OpenApiSdkSecurityRequirementSchemeManifest {
    name: string
    scopes: string[]
}

export interface OpenApiSdkSecurityRequirementManifest {
    schemes: OpenApiSdkSecurityRequirementSchemeManifest[]
}

export interface OpenApiSdkSecuritySchemeManifest {
    name: string
    helperName: string
    description?: string
    type: 'http' | 'apiKey' | 'oauth2' | 'openIdConnect'
    authType: 'bearer' | 'basic' | 'apiKey' | 'oauth2'
    scheme?: string
    bearerFormat?: string
    in?: 'header' | 'query' | 'cookie'
    parameterName?: string
    openIdConnectUrl?: string
    scopes?: string[]
}

export interface OpenApiSdkOperationManifest {
    path: string
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    methodName: string
    summary: string
    operationId: string
    responseType: string
    inputType: string
    queryType: string
    headerType: string
    paramsType: string
    hasBody: boolean
    bodyRequired: boolean
    pathParams: OpenApiSdkParameterManifest[]
    queryParams: OpenApiSdkParameterManifest[]
    headerParams: OpenApiSdkParameterManifest[]
    security?: OpenApiSdkSecurityRequirementManifest[]
}

export interface OpenApiSdkGroupManifest {
    className: string
    propertyName: string
    operations: OpenApiSdkOperationManifest[]
}

export interface OpenApiSdkManifest {
    groups: OpenApiSdkGroupManifest[]
    securitySchemes: OpenApiSdkSecuritySchemeManifest[]
    security?: OpenApiSdkSecurityRequirementManifest[]
}

export interface OpenApiRuntimeBundle<TApi = unknown> {
    document: unknown
    manifest: OpenApiSdkManifest
    __api?: TApi
}

export interface ExampleApiResponse {
    id: string
    code: string
    name: string
}

export interface ExampleInput {
    code: string
    platform: string
}

export interface ExampleQuery {
    code?: string
}

export interface ExampleHeader {
    'X-Key-1'?: string
    'X-Key-2'?: string
}

export interface ExampleParams { }

export interface ProfileApiResponse {
    id: string
    displayName: string
    email: string
    status: 'active' | 'disabled'
}

export interface UpdateProfileInput {
    displayName?: string
    status?: 'active' | 'disabled'
}

export interface ProfileQuery { }

export interface ProfileHeader { }

export interface ProfileParams {
    profileId: string
}

export interface ExampleDocumentApi {
    examples: {
        list (query: ExampleQuery, headers?: ExampleHeader): Promise<ExampleApiResponse[]>
        save (body: ExampleInput, headers?: ExampleHeader): Promise<ExampleApiResponse>
    }
    profiles: {
        get (params: ProfileParams): Promise<ProfileApiResponse>
        update (params: ProfileParams, body: UpdateProfileInput): Promise<ProfileApiResponse>
    }
}

export const exampleDocument = {
    openapi: '3.1.0',
    info: {
        title: 'Example Both SDK',
        version: '1.0.0',
    },
    paths: {
        '/app/example': {
            get: {},
            post: {},
        },
        '/app/profiles/{profileId}': {
            get: {},
            patch: {},
        },
    },
}

export const exampleDocumentManifest = {
    groups: [
        {
            className: 'Example',
            propertyName: 'examples',
            operations: [
                {
                    path: '/app/example',
                    method: 'GET',
                    methodName: 'list',
                    summary: 'List example resources',
                    operationId: 'getAppExample',
                    responseType: 'ExampleApiResponse[]',
                    inputType: 'ExampleInput',
                    queryType: 'ExampleQuery',
                    headerType: 'ExampleHeader',
                    paramsType: 'ExampleParams',
                    hasBody: false,
                    bodyRequired: false,
                    pathParams: [],
                    queryParams: [
                        {
                            name: 'code',
                            accessor: 'code',
                            in: 'query',
                            required: false,
                        },
                    ],
                    headerParams: [
                        {
                            name: 'X-Key-1',
                            accessor: 'X-Key-1',
                            in: 'header',
                            required: false,
                        },
                    ],
                },
                {
                    path: '/app/example',
                    method: 'POST',
                    methodName: 'save',
                    summary: 'Create an example resource',
                    operationId: 'postAppExample',
                    responseType: 'ExampleApiResponse',
                    inputType: 'ExampleInput',
                    queryType: 'ExampleQuery',
                    headerType: 'ExampleHeader',
                    paramsType: 'ExampleParams',
                    hasBody: true,
                    bodyRequired: true,
                    pathParams: [],
                    queryParams: [],
                    headerParams: [
                        {
                            name: 'X-Key-1',
                            accessor: 'X-Key-1',
                            in: 'header',
                            required: false,
                        },
                        {
                            name: 'X-Key-2',
                            accessor: 'X-Key-2',
                            in: 'header',
                            required: false,
                        },
                    ],
                },
            ],
        },
        {
            className: 'Profile',
            propertyName: 'profiles',
            operations: [
                {
                    path: '/app/profiles/{profileId}',
                    method: 'GET',
                    methodName: 'get',
                    summary: 'Get a profile',
                    operationId: 'getAppProfilesProfileId',
                    responseType: 'ProfileApiResponse',
                    inputType: 'UpdateProfileInput',
                    queryType: 'ProfileQuery',
                    headerType: 'ProfileHeader',
                    paramsType: 'ProfileParams',
                    hasBody: false,
                    bodyRequired: false,
                    pathParams: [
                        {
                            name: 'profileId',
                            accessor: 'profileId',
                            in: 'path',
                            required: true,
                        },
                    ],
                    queryParams: [],
                    headerParams: [],
                },
                {
                    path: '/app/profiles/{profileId}',
                    method: 'PATCH',
                    methodName: 'update',
                    summary: 'Update a profile',
                    operationId: 'patchAppProfilesProfileId',
                    responseType: 'ProfileApiResponse',
                    inputType: 'UpdateProfileInput',
                    queryType: 'ProfileQuery',
                    headerType: 'ProfileHeader',
                    paramsType: 'ProfileParams',
                    hasBody: true,
                    bodyRequired: true,
                    pathParams: [
                        {
                            name: 'profileId',
                            accessor: 'profileId',
                            in: 'path',
                            required: true,
                        },
                    ],
                    queryParams: [],
                    headerParams: [],
                },
            ],
        },
    ],
    securitySchemes: [],
} as const satisfies OpenApiSdkManifest

export const exampleDocumentSdk: OpenApiRuntimeBundle<ExampleDocumentApi> = {
    document: exampleDocument,
    manifest: exampleDocumentManifest,
}

export default exampleDocument
