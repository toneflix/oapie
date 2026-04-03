import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Usd as UsdModel, UsdInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Usd {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: UsdInput): Promise<UsdModel> {
        await this.#core.validateAccess()

        const { data } = await Http.send<UsdModel>(
            this.#core.builder.buildTargetUrl('/v1/collections/virtual-account/usd', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}