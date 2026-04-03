import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, Transaction as TransactionModel } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Transaction extends BaseApi {

    async list (): Promise<TransactionModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<TransactionModel[]>(
            this.core.builder.buildTargetUrl('/v1/transactions', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }

    async get (params: CustomerByIdParams): Promise<TransactionModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<TransactionModel>(
            this.core.builder.buildTargetUrl('/v1/transactions/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}