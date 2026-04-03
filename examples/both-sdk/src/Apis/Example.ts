import type { ExampleApiResponse, ExampleHeader, ExampleInput, ExampleQuery } from '../Schema'

import { BaseApi } from '../BaseApi'
import { Http } from '@oapiex/sdk-kit'

export class Example extends BaseApi {

    async list (query: ExampleQuery, headers?: ExampleHeader): Promise<ExampleApiResponse[]> {
        await this.core.validateAccess()

        const { data } = await Http.send<ExampleApiResponse[]>(
            this.core.builder.buildTargetUrl('/app/example', {}, query),
            'GET',
            {},
            ((headers ? { ...headers } : {}) as Record<string, string | undefined>)
        )

        return data
    }

    async save (body: ExampleInput, headers?: ExampleHeader): Promise<ExampleApiResponse> {
        await this.core.validateAccess()

        const { data } = await Http.send<ExampleApiResponse>(
            this.core.builder.buildTargetUrl('/app/example'),
            'POST',
            body,
            ((headers ? { ...headers } : {}) as Record<string, string | undefined>)
        )

        return data
    }
}
