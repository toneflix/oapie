import { BaseApi } from '../BaseApi'
import type { Active, ActiveInput, ActiveParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class ActiveCustomer extends BaseApi {

    async create (params: ActiveParams, body: ActiveInput): Promise<Active> {
        await this.core.validateAccess()

        const { data } = await Http.send<Active>(
            this.core.builder.buildTargetUrl('/v1/customers/{customer_id}/active', params, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}