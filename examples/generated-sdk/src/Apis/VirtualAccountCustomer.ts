import { BaseApi } from '../BaseApi'
import type { ActiveParams, CustomerAccount } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class VirtualAccountCustomer extends BaseApi {

    async get (params: ActiveParams): Promise<CustomerAccount[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerAccount[]>(
            this.core.builder.buildTargetUrl('/v1/customers/{customer_id}/virtual-account', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}