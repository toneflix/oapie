import { BaseApi } from '../BaseApi'
import type { Cable, CableInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class CableBill extends BaseApi {

    async create (body: CableInput): Promise<Cable> {
        await this.core.validateAccess()

        const { data } = await Http.send<Cable>(
            this.core.builder.buildTargetUrl('/v1/bills/cable', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}