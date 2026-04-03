import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Active, DynamicAccountInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class DynamicAccountCollection {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: DynamicAccountInput): Promise<Active> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Active>(
            this.#core.builder.buildTargetUrl('/v1/collections/dynamic-account', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}