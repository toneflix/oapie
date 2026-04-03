import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { CustomerAccount, CustomerByIdParams, VirtualAccountById, VirtualAccountInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class VirtualAccountCollection {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: VirtualAccountInput): Promise<CustomerAccount> {
        await this.#core.validateAccess()

        const { data } = await Http.send<CustomerAccount>(
            this.#core.builder.buildTargetUrl('/v1/collections/virtual-account', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    async get (params: CustomerByIdParams): Promise<VirtualAccountById> {
        await this.#core.validateAccess()

        const { data } = await Http.send<VirtualAccountById>(
            this.#core.builder.buildTargetUrl('/v1/collections/virtual-account/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}