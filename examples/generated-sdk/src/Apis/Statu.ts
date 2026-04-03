import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Statu as StatuModel, StatuParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Statu {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async get (params: StatuParams): Promise<StatuModel> {
        await this.#core.validateAccess()

        const { data } = await Http.send<StatuModel>(
            this.#core.builder.buildTargetUrl('/v1/collections/virtual-account/status/{reference}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}