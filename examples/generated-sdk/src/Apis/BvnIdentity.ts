import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Bvn, BvnInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class BvnIdentity {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: BvnInput): Promise<Bvn> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Bvn>(
            this.#core.builder.buildTargetUrl('/v1/identity/bvn', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}