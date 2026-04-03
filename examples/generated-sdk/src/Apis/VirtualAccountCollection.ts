import { BaseApi } from '../BaseApi'
import type { CustomerAccount, CustomerByIdParams, VirtualAccountById, VirtualAccountInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class VirtualAccountCollection extends BaseApi {

    async create (body: VirtualAccountInput): Promise<CustomerAccount> {
        await this.core.validateAccess()

        const { data } = await Http.send<CustomerAccount>(
            this.core.builder.buildTargetUrl('/v1/collections/virtual-account', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    async get (params: CustomerByIdParams): Promise<VirtualAccountById> {
        await this.core.validateAccess()

        const { data } = await Http.send<VirtualAccountById>(
            this.core.builder.buildTargetUrl('/v1/collections/virtual-account/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}