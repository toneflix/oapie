import { BaseApi } from '../BaseApi'
import type { Bvn, BvnInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class BvnIdentity extends BaseApi {

    async create (body: BvnInput): Promise<Bvn> {
        await this.core.validateAccess()

        const { data } = await Http.send<Bvn>(
            this.core.builder.buildTargetUrl('/v1/identity/bvn', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}