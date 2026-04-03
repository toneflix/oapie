import { Core as KitCore } from '@oapiex/sdk-kit'

import { ApiBinder } from './ApiBinder'

export class Core extends KitCore {
    static override apiClass = ApiBinder

    declare api: ApiBinder
}