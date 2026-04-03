import { BaseApi } from '../BaseApi'
import type { Usd, UsdTransferInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class UsdTransfer extends BaseApi {

    async create (body: UsdTransferInput): Promise<Usd> {
        await this.core.validateAccess()

        const { data } = await Http.send<Usd>(
            this.core.builder.buildTargetUrl('/v2/transfers/usd', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}