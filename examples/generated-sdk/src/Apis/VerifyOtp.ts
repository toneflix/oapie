import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { VerifyOtp as VerifyOtpModel, VerifyOtpInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class VerifyOtp {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: VerifyOtpInput): Promise<VerifyOtpModel> {
        await this.#core.validateAccess()

        const { data } = await Http.send<VerifyOtpModel>(
            this.#core.builder.buildTargetUrl('/v1/collections/momo/verify-otp', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}