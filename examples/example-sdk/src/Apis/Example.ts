import type { CountryCode } from '@oapiex/sdk-kit'
import type { ExampleApiResponse, ExampleInput } from '../Contracts'

import { BaseApi } from '../BaseApi'
import { Http } from '@oapiex/sdk-kit'

export class Example extends BaseApi {

    async list (code: CountryCode, key1?: string): Promise<ExampleApiResponse[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<ExampleApiResponse[]>(
            this.core.builder.buildTargetUrl('/app/example', {}, { code }),
            'GET',
            {},
            { 'X-Key-1': key1 }
        )

        return data
    }

    async save (params: ExampleInput, key1?: string, key2?: string): Promise<ExampleApiResponse> {
        await this.core.validateAccess()

        const { data } = await Http.send<ExampleApiResponse>(
            this.core.builder.buildTargetUrl('/app/example'),
            'POST',
            params,
            { 'X-Key-1': key1, 'X-Key-2': key2 }
        )

        return data
    }
}