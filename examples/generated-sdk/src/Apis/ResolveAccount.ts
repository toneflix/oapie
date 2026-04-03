import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { ResolveAccount as ResolveAccountModel, ResolveAccountInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class ResolveAccount {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: ResolveAccountInput): Promise<ResolveAccountModel> {
        await this.#core.validateAccess()

        const { data } = await Http.send<ResolveAccountModel>(
            this.#core.builder.buildTargetUrl('/v1/bills/electricity/resolve-account', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}