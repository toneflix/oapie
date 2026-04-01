import { ExampleApiResponse, ExampleInput } from '../Contracts'

import { Core } from '../Core'
import { CountryCode } from '../Contracts/Codes'
import { Http } from '../Http'

export class Example {
    #core: Core

    constructor(coreInstance: Core) {
        this.#core = coreInstance
    }

    /**
     * Retrieve supported banks by country.
     * 
     * @param code 
     * @param key1 
     * @method GET
     * @returns 
     */
    async list (code: CountryCode, key1?: string): Promise<ExampleApiResponse[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<ExampleApiResponse[]>(
            this.#core.builder.buildTargetUrl('/app/example', {}, { code }),
            'GET',
            {},
            { 'X-Key-1': key1 }
        )

        return data
    }

    /**
     * Save your customer's example information
     * 
     * @method POST
     */
    async save (params: ExampleInput, key1?: string, key2?: string): Promise<ExampleApiResponse> {
        await this.#core.validateAccess()

        const { data } = await Http.send<ExampleApiResponse>(
            this.#core.builder.buildTargetUrl('/app/example'),
            'POST',
            params,
            { 'X-Key-1': key1, 'X-Key-2': key2 }
        )

        return data
    }
}