import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Fetch, FetchInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class FetchInstitution {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: FetchInput): Promise<Fetch> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Fetch>(
            this.#core.builder.buildTargetUrl('/v1/institutions/fetch', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}