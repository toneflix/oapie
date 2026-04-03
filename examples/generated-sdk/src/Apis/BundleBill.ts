import { BaseApi } from '../BaseApi'
import type { Bundle, BundleParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class BundleBill extends BaseApi {

    async get (params: BundleParams): Promise<Bundle[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<Bundle[]>(
            this.core.builder.buildTargetUrl('/v1/bills/{bill_type}/bundle/{biller}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}