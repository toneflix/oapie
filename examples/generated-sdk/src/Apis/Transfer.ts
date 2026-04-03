import { BaseApi } from '../BaseApi'
import type { Transfer as TransferModel, TransferByTransferIdParams, TransferCreateInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Transfer extends BaseApi {

    async create (body: TransferCreateInput): Promise<TransferModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<TransferModel>(
            this.core.builder.buildTargetUrl('/v1/transfers', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    async get (params: TransferByTransferIdParams): Promise<TransferModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<TransferModel>(
            this.core.builder.buildTargetUrl('/v1/transfers/{transfer_id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}