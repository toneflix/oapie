import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { WalletList } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Wallet {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async list (): Promise<WalletList[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<WalletList[]>(
            this.#core.builder.buildTargetUrl('/v1/wallets', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}