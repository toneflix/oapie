import { BaseApi } from '../BaseApi'
import type { CustomerAccount as CustomerAccountModel, CustomerByIdParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class CustomerAccount extends BaseApi {

    async list (params: CustomerByIdParams): Promise<CustomerAccountModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerAccountModel[]>(
            this.core.builder.buildTargetUrl('/v1/customers/{id}/accounts', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}