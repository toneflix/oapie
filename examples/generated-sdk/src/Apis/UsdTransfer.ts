import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Usd, UsdTransferInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class UsdTransfer {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: UsdTransferInput): Promise<Usd> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Usd>(
            this.#core.builder.buildTargetUrl('/v2/transfers/usd', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}