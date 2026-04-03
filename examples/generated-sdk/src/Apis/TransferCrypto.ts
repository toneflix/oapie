import { BaseApi } from '../BaseApi'
import type { Transfer, TransferInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class TransferCrypto extends BaseApi {

    async create (body: TransferInput): Promise<Transfer> {
        await this.core.validateAccess()

        const { data } = await Http.send<Transfer>(
            this.core.builder.buildTargetUrl('/v1/crypto/transfer', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}