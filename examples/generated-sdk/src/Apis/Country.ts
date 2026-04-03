import type { Core as KitCore } from '@oapiex/sdk-kit'
import type { Country as CountryModel } from '../Schema'
import { Http } from '@oapiex/sdk-kit'

export class Country {
    #core: KitCore

    constructor(core: KitCore) {
        this.#core = core
    }

    async list (): Promise<CountryModel[]> {
        await this.#core.validateAccess()

        const { data } = await Http.send<CountryModel[]>(
            this.#core.builder.buildTargetUrl('/v1/countries', {}, {}),
            'GET',
            {},
            {}
        )

        return data
    }
}