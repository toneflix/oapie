import { BaseApi } from './BaseApi'

import { Example } from './Apis/Example'
import { Profile } from './Apis/Profile'

export class ApiBinder extends BaseApi {
    examples!: Example
    profiles!: Profile

    protected override boot () {
        this.examples = new Example(this.core)
        this.profiles = new Profile(this.core)
    }
}