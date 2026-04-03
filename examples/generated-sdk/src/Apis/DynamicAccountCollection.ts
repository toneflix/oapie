import { BaseApi } from '../BaseApi'
import type { Active, DynamicAccountInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class DynamicAccountCollection extends BaseApi {

    async create (body: DynamicAccountInput): Promise<Active> {
        await this.core.validateAccess()

        const { data } = await Http.send<Active>(
            this.core.builder.buildTargetUrl('/v1/collections/dynamic-account', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}