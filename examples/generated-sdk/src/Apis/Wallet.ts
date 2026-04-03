import { BaseApi } from '../BaseApi'
import type { WalletList } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Wallet extends BaseApi {

    async list (): Promise<WalletList[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<WalletList[]>(
            this.core.builder.buildTargetUrl('/v1/wallets', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}