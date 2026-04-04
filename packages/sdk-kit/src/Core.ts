import './utilities/global'

import { AccessValidationResult, AuthConfig, DebugLevel, Environment, InitOptions, UserConfig } from './Contracts/Core'
import { InferRuntimeSdkApi, RuntimeSdkBundle } from './types'

import { BaseApi } from './Apis/BaseApi'
import { Builder } from './Builder'
import { Http } from './Http'
import { createRuntimeApi } from './RuntimeSdk'
import { defineConfig, getConfig } from './utilities/Manager'

export class Core {
    static apiClass: typeof BaseApi = BaseApi

    debugLevel: DebugLevel = 0

    /**
     * Client ID
     */
    private clientId?: string

    /**
     * Client Secret
     */
    private clientSecret?: string

    /**
     * API Environment
     */
    private environment: Environment = 'live'

    private accessValidator?: (core: Core) => AccessValidationResult | Promise<AccessValidationResult>

    /**
     * API Instance
     */
    api: BaseApi

    /**
     * Builder Instance
     */
    builder = Builder

    /**
     * Creates an instance of Core.
     * 
     * @param clientId 
     * @param clientSecret 
     * @param encryptionKey 
     */
    constructor(clientId?: InitOptions)
    constructor(clientId?: string, clientSecret?: string, encryptionKey?: string, env?: Environment, config?: Partial<UserConfig>)
    constructor(
        clientId?: string | InitOptions,
        clientSecret?: string,
        encryptionKey?: string,
        env?: Environment,
        config?: Partial<UserConfig>
    ) {
        const currentConfig = getConfig()

        if (clientId && typeof clientId === 'object') {
            this.clientId = Core.normalizeCredential(clientId.clientId)
            this.clientSecret = Core.normalizeCredential(clientId.clientSecret)
            this.environment = clientId.environment
                ?? currentConfig.environment
                ?? Core.normalizeEnvironment(process.env.ENVIRONMENT)
                ?? 'live'
            this.configure({
                environment: this.environment,
                urls: clientId.urls,
                headers: clientId.headers,
                timeout: clientId.timeout,
                encryptionKey: clientId.encryptionKey,
                auth: clientId.auth,
            })
            this.debug(clientId.debugLevel ?? 0)
        } else {
            this.clientId = Core.normalizeCredential(clientId)
                ?? Core.normalizeCredential(process.env.CLIENT_ID)
            this.clientSecret = Core.normalizeCredential(clientSecret)
                ?? Core.normalizeCredential(process.env.CLIENT_SECRET)
            this.environment = env
                ?? currentConfig.environment
                ?? Core.normalizeEnvironment(process.env.ENVIRONMENT)
                ?? 'live'
            this.configure({
                ...(config ?? {}),
                environment: this.environment,
                encryptionKey: encryptionKey ?? config?.encryptionKey,
            })
            this.debug(0)
        }

        if (!this.clientSecret && !this.hasConfiguredAuth()) {
            throw new Error('Client Secret is required to initialize API instance when auth is not provided')
        }

        this.api = this.createApi()
    }

    protected createApi (): BaseApi {
        const ApiClass = (this.constructor as typeof Core).apiClass ?? BaseApi

        return ApiClass.initialize(this)
    }

    /**
     * Initializes the Core instance
     * 
     * @param clientId 
     * @param clientSecret 
     * @param encryptionKey 
     * @param accessToken 
     * @returns 
     */
    init (clientId?: InitOptions): this
    init (clientId?: string, clientSecret?: string, encryptionKey?: string, env?: Environment, config?: Partial<UserConfig>): this
    init (clientId?: any, clientSecret?: string, encryptionKey?: string, env?: Environment, config?: Partial<UserConfig>): this {
        return new (this.constructor as any)(
            clientId,
            clientSecret,
            encryptionKey,
            env,
            config
        )
    }

