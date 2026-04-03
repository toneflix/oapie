import { BaseApi } from '../BaseApi'
import type { Resolve, ResolveInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class ResolveInstitution extends BaseApi {

    async create (body: ResolveInput): Promise<Resolve> {
        await this.core.validateAccess()

        const { data } = await Http.send<Resolve>(
            this.core.builder.buildTargetUrl('/v1/institutions/resolve', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}