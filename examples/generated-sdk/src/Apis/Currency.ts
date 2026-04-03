import { BaseApi } from '../BaseApi'
import type { Currency as CurrencyModel } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Currency extends BaseApi {

    async list (): Promise<CurrencyModel[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<CurrencyModel[]>(
            this.core.builder.buildTargetUrl('/v1/currencies', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}