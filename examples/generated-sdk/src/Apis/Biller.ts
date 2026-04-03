import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Biller as BillerModel, BillerParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Biller {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async get (params: BillerParams): Promise<BillerModel[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<BillerModel[]>(
            this.#core.builder.buildTargetUrl('/v1/bills/airtime/billers/{country}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}