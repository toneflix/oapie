import { BaseApi } from '../BaseApi'
import type { Airtime, AirtimeInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class AirtimeBill extends BaseApi {

    async create (body: AirtimeInput): Promise<Airtime> {
        await this.core.validateAccess()

        const { data } = await Http.send<Airtime>(
            this.core.builder.buildTargetUrl('/v1/bills/airtime', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    async list (): Promise<Airtime[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<Airtime[]>(
            this.core.builder.buildTargetUrl('/v1/bills/airtime', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}