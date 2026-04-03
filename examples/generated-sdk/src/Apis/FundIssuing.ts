import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { CustomerByIdParams, Fund, FundInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class FundIssuing {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (params: CustomerByIdParams, body: FundInput): Promise<Fund> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Fund>(
            this.#core.builder.buildTargetUrl('/v1/issuing/{id}/fund', params, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}