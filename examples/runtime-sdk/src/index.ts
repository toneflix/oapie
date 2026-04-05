import type { InitOptions, BaseApi as KitBaseApi, Core as KitCore } from '@oapiex/sdk-kit'

import type { ExampleDocumentApi } from './Schema'
import { createSdk as createBoundSdk } from '@oapiex/sdk-kit'
import { exampleDocumentSdk } from './Schema'

export * from './Schema'

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
    setConfigFileBasename,
    UnauthorizedRequestException,
    WebhookValidator,
    createSdk,
} from '@oapiex/sdk-kit'

export type {
    InitOptions,
    UnifiedResponse,
    XGenericObject,
} from '@oapiex/sdk-kit'
