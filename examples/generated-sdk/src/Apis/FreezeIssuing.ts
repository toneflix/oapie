import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { CustomerByIdParams, Tier1 } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class FreezeIssuing {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async update (params: CustomerByIdParams): Promise<Tier1> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Tier1>(
            this.#core.builder.buildTargetUrl('/v1/issuing/{id}/freeze', params, {}),
            'PATCH',
            {},
            {}
        )

        return data
    }
}