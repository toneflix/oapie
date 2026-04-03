import { BaseApi } from '../BaseApi'
import type { CustomerByIdParams, Fund, FundInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class WithdrawIssuing extends BaseApi {

    async create (params: CustomerByIdParams, body: FundInput): Promise<Fund> {
        await this.core.validateAccess()

        const { data } = await Http.send<Fund>(
            this.core.builder.buildTargetUrl('/v1/issuing/{id}/withdraw', params, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}