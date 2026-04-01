import { BadRequestException } from '../Exceptions/BadRequestException'
import { Core } from '../Core'
import { Example } from './Example'
import { ForbiddenRequestException } from '../Exceptions/ForbiddenRequestException'
import { Http } from '../Http'
import { HttpException } from '../Exceptions/HttpException'
import { UnauthorizedRequestException } from '../Exceptions/UnauthorizedRequestException'

export class BaseApi {
    /**
     * Flutterwave instance
     */
    #core: Core

    /**
     * Examples API instance
     */
    examples!: Example

    private lastException?:
        BadRequestException |
        ForbiddenRequestException |
        UnauthorizedRequestException |
        HttpException

    /**
     * Create a BaseApi instance
     * 
     * @param coreInstance Optional Core instance
     */
    constructor(coreInstance?: Core) {
        this.#core = coreInstance ?? new Core()
    }

    /**
     * Get the last exception
     * 
     * @returns 
     */
    getLastException ():
        BadRequestException |
        ForbiddenRequestException |
        UnauthorizedRequestException |
        HttpException | undefined {
        return this.lastException
    }

    /**
     * Set the last exception
     * 
     * @param exception 
     */
    setLastException (
        exception:
            BadRequestException |
            ForbiddenRequestException |
            UnauthorizedRequestException |
            HttpException
    ) {
        this.lastException = exception
    }

    /**
     * Initialize BaseApi and its sub-APIs
     * 
     * @param coreInstance Optional Core instance
     * @returns 
     */
    static initialize (coreInstance?: Core) {

        Http.setDebugLevel(coreInstance?.debugLevel)

        const baseApi = new BaseApi(coreInstance)

        Http.setApiInstance(baseApi)

        baseApi.examples = new Example(baseApi.#core)

        return baseApi
    }
}