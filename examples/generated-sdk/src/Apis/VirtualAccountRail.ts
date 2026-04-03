import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Rail, RailParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class VirtualAccountRail {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async list (params: RailParams): Promise<Rail[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Rail[]>(
            this.#core.builder.buildTargetUrl('/v1/collections/virtual-account/{account_id}/rails', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}