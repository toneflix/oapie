import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Active, Crypto as CryptoModel, CryptoByAddressIdParams, CryptoByIdInput, CryptoInput, CustomerByIdParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Crypto {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: CryptoInput): Promise<CryptoModel> {
        await this.#core.validateAccess()

        const { data } = await Http.send<CryptoModel>(
            this.#core.builder.buildTargetUrl('/v1/crypto', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    async get (params: CryptoByAddressIdParams): Promise<CryptoModel> {
        await this.#core.validateAccess()

        const { data } = await Http.send<CryptoModel>(
            this.#core.builder.buildTargetUrl('/v1/crypto/{address_id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }

    async update (params: CustomerByIdParams, body: CryptoByIdInput): Promise<Active> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Active>(
            this.#core.builder.buildTargetUrl('/v1/crypto/:id', params, {}),
            'PATCH',
            body ?? {},
            {}
        )

        return data
    }
}