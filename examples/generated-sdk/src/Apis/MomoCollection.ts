import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Momo, MomoInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class MomoCollection {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: MomoInput): Promise<Momo> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Momo>(
            this.#core.builder.buildTargetUrl('/v1/collections/momo', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}