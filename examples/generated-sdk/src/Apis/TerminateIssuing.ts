import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, Tier1 } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class TerminateIssuing extends BaseApi {

    async update (params: CustomerByIdParams): Promise<Tier1> {
        await this.core.validateAccess()

        const { data } = await Http.send<Tier1>(
            this.core.builder.buildTargetUrl('/v1/issuing/{id}/terminate', params, {}),
            'PUT',
            {},
            {}
        )

        return data
    }
}