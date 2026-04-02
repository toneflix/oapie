import { Core as KitCore } from '@oapiex/sdk-kit'

import { BaseApi } from './Apis/BaseApi'

export class Core extends KitCore {
    static override apiClass = BaseApi

    declare api: BaseApi
}
