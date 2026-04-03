import { BaseApi } from '../BaseApi'
import type { IssuingTransactionQuery, WalletHistory, WalletHistoryByCurrencyCodeParams, WalletHistoryByCurrencyCodeQuery } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class HistoryWallet extends BaseApi {

    async list (query: IssuingTransactionQuery): Promise<WalletHistory[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<WalletHistory[]>(
            this.core.builder.buildTargetUrl('/v1/wallets/history', {}, query),
            'GET',
            {},
            {}
        )

        return data
    }

    async get (params: WalletHistoryByCurrencyCodeParams, query: WalletHistoryByCurrencyCodeQuery): Promise<WalletHistory[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<WalletHistory[]>(
            this.core.builder.buildTargetUrl('/v1/wallets/{currency_code}/history', params, query),
            'GET',
            {},
            {}
        )

        return data
    }
}