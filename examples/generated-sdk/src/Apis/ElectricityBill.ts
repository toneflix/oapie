import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Electricity, ElectricityInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class ElectricityBill {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: ElectricityInput): Promise<Electricity> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Electricity>(
            this.#core.builder.buildTargetUrl('/v1/bills/electricity', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }
}