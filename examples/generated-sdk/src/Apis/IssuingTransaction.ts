import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { CustomerByIdParams, IssuingTransaction as IssuingTransactionModel, IssuingTransactionQuery } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class IssuingTransaction {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async list (params: CustomerByIdParams, query: IssuingTransactionQuery): Promise<IssuingTransactionModel[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<IssuingTransactionModel[]>(
            this.#core.builder.buildTargetUrl('/v1/issuing/{id}/transactions', params, query),
            'GET',
            {},
            {}
        )

        return data
    }
}