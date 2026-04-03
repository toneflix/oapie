import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Cable, CableInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class CableBill {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: CableInput): Promise<Cable> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Cable>(
            this.#core.builder.buildTargetUrl('/v1/bills/cable', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}