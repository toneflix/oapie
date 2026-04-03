import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { CustomerByIdParams, MockTransaction, MockTransactionInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class MockTransactionIssuing {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (params: CustomerByIdParams, body: MockTransactionInput): Promise<MockTransaction> {
        await this.#core.validateAccess()

        const { data } = await Http.send<MockTransaction>(
            this.#core.builder.buildTargetUrl('/v1/test/issuing/{id}/mock-transaction', params, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}