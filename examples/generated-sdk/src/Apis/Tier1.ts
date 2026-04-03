import { BaseApi } from '../BaseApi'
import type { Tier1 as Tier1Model, Tier1Input } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Tier1 extends BaseApi {

    async update (body: Tier1Input): Promise<Tier1Model> {
        await this.core.validateAccess()

        const { data } = await Http.send<Tier1Model>(
            this.core.builder.buildTargetUrl('/v1/customers/upgrade/tier1', {}, {}),
            'PATCH',
            body ?? {},
            {}
        )

        return data
    }
}