import { BaseApi } from '../BaseApi'
import type { Customer as CustomerModel, CustomerByIdParams, CustomerInput, CustomerQuery } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Customer extends BaseApi {

    async create (body: CustomerInput): Promise<CustomerModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerModel>(
            this.core.builder.buildTargetUrl('/v1/customers', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    async list (query: CustomerQuery): Promise<CustomerModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerModel[]>(
            this.core.builder.buildTargetUrl('/v1/customers', {}, query),
            'GET',
            {},
            {}
        )

        return data
    }

    async get (params: CustomerByIdParams): Promise<CustomerModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerModel>(
            this.core.builder.buildTargetUrl('/v1/customers/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}