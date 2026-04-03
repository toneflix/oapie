import { BaseApi } from '../BaseApi'
import type { VerifyOtp as VerifyOtpModel, VerifyOtpInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class VerifyOtp extends BaseApi {

    async create (body: VerifyOtpInput): Promise<VerifyOtpModel> {
        await this.core.validateAccess()

        const { data } = await Http.send<VerifyOtpModel>(
            this.core.builder.buildTargetUrl('/v1/collections/momo/verify-otp', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}