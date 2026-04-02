import type { BaseApi as KitBaseApi, Core as KitCore, InitOptions } from '@oapiex/sdk-kit'
import { createSdk as createBoundSdk } from '@oapiex/sdk-kit'
import type { ExampleDocumentApi } from './Schema'
import { exampleDocumentSdk } from './Schema'

export * from './Schema'
export { BaseApi } from './Apis/BaseApi'
export { Example as ExampleApi } from './Apis/Example'
export { Profile as ProfileApi } from './Apis/Profile'
export { Core } from './Core'

export const createClient = (
    options: InitOptions
): KitCore & { api: KitBaseApi & ExampleDocumentApi } =>
    createBoundSdk(exampleDocumentSdk, options) as KitCore & { api: KitBaseApi & ExampleDocumentApi }

export {
    BadRequestException,
    Builder,
    ForbiddenRequestException,
    Http,
    HttpException,
    UnauthorizedRequestException,
    WebhookValidator,
    createSdk,
} from '@oapiex/sdk-kit'

export type {
    InitOptions,
    UnifiedResponse,
    XGenericObject,
} from '@oapiex/sdk-kit'
