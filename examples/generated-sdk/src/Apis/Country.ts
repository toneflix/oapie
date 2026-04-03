import { BaseApi } from '../BaseApi'
import type { Country as CountryModel } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Country extends BaseApi {

    async list (): Promise<CountryModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<CountryModel[]>(
            this.core.builder.buildTargetUrl('/v1/countries', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}