import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Transfer, TransferInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class TransferCrypto {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: TransferInput): Promise<Transfer> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Transfer>(
            this.#core.builder.buildTargetUrl('/v1/crypto/transfer', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}