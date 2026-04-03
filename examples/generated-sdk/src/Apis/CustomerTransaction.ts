import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { CustomerByIdParams, CustomerTransaction as CustomerTransactionModel } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class CustomerTransaction {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async list (params: CustomerByIdParams): Promise<CustomerTransactionModel[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<CustomerTransactionModel[]>(
            this.#core.builder.buildTargetUrl('/v1/customers/{id}/transactions', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}