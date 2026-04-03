import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Data, DataInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class DataBill {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: DataInput): Promise<Data> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Data>(
            this.#core.builder.buildTargetUrl('/v1/bills/data', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}