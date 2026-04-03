import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { CustomerAccount as CustomerAccountModel, CustomerByIdParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class CustomerAccount {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async list (params: CustomerByIdParams): Promise<CustomerAccountModel[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<CustomerAccountModel[]>(
            this.#core.builder.buildTargetUrl('/v1/customers/{id}/accounts', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}