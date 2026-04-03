import { BaseApi } from '../BaseApi'
import type { Customer, EnrollInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class EnrollCustomer extends BaseApi {

    async create (body: EnrollInput): Promise<Customer> {
        await this.core.validateAccess()

        const { data } = await Http.send<Customer>(
            this.core.builder.buildTargetUrl('/v1/customers/enroll', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}