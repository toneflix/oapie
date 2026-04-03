import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Quote, QuoteInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class QuoteFx {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: QuoteInput): Promise<Quote> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Quote>(
            this.#core.builder.buildTargetUrl('/v1/fx/quote', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}