import { BaseApi } from '../BaseApi'
import type { Business, BusinessInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class BusinessIssuing extends BaseApi {

    async create (body: BusinessInput): Promise<Business> {
        await this.core.validateAccess()

        const { data } = await Http.send<Business>(
            this.core.builder.buildTargetUrl('/v1/issuing/business', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}