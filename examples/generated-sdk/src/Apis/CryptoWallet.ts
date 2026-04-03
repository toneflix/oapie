import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { ActiveParams, Crypto } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class CryptoWallet {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async get (params: ActiveParams): Promise<Crypto[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Crypto[]>(
            this.#core.builder.buildTargetUrl('/v1/crypto/wallets/{customer_id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}