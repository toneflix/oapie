import type { Core as KitCore } from '@oapiex/sdk-kit'
import { Http } from '@oapiex/sdk-kit'

import type { ProfileApiResponse, UpdateProfileInput } from '../Contracts'

export class Profile {
    #core: KitCore

    constructor(coreInstance: KitCore) {
        this.#core = coreInstance
    }

    async get (profileId: string): Promise<ProfileApiResponse> {
        await this.#core.validateAccess()

        const { data } = await Http.send<ProfileApiResponse>(
            this.#core.builder.buildTargetUrl('/app/profiles/{profileId}', { profileId }),
            'GET',
            {},
            {}
        )

        return data
    }

    async update (profileId: string, params: UpdateProfileInput): Promise<ProfileApiResponse> {
        await this.#core.validateAccess()

        const { data } = await Http.send<ProfileApiResponse>(
            this.#core.builder.buildTargetUrl('/app/profiles/{profileId}', { profileId }),
            'PATCH',
            params,
            {}
        )

        return data
    }
}