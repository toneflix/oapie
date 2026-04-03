import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Active, Fx as FxModel, FxInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Fx {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: FxInput): Promise<FxModel> {
        await this.#core.validateAccess()

        const { data } = await Http.send<FxModel>(
            this.#core.builder.buildTargetUrl('/v1/fx', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    async list (): Promise<Active> {
        await this.#core.validateAccess()

        const { data } = await Http.send<Active>(
            this.#core.builder.buildTargetUrl('/v1/fx', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}