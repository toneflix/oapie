import './utilities/global'

import { XGenericObject } from './Contracts/Interfaces'
import { buildUrl } from './utilities/helpers'
import crypto from 'crypto'

export class Builder {
    private static baseUrls = {
        live: 'https://api.flutterwave.com/v4/',
        sandbox: 'https://developersandbox-api.flutterwave.com/',
    }

    /**
     * Flutterwave Environment
     */
    static environment?: 'sandbox' | 'live'

    constructor() { }

    /**
     * Sets the environment for the builder
     * 
     * @param env
     */
    static setEnvironment (env: 'sandbox' | 'live') {
        this.environment = env
    }

    /**
     * Gets the base url based on environment
     * 
     * @returns 
     */
    static baseUrl () {
        const env = process.env.ENVIRONMENT || this.environment || 'sandbox'

        if (env === 'live') {
            return this.baseUrls.live
        }

        return this.baseUrls.sandbox
    }

    /**
     * Builds a full url based on endpoint provided
     * 
     * @param endpoint 
     * @returns 
     */
    static buildUrl (...endpoint: string[]) {
        return buildUrl(this.baseUrl(), ...endpoint)
    }

    /**
     * Builds parameters for query or path
     * 
     * @param params 
     * @param type 
     * @returns 
     */
    static buildParams (params: XGenericObject, type: 'query' | 'path' = 'path') {
        let built = ''

        if (type === 'path') {
            built = Object.values(params).join('/')
        } else {
            const queryParams: string[] = []

            for (const [key, value] of Object.entries(params)) {
                queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
            }

            built = queryParams.join('&')
        }

        return built
    }

    /**
     * Assigns parameters to url {placeholders} based on type
     * 
     * @param url 
     * @param params 
     * @param type 
     * 
     * @returns 
     */
    static assignParamsToUrl (
        url: string,
        params: XGenericObject,
        type: 'query' | 'path' = 'path'
    ): string {
        let builtUrl = url

        if (type === 'path') {
            for (const [key, value] of Object.entries(params)) {
                builtUrl = builtUrl.replace(`{${key}}`, encodeURIComponent(String(value)))
                builtUrl = builtUrl.replace(`:${key}`, encodeURIComponent(String(value)))
            }
        } else {
            if (Object.keys(params).length === 0) {
                return builtUrl
            }

            const queryString = this.buildParams(params, 'query')
            const separator = builtUrl.includes('?') ? '&' : '?'
            builtUrl += `${separator}${queryString}`
        }

        return builtUrl
    }

    /**
     * Builds the target url by assigning both path and query parameters
     * 
     * @param path 
     * @param params 
     * @param queryParams 
     * @returns 
     */
    static buildTargetUrl (
        path: string,
        params: XGenericObject = {},
        queryParams: XGenericObject = {}
    ) {
        const url = this.buildUrl(path)

        let builtUrl = this.assignParamsToUrl(url, params, 'path')

        builtUrl = this.assignParamsToUrl(builtUrl, queryParams, 'query')

        return builtUrl
    }

    /**
     * Encrypts specified keys in the input object and returns a new object with 
     * encrypted values.
     * 
     * @param input             The input object containing the data to be encrypted.
     * @param keysToEncrypt     The keys in the input object that should be encrypted.
     * @param outputMapping     A mapping of input keys to output keys for the encrypted values.
     * @returns                 A new object with the specified keys encrypted.
     */
    static async encryptDetails<X extends XGenericObject> (
        input: Partial<X>,
        keysToEncrypt: (keyof X)[] = [],
        outputMapping: Partial<Record<keyof X, string>> = {}
    ): Promise<X> {
        const nonce = crypto.randomBytes(12).toString('base64').slice(0, 12)
        const encryptableKeys = keysToEncrypt.length > 0
            ? keysToEncrypt
            : (Object.keys(input) as (keyof X)[])

        const encrypted = Object.fromEntries(
            Object.entries(input).map(([key, value]) => {
                if (encryptableKeys.includes(key) && typeof value === 'string') {
                    const outputKey = outputMapping?.[key] || key

                    return [outputKey, this.encryptAES(value, process.env.ENCRYPTION_KEY!, nonce)]
                }

                return [key, value]
            })
        ) as X

        for (const key of encryptableKeys) {
            delete input[key]
        }

        return encrypted
    }

    /**
     * Encrypts data using AES-GCM encryption
     * @param data 
     * @param token 
     * @param nonce 
     * @returns 
     */
    static async encryptAES (data: string, token: string, nonce: string): Promise<string> {
        if (nonce.length !== 12) {
            throw new Error('Nonce must be exactly 12 characters long')
        }

        const cryptoSubtle = globalThis.crypto?.subtle || crypto.webcrypto?.subtle
        if (!cryptoSubtle) {
            throw new Error('Crypto API is not available in this environment.')
        }

        const decodedKeyBytes = Uint8Array.from(atob(token), c => c.charCodeAt(0))

        const key = await cryptoSubtle.importKey(
            'raw',
            decodedKeyBytes,
            { name: 'AES-GCM' },
            false,
            ['encrypt']
        )
        const iv = new TextEncoder().encode(nonce)

        const encryptedData = await cryptoSubtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv,
            },
            key,
            new TextEncoder().encode(data)
        )

        return btoa(String.fromCharCode(...new Uint8Array(encryptedData)))
    }
}