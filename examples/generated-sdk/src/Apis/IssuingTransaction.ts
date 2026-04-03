import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, IssuingTransaction as IssuingTransactionModel, IssuingTransactionQuery } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class IssuingTransaction extends BaseApi {

    async list (params: CustomerByIdParams, query: IssuingTransactionQuery): Promise<IssuingTransactionModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<IssuingTransactionModel[]>(
            this.core.builder.buildTargetUrl('/v1/issuing/{id}/transactions', params, query),
            'GET',
            {},
            {}
        )

        return data
    }
}