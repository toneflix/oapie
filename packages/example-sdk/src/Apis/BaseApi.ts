import { BaseApi as KitBaseApi } from '@oapiex/sdk-kit'

import { Example } from './Example'
import { Profile } from './Profile'

export class BaseApi extends KitBaseApi {
    examples!: Example
    profiles!: Profile

    protected override boot () {
        this.examples = new Example(this.core)
        this.profiles = new Profile(this.core)
    }
}