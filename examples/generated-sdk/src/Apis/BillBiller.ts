import { BaseApi } from '../BaseApi'
import type { Biller, BillerByTypeAndCountryParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class BillBiller extends BaseApi {

    async get (params: BillerByTypeAndCountryParams): Promise<Biller[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<Biller[]>(
            this.core.builder.buildTargetUrl('/v1/bills/{type}/billers/{country}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}