    configure (config: Partial<UserConfig>): this {
        const nextConfig = defineConfig(config)

        if (nextConfig.environment) {
            this.environment = nextConfig.environment
            this.builder.setEnvironment(nextConfig.environment)
        }

        return this
    }

    /**
     * Set the debug level
     * 
     * @param level 
     * @returns 
     */
    debug (level: DebugLevel = 0): this {
        this.debugLevel = level

        Http.setDebugLevel(level)

        return this
    }

    /**
     * Get the current environment
     * 
     * @returns 
     */
    getEnvironment () {
        return this.environment
    }

    /**
     * Get the configured client identifier.
     */
    getClientId () {
        return this.clientId
    }

    /**
     * Get the configured client secret.
     */
    getClientSecret () {
        return this.clientSecret
    }

    /**
     * Get the current shared SDK config.
     */
    getConfig (): UserConfig {
        return getConfig()
    }

    /**
     * Replace the active auth strategy.
     */
    setAuth (auth: AuthConfig | AuthConfig[]): this {
        return this.configure({ auth })
    }

    /**
     * Clear any configured auth strategy.
     */
    clearAuth (): this {
        Http.clearAuth()

        return this
    }

    /**
     * Set access validator function
     * 
     * @param validator Function to validate access
     */
    setAccessValidator (validator: (core: Core) => AccessValidationResult | Promise<AccessValidationResult>) {
        this.accessValidator = validator

        return this
    }

    /**
     * Validates access using the provided access validator function
     * 
     * @throws Error if validation fails
     */
    async validateAccess () {
        const check = this.accessValidator ? await this.accessValidator(this) : true

        if (check === true || check == null) {
            return
        }

        if (this.isAuthConfigOrArray(check)) {
            this.setAuth(check)

            return
        }

        if (this.isConfigUpdate(check)) {
            this.configure(check)

            return
        }

        throw new Error(typeof check === 'string' ? check : 'Access validation failed')
    }

    /**
     * Use a manifest bundle to create the API instance
     * 
     * @param bundle 
     * @returns 
     */
    useDocument<TBundle extends RuntimeSdkBundle> (
        bundle: TBundle
    ): this & { api: BaseApi & InferRuntimeSdkApi<TBundle> } {
        this.api = createRuntimeApi(this, bundle)

        return this as this & { api: BaseApi & InferRuntimeSdkApi<TBundle> }
    }

    /**
     * Use a manifest bundle to create the API instance (alias for useDocument).
     * 
     * @param bundle 
     * @returns 
     */
    useSdk<TBundle extends RuntimeSdkBundle> (
        bundle: TBundle
    ): this & { api: BaseApi & InferRuntimeSdkApi<TBundle> } {
        return this.useDocument(bundle)
    }

    private static normalizeEnvironment = (value?: string): Environment | undefined => {
        if (value === 'live' || value === 'sandbox') {
            return value
        }

        return undefined
    }

    private static normalizeCredential (value?: string): string | undefined {
        if (typeof value !== 'string') {
            return undefined
        }

        const normalized = value.trim()

        return normalized ? normalized : undefined
    }

    private hasConfiguredAuth (): boolean {
        const auth = getConfig().auth

        if (Array.isArray(auth)) {
            return auth.length > 0
        }

        return auth != null
    }

    private isAuthConfigOrArray (value: unknown): value is AuthConfig | AuthConfig[] {
        if (Array.isArray(value)) {
            return value.every((entry) => this.isAuthConfig(entry))
        }

        return this.isAuthConfig(value)
    }

    private isAuthConfig (value: unknown): value is AuthConfig {
        return typeof value === 'object'
            && value !== null
            && 'type' in value
            && typeof (value as { type?: unknown }).type === 'string'
    }

    private isConfigUpdate (value: unknown): value is Partial<UserConfig> {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            return false
        }

        return ['auth', 'environment', 'headers', 'timeout', 'urls', 'encryptionKey'].some((key) => key in value)
    }
}