import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Counterparty as CounterpartyModel, CounterpartyByCounterPartyIdParams, CounterpartyInput, CustomerByIdParams } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Counterparty {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async create (body: CounterpartyInput): Promise<CounterpartyModel> {
        await this.#core.validateAccess()

        const { data } = await Http.send<CounterpartyModel>(
            this.#core.builder.buildTargetUrl('/v1/collections/virtual-account/counterparties', {}, {}),
            'POST',
            body ?? {},
            {}
        )

        return data
    }

    async get (params: CounterpartyByCounterPartyIdParams): Promise<CounterpartyModel[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<CounterpartyModel[]>(
            this.#core.builder.buildTargetUrl('/v1/collections/virtual-account/counterparties/{counter_party_id}', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }

    async list (params: CustomerByIdParams): Promise<CounterpartyModel[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<CounterpartyModel[]>(
            this.#core.builder.buildTargetUrl('/v1/collections/virtual-account/{id}/counterparties', params, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}