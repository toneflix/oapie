import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { CustomerByIdParams, Transaction as TransactionModel } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Transaction {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async list (): Promise<TransactionModel[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<TransactionModel[]>(
            this.#core.builder.buildTargetUrl('/v1/transactions', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }

    async get (params: CustomerByIdParams): Promise<TransactionModel> {
        await this.#core.validateAccess()

        const { data } = await Http.send<TransactionModel>(
            this.#core.builder.buildTargetUrl('/v1/transactions/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}