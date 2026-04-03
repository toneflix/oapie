import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Active, AddonParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class AddonCable {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async get (params: AddonParams): Promise<Active> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Active>(
            this.#core.builder.buildTargetUrl('/v1/bills/cable/addon/{biller}/{addon_id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}