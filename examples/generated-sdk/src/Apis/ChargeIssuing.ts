import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Charge, ChargeQuery } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class ChargeIssuing {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async list (query: ChargeQuery): Promise<Charge[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Charge[]>(
            this.#core.builder.buildTargetUrl('/v1/issuing/charges', {}, query),
            'GET',
            {},
            {}
        )

        return data
    }
}