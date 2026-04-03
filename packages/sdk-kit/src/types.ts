export interface RuntimeSdkParameterManifest {
    name: string
    accessor: string
    in: 'query' | 'header' | 'path'
    required: boolean
    description?: string
}

export interface RuntimeSdkSecurityRequirementSchemeManifest {
    name: string
    scopes: string[]
}

export interface RuntimeSdkSecurityRequirementManifest {
    schemes: RuntimeSdkSecurityRequirementSchemeManifest[]
}

export interface RuntimeSdkSecuritySchemeManifest {
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

export interface RuntimeSdkOperationManifest {
    path: string
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    methodName: string
    summary?: string
    description?: string
    requestBodyDescription?: string
    responseDescription?: string
    operationId?: string
    responseType: string
    inputType: string
    queryType: string
    headerType: string
    paramsType: string
    hasBody: boolean
    bodyRequired: boolean
    pathParams: RuntimeSdkParameterManifest[]
    queryParams: RuntimeSdkParameterManifest[]
    headerParams: RuntimeSdkParameterManifest[]
    security?: RuntimeSdkSecurityRequirementManifest[]
}

export interface RuntimeSdkGroupManifest {
    className: string
    propertyName: string
    operations: RuntimeSdkOperationManifest[]
}

export interface RuntimeSdkManifest {
    groups: RuntimeSdkGroupManifest[]
    securitySchemes: RuntimeSdkSecuritySchemeManifest[]
    security?: RuntimeSdkSecurityRequirementManifest[]
}

export interface RuntimeSdkBundle<TApi = unknown> {
    document: unknown
    manifest: RuntimeSdkManifest
    __api?: TApi
}

type RuntimeSdkMethodMap<TOperations> = TOperations extends readonly unknown[]
    ? UnionToIntersection<RuntimeSdkMethodNamespace<TOperations[number]>>
    : Record<string, never>

type RuntimeSdkMethodNamespace<TOperation> = TOperation extends { methodName: infer TMethodName extends string }
    ? {
        [TKey in TMethodName]: (...args: any[]) => Promise<unknown>
    }
    : Record<string, never>

type RuntimeSdkGroupMap<TGroups> = TGroups extends readonly unknown[]
    ? UnionToIntersection<RuntimeSdkGroupNamespace<TGroups[number]>>
    : Record<string, never>

type RuntimeSdkGroupNamespace<TGroup> = TGroup extends {
    propertyName: infer TPropertyName extends string
    operations: infer TOperations
}
    ? {
        [TKey in TPropertyName]: RuntimeSdkMethodMap<TOperations>
    }
    : Record<string, never>

type InferRuntimeSdkApiFromManifest<TBundle> = TBundle extends {
    manifest: {
        groups: infer TGroups
    }
}
    ? RuntimeSdkGroupMap<TGroups>
    : never

type UnionToIntersection<TValue> = (
    TValue extends unknown ? (value: TValue) => void : never
) extends ((value: infer TIntersection) => void)
    ? TIntersection
    : never

export type InferRuntimeSdkApi<TBundle> = '__api' extends keyof TBundle
    ? TBundle extends { __api?: infer TApi }
    ? TApi
    : InferRuntimeSdkApiFromManifest<TBundle>
    : InferRuntimeSdkApiFromManifest<TBundle>