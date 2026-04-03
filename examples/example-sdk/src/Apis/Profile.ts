import type { ProfileApiResponse, UpdateProfileInput } from '../Contracts'

import { BaseApi } from '../BaseApi'
import { Http } from '@oapiex/sdk-kit'

export class Profile extends BaseApi {

    async get (profileId: string): Promise<ProfileApiResponse> {
        await this.core.validateAccess()

        const { data } = await Http.send<ProfileApiResponse>(
            this.core.builder.buildTargetUrl('/app/profiles/{profileId}', { profileId }),
            'GET',
            {},
            {}
        )

        return data
    }

    async update (profileId: string, params: UpdateProfileInput): Promise<ProfileApiResponse> {
        await this.core.validateAccess()

        const { data } = await Http.send<ProfileApiResponse>(
            this.core.builder.buildTargetUrl('/app/profiles/{profileId}', { profileId }),
            'PATCH',
            params,
            {}
        )

        return data
    }
}