import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Biller, BillerByTypeAndCountryParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class BillBiller {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async get (params: BillerByTypeAndCountryParams): Promise<Biller[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Biller[]>(
            this.#core.builder.buildTargetUrl('/v1/bills/{type}/billers/{country}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}