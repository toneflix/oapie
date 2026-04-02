import type { ProfileApiResponse, ProfileParams, UpdateProfileInput } from '../Schema'

import { Http } from '@oapiex/sdk-kit'
import type { Core as KitCore } from '@oapiex/sdk-kit'

export class Profile {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async get (params: ProfileParams): Promise<ProfileApiResponse> {
        await this.#core.validateAccess()

        const { data } = await Http.send<ProfileApiResponse>(
            this.#core.builder.buildTargetUrl('/app/profiles/{profileId}', params),
            'GET',
            {},
            {}
        )

        return data
    }

    async update (params: ProfileParams, body: UpdateProfileInput): Promise<ProfileApiResponse> {
        await this.#core.validateAccess()

        const { data } = await Http.send<ProfileApiResponse>(
            this.#core.builder.buildTargetUrl('/app/profiles/{profileId}', params),
            'PATCH',
            body,
            {}
        )

        return data
    }
}
