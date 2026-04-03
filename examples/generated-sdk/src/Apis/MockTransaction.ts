import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { MockTransactionCollectionInput, Tier1 } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class MockTransaction {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: MockTransactionCollectionInput): Promise<Tier1> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Tier1>(
            this.#core.builder.buildTargetUrl('/v1/test/collection/mock-transaction', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}