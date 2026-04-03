import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Subscription as SubscriptionModel, SubscriptionParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Subscription {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async get (params: SubscriptionParams): Promise<SubscriptionModel[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<SubscriptionModel[]>(
            this.#core.builder.buildTargetUrl('/v1/bills/cable/subscriptions/{biller_identifier}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}