import { BaseApi } from '../BaseApi'
import type { Institution as InstitutionModel, InstitutionQuery } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Institution extends BaseApi {

    async list (query: InstitutionQuery): Promise<InstitutionModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<InstitutionModel[]>(
            this.core.builder.buildTargetUrl('/v1/institutions', {}, query),
            'GET',
            {},
            {}
        )

        return data
    }
}