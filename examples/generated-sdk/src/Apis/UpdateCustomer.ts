import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Active, UpdateInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class UpdateCustomer {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async update (body: UpdateInput): Promise<Active> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Active>(
            this.#core.builder.buildTargetUrl('/v1/customers/update', {}, {}),
            'PATCH',
            body ?? {},
            {}
        )

        return data
    }
}