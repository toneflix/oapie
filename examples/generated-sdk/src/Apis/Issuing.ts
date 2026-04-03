import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { CustomerByIdParams, Issuing as IssuingModel, IssuingGetIssuingQuery, IssuingInput } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Issuing {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: IssuingInput): Promise<IssuingModel> {
        await this.#core.validateAccess()

        const { data } = await Http.send<IssuingModel>(
            this.#core.builder.buildTargetUrl('/v1/issuing', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    async list (query: IssuingGetIssuingQuery): Promise<IssuingModel[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<IssuingModel[]>(
            this.#core.builder.buildTargetUrl('/v1/issuing', {}, query),
            'GET',
            {},
            {}
        )

        return data
    }

    async get (params: CustomerByIdParams): Promise<IssuingModel> {
        await this.#core.validateAccess()

        const { data } = await Http.send<IssuingModel>(
            this.#core.builder.buildTargetUrl('/v1/issuing/{id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}