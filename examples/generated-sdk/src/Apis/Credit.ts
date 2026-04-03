import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { CreditInput, Tier1 } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Credit {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: CreditInput): Promise<Tier1> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Tier1>(
            this.#core.builder.buildTargetUrl('/v1/test/wallet/credit', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}