import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Tier2 as Tier2Model, Tier2Input } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Tier2 {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async update (body: Tier2Input): Promise<Tier2Model> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Tier2Model>(
            this.#core.builder.buildTargetUrl('/v1/customers/upgrade/tier2', {}, {}),
            'PATCH',
            body ?? {},
            {}
        )

        return data
    }
}