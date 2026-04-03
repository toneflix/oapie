import './utilities/global'

import axios, { RawAxiosRequestHeaders } from 'axios'

import { BaseApi } from './Apis/BaseApi'
import { Builder } from './Builder'
import { AuthConfig, AuthRequestConfig, HttpMethod, UnifiedResponse } from './Contracts/Core'
import { HttpException } from './Exceptions/HttpException'
import { XGenericObject } from './Contracts/Interfaces'
import { defineConfig, getConfig } from './utilities/Manager'

export class Http {
    /**
     * Bearer token
     */
    private static bearerToken?: string

    /**
     * Debug level
     */
    private static debugLevel: number = 0

    private static apiInstance: BaseApi

    /**
     * Creates an instance of Http.
     * 
     * @param method 
     * @param url 
     * @param headers 
     * @param body 
     */
    constructor(
        private headers: RawAxiosRequestHeaders = {},
        private body?: any,
    ) { }

    /**
     * Set the debug level
     * 
     * @param debug 
     */
    static setDebugLevel (level: number = 0) {
        this.debugLevel = level ?? 0
    }

    /**
     * Set the API instance
     * 
     * @param api 
     */
    static setApiInstance (api: BaseApi) {
        this.apiInstance = api
    }

    /**
     * Set the bearer token
     * 
     * @param token 
     */
    static setBearerToken (token: string) {
        this.bearerToken = token
        defineConfig({
            auth: {
                type: 'bearer',
                token,
            },
        })
    }

    static setAuth (auth: AuthConfig | AuthConfig[]) {
        defineConfig({ auth })
    }

    static setBasicAuth (username: string, password: string) {
        this.setAuth({
            type: 'basic',
            username,
            password,
        })
    }

    static setApiKey (
        name: string,
        value: string,
        location: 'header' | 'query' | 'cookie' = 'header',
        prefix?: string
    ) {
        this.setAuth({
            type: 'apiKey',
            name,
            value,
            in: location,
            prefix,
        })
    }

    static clearAuth () {
        this.bearerToken = undefined
        defineConfig({ auth: undefined })
    }

    setDefaultHeaders (defaults: Record<string, string>) {
        const config = getConfig()

        this.headers = {
            ...defaults,
            ...(config.headers ?? {}),
            ...this.headers,
        }
    }

    getHeaders (): RawAxiosRequestHeaders {
        return this.headers
    }

    getBody () {
        return this.body
    }

