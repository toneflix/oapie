import { BaseApi } from '../BaseApi'
import type { Active, KycLinkInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class KycLink extends BaseApi {

    async create (body: KycLinkInput): Promise<Active> {
        await this.core.validateAccess()

        const { data } = await Http.send<Active>(
            this.core.builder.buildTargetUrl('/v1/collections/usd/kyc_link', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}