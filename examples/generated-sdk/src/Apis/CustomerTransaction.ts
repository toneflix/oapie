import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, CustomerTransaction as CustomerTransactionModel } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class CustomerTransaction extends BaseApi {

    async list (params: CustomerByIdParams): Promise<CustomerTransactionModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerTransactionModel[]>(
            this.core.builder.buildTargetUrl('/v1/customers/{id}/transactions', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}