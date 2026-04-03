import { XGenericObject } from './Interfaces'

export type Environment = 'sandbox' | 'live'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type ResponseStatus = 'failed' | 'success'

export interface ValidationError {
    'field_name': string
    'message': string
}

export interface ErrorResponse {
    status: ResponseStatus
    message?: string
    error: {
        type: string
        code: string | number
        message: string
    }
}

export interface ValidationErrorResponse {
    status: ResponseStatus
    message?: string
    error: {
        type: string
        code: string | number
        message: string
        validation_errors: ValidationError[]
    }
}

export interface SuccessResponse<T = any> {
    status: ResponseStatus
    message: string
    data: T
}

export interface AuthResponse {
    access_token: string
    expires_in: number
    refresh_expires_in: number
    token_type: 'Bearer',
    scope: string
}

export interface AuthErrorResponse {
    error: 'invalid_request'
    error_description: string
}

export type Response<T = any> = SuccessResponse<T> | ErrorResponse

export interface UnifiedResponse<T = any, M extends XGenericObject = XGenericObject> {
    success: boolean
    message: string
    status?: ResponseStatus
    data: T
    meta?: M | undefined
    error?: {
        type: string
        code: string | number
        message: string
        validation_errors: ValidationError[]
    }
}

export interface CursorPagination {
    next?: string
    previous?: string
    limit: number
    total: number
    has_more_items: boolean
}

export interface NormalPagination {
    total: number
    current_page: number
    total_pages: number
}

export interface PageInfoMeta {
    page_info: NormalPagination
}

export interface UserUrls {
    live?: string
    sandbox?: string
}

export interface BearerAuthConfig {
    type: 'bearer'
    token: string
    prefix?: string
}

export interface OAuth2AuthConfig {
    type: 'oauth2'
    accessToken: string
    tokenType?: string
}

export interface BasicAuthConfig {
    type: 'basic'
    username: string
    password: string
}

export interface ApiKeyAuthConfig {
    type: 'apiKey'
    name: string
    value: string
    in?: 'header' | 'query' | 'cookie'
    prefix?: string
}

export interface AuthRequestConfig {
    url: string
    method: HttpMethod
    headers: Record<string, string>
    params: XGenericObject
    body?: unknown
}

export interface CustomAuthConfig {
    type: 'custom'
    apply: (
        request: AuthRequestConfig
    ) => AuthRequestConfig | Promise<AuthRequestConfig>
}

export type AuthConfig =
    | BearerAuthConfig
    | OAuth2AuthConfig
    | BasicAuthConfig
    | ApiKeyAuthConfig
    | CustomAuthConfig

export type AccessValidationConfigUpdate = Partial<UserConfig> | AuthConfig | AuthConfig[]

export type AccessValidationResult =
    | boolean
    | string
    | void
    | AccessValidationConfigUpdate

export interface InitOptions {
    /**
     * Your API Public Key
     */
    clientId: string
    /**
     * Your API Secret Key
     */
    clientSecret: string
    /**
     * Your API Encryption Key
     */
    encryptionKey?: string
    /**     
     * Environment to use
     */
    environment?: Environment
    /**
     * Override environment base URLs.
     */
    urls?: UserUrls
    /**
     * Default headers applied to every request.
     */
    headers?: Record<string, string>
    /**
     * Request timeout in milliseconds.
     */
    timeout?: number
    /**
     * Request authentication strategy or strategies.
     */
    auth?: AuthConfig | AuthConfig[]
}

export interface UserConfig {
    environment?: Environment
    urls?: UserUrls
    headers?: Record<string, string>
    timeout?: number
    encryptionKey?: string
    auth?: AuthConfig | AuthConfig[]
}