    axiosApi () {
        const config = getConfig()

        this.setDefaultHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        })

        const instance = axios.create({
            baseURL: Builder.baseUrl(),
            headers: this.getHeaders(),
            timeout: config.timeout,
        })

        if (Http.debugLevel > 0) {
            instance.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify({
                    url: request.url,
                    method: request.method,
                    // Remove auth token from logs for security
                    headers: Http.debugLevel < 3 ? Object.fromEntries(
                        Object.entries(request.headers || {}).filter(([key]) => key.toLowerCase() !== 'authorization')
                    ) : request.headers,
                    params: request.params,
                    data: request.data,
                }, null, 2))

                return request
            }, error => {
                console.log('Request Error:', JSON.stringify(error, null, 2))

                return Promise.reject(error)
            })

            instance.interceptors.response.use(response => {
                console.log('Response:', JSON.stringify({
                    status: response.status,
                    // Remove auth token from logs for security
                    data: Http.debugLevel < 3 ? Object.fromEntries(
                        Object.entries(response.data || {}).filter(([key]) => key.toLowerCase() !== 'access_token')
                    ) : response.data,
                }, null, 2))

                return response
            }, error => {
                console.log('Response Error:', JSON.stringify({
                    status: error.response?.status,
                    // Remove auth token from logs for security
                    data: Object.fromEntries(
                        Object.entries(error.response?.data || {}).filter(([key]) => key.toLowerCase() !== 'access_token')
                    ),
                }, null, 2))

                return Promise.reject(error)
            })
        }

        return instance
    }

    /**
     * Makes a GET request
     * 
     * @param url 
     * @param headers 
     * @param params 
     * @returns 
     */
    static async get<R = any, M extends XGenericObject = XGenericObject> (
        url: string,
        params?: XGenericObject,
        headers: RawAxiosRequestHeaders = {},
    ): Promise<UnifiedResponse<R, M>> {
        return this.send<R, M>(url, 'GET', undefined, headers, params)
    }

    /**
     * 
     * 
     * @param url 
     * @param headers 
     * @param params 
     * @returns 
     */
    static async send<R = any, M extends XGenericObject = XGenericObject> (
        url: string,
        method: HttpMethod,
        body?: any,
        headers: RawAxiosRequestHeaders = {},
        params?: XGenericObject,
    ): Promise<UnifiedResponse<R, M>> {
        try {
            const request = await this.prepareRequest({
                url,
                method,
                body,
                headers: this.toHeaderRecord(headers),
                params: { ...(params ?? {}) },
            })
            const { data } = await new Http(request.headers, request.body).axiosApi()<UnifiedResponse<R & M>>({
                url: request.url,
                method: request.method,
                data: request.body,
                params: request.params,
            })

            return {
                success: true,
                message: data.message || 'Request successful',
                data: data.data ?? data as R,
                meta: data.meta as M,
            }
        } catch (e: any) {
            const error = (e.response?.data ?? {})

            throw this.exception(e.response?.status ?? 500, error || e, e)
        }
    }

    private static async prepareRequest (request: AuthRequestConfig): Promise<AuthRequestConfig> {
        let prepared: AuthRequestConfig = {
            ...request,
            headers: { ...request.headers },
            params: { ...(request.params ?? {}) },
        }

        for (const auth of this.getConfiguredAuth()) {
            prepared = await this.applyAuth(prepared, auth)
        }

        return prepared
    }

    private static getConfiguredAuth (): AuthConfig[] {
        const configuredAuth = getConfig().auth

        if (configuredAuth) {
            return Array.isArray(configuredAuth) ? configuredAuth : [configuredAuth]
        }

        if (this.bearerToken) {
            return [{
                type: 'bearer',
                token: this.bearerToken,
            }]
        }

        return []
    }

    private static async applyAuth (
        request: AuthRequestConfig,
        auth: AuthConfig
    ): Promise<AuthRequestConfig> {
        switch (auth.type) {
            case 'bearer': {
                this.setHeaderIfMissing(
                    request.headers,
                    'Authorization',
                    `${auth.prefix ?? 'Bearer'} ${auth.token}`.trim()
                )

                return request
            }

            case 'oauth2': {
                this.setHeaderIfMissing(
                    request.headers,
                    'Authorization',
                    `${auth.tokenType ?? 'Bearer'} ${auth.accessToken}`.trim()
                )

                return request
            }

            case 'basic': {
                const encoded = Buffer.from(`${auth.username}:${auth.password}`).toString('base64')

                this.setHeaderIfMissing(request.headers, 'Authorization', `Basic ${encoded}`)

                return request
            }

            case 'apiKey': {
                const value = auth.prefix ? `${auth.prefix} ${auth.value}`.trim() : auth.value
                const location = auth.in ?? 'header'

                if (location === 'query') {
                    if (request.params[auth.name] === undefined) {
                        request.params[auth.name] = value
                    }

                    return request
                }

                if (location === 'cookie') {
                    this.appendCookie(request.headers, auth.name, value)

                    return request
                }

                this.setHeaderIfMissing(request.headers, auth.name, value)

                return request
            }

            case 'custom': {
                return await auth.apply({
                    ...request,
                    headers: { ...request.headers },
                    params: { ...request.params },
                })
            }
        }
    }

    private static setHeaderIfMissing (
        headers: Record<string, string>,
        name: string,
        value: string
    ) {
        const existingHeaderName = Object.keys(headers).find(header => header.toLowerCase() === name.toLowerCase())

        if (!existingHeaderName) {
            headers[name] = value
        }
    }

    private static appendCookie (
        headers: Record<string, string>,
        name: string,
        value: string
    ) {
        const headerName = Object.keys(headers).find(header => header.toLowerCase() === 'cookie') ?? 'Cookie'
        const existingCookie = headers[headerName]
        const cookieEntry = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

        if (!existingCookie) {
            headers[headerName] = cookieEntry

            return
        }

        if (!existingCookie.split(';').map(part => part.trim()).some(part => part.startsWith(`${encodeURIComponent(name)}=`))) {
            headers[headerName] = `${existingCookie}; ${cookieEntry}`
        }
    }

    /**
     * Create an HttpException from status and error
     * 
     * @param status 
     * @param error 
     * @returns 
     */
    private static exception (status: number, error: XGenericObject, originalError: Error): Error {
        const exception = HttpException.fromCode(status, {
            success: false,
            message: `Request failed: ${error.error?.message || 'An error occurred'}`,
            status: 'failed',
            data: undefined,
            meta: {},
            error: {
                type: ((typeof error.error === 'string' ? error.error : error.error?.type) ?? 'UNKNOWN_ERROR').toUpperCase(),
                code: error.error?.code ?? '000000',
                message: error.error?.message ?? error.error_description ?? error.message,
                validation_errors: error.error?.validation_errors ?? []
            },
        }, originalError)

        if (this.apiInstance) {
            this.apiInstance.setLastException(exception)
        }

        return exception
    }

    private static toHeaderRecord = (headers: RawAxiosRequestHeaders): Record<string, string> => {
        return Object.fromEntries(
            Object.entries(headers).map(([key, value]) => [key, String(value)])
        )
    }
}