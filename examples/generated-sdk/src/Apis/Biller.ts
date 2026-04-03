import { BaseApi } from '../BaseApi'
import type { Biller as BillerModel, BillerParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Biller extends BaseApi {

    async get (params: BillerParams): Promise<BillerModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<BillerModel[]>(
            this.core.builder.buildTargetUrl('/v1/bills/airtime/billers/{country}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}