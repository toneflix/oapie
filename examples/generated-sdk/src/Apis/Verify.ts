import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, Verify as VerifyModel } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Verify extends BaseApi {

    async get (params: CustomerByIdParams): Promise<VerifyModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<VerifyModel>(
            this.core.builder.buildTargetUrl('/v1/transactions/verify/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}