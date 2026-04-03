import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { CustomerByIdParams, Verify as VerifyModel } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Verify {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async get (params: CustomerByIdParams): Promise<VerifyModel> {
        await this.#core.validateAccess()

        const { data } = await Http.send<VerifyModel>(
            this.#core.builder.buildTargetUrl('/v1/transactions/verify/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}