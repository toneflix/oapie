import { XGenericObject } from './Interfaces'

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

export interface InitOptions {
    /**
     * Your Flutterwave Public Key
     */
    clientId: string
    /**
     * Your Flutterwave Secret Key
     */
    clientSecret: string
    /**
     * Your Flutterwave Encryption Key
     */
    encryptionKey?: string
    /**     
     * Environment to use
     */
    environment?: 'sandbox' | 'live'
}

export interface UserConfig {
    environment?: 'sandbox' | 'live'
    urls: {
        live: string
        sandbox: string
    }
}