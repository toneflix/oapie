import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Utility, UtilityInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class UtilityBill {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: UtilityInput): Promise<Utility> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Utility>(
            this.#core.builder.buildTargetUrl('/v1/bills/utility', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}