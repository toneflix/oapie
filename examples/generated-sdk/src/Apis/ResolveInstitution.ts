import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Resolve, ResolveInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class ResolveInstitution {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: ResolveInput): Promise<Resolve> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Resolve>(
            this.#core.builder.buildTargetUrl('/v1/institutions/resolve', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}