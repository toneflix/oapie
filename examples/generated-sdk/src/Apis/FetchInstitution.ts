import { BaseApi } from '../BaseApi'
import type { Fetch, FetchInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class FetchInstitution extends BaseApi {

    async create (body: FetchInput): Promise<Fetch> {
        await this.core.validateAccess()

        const { data } = await Http.send<Fetch>(
            this.core.builder.buildTargetUrl('/v1/institutions/fetch', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}