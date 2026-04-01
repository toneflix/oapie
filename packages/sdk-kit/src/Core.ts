import './utilities/global'

import { BaseApi } from './Apis/BaseApi'
import { Builder } from './Builder'
import { Http } from './Http'
import { InitOptions } from './Contracts/Core'

export class Core {
    static apiClass: typeof BaseApi = BaseApi

    debugLevel = 0

    /**
     * Client ID
     */
    private clientId: string

    /**
     * Client Secret
     */
    private clientSecret: string

    /**
     * Flutterwave Environment
     */
    private environment: 'sandbox' | 'live' = 'live'

    private accessValidator?: (...args: any[]) => Promise<boolean | string>

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
    constructor(clientId?: string, clientSecret?: string, encryptionKey?: string, env?: 'sandbox' | 'live')
    constructor(
        clientId?: string | InitOptions,
        clientSecret?: string,
        encryptionKey?: string,
        env?: 'sandbox' | 'live'
    ) {
        if (typeof clientId === 'object') {
            this.clientId = clientId.clientId
            this.clientSecret = clientId.clientSecret
            this.environment = clientId.environment ?? 'live'
        } else {
            this.clientId = clientId ?? process.env.CLIENT_ID ?? ''
            this.clientSecret = clientSecret ?? process.env.CLIENT_SECRET ?? ''
            this.environment = env ?? (process.env.ENVIRONMENT ?? 'live') as 'sandbox' | 'live'
        }

        if (!this.clientId || !this.clientSecret) {
            throw new Error('Client ID and Client Secret are required to initialize Flutterwave instance')
        }

        this.builder.setEnvironment(this.environment)
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
    init (clientId?: string, clientSecret?: string, encryptionKey?: string, env?: 'sandbox' | 'live'): this
    init (clientId?: any, clientSecret?: string, encryptionKey?: string, env?: 'sandbox' | 'live'): this {
        return new (this.constructor as any)(
            clientId,
            clientSecret,
            encryptionKey,
            env
        )
    }

    /**
     * Set the debug level
     * 
     * @param level 
     * @returns 
     */
    debug (level: number = 0): this {
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
     * Set access validator function
     * 
     * @param validator 
     */
    setAccessValidator (validator: (...args: any[]) => Promise<boolean | string>) {
        this.accessValidator = validator
    }

    async validateAccess () {
        const check = this.accessValidator ? await this.accessValidator(this) : true

        if (check !== true) {
            throw new Error(typeof check === 'string' ? check : 'Access validation failed')
        }
    }
}