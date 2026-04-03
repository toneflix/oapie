# SDK Kit Reference

`@oapiex/sdk-kit` provides the shared runtime primitives used by generated SDK packages.

Most users will install a generated SDK package instead of consuming the core kit directly. Reach for the kit when you want to:

- build a custom SDK around a generated manifest
- extend or customize generated API binders
- create your own class-based SDK on top of the shared runtime

## Install

```bash
pnpm add @oapiex/sdk-kit
```

## Build An SDK From Scratch

You can use `@oapiex/sdk-kit` directly without `oapie generate sdk`.

The package gives you two workable patterns:

1. a class-based SDK built from custom API classes
2. a runtime manifest SDK built from a handwritten manifest bundle

The class-based approach is the better fit when you want a conventional SDK package with explicit methods, custom organization, and full control over types.

The runtime-manifest approach is the better fit when you want a lightweight adapter around a known route manifest.

### Class-Based SDK Structure

A minimal handwritten SDK usually looks like this:

```text
src/
  Contracts/
    Example.ts
  Apis/
    Example.ts
  BaseApi.ts
  ApiBinder.ts
  Core.ts
  index.ts
```

### 1. Define Your Contracts

Start with the request and response types your SDK methods will return.

```ts
export interface Example {
  id: string;
  code: string;
}

export interface ListExamplesQuery {
  code?: string;
}

export interface CreateExampleInput {
  code: string;
}
```

### 2. Create API Classes

Each API class should extend `BaseApi` so it can access `this.core`, `this.core.builder`, and `this.core.validateAccess()`.

```ts
import { BaseApi, Http } from '@oapiex/sdk-kit';

import type {
  CreateExampleInput,
  Example,
  ListExamplesQuery,
} from '../Contracts/Example';

export class ExampleApi extends BaseApi {
  async list(query: ListExamplesQuery = {}): Promise<Example[]> {
    await this.core.validateAccess();

    const { data } = await Http.send<Example[]>(
      this.core.builder.buildTargetUrl('/v1/examples', {}, query),
      'GET',
      {},
      {},
    );

    return data;
  }

  async create(body: CreateExampleInput): Promise<Example> {
    await this.core.validateAccess();

    const { data } = await Http.send<Example>(
      this.core.builder.buildTargetUrl('/v1/examples', {}, {}),
      'POST',
      body,
      {},
    );

    return data;
  }
}
```

### 3. Create An API Binder

The binder is the root API object exposed on `sdk.api`. Its job is to create and register your child API classes.

```ts
import { BaseApi } from '@oapiex/sdk-kit';

import { ExampleApi } from './Apis/Example';

export class ApiBinder extends BaseApi {
  examples!: ExampleApi;

  protected override boot() {
    this.examples = new ExampleApi(this.core);
  }
}
```

### 4. Create A Core Subclass

Your SDK-specific `Core` subclass points `apiClass` at the binder and narrows the `api` property type.

```ts
import { Core as KitCore } from '@oapiex/sdk-kit';

import { ApiBinder } from './ApiBinder';

export class Core extends KitCore {
  static override apiClass = ApiBinder;

  declare api: ApiBinder;
}
```

### 5. Export A Clean Package Entry

Your package entry should usually export the SDK root, binder, contracts, and any shared types you want consumers to use directly.

```ts
export * from './Contracts/Example';
export { ExampleApi } from './Apis/Example';
export { ApiBinder } from './ApiBinder';
export { Core } from './Core';

export type { InitOptions, UnifiedResponse } from '@oapiex/sdk-kit';
export { Builder, Http } from '@oapiex/sdk-kit';
```

### 6. Instantiate The SDK

```ts
import { Core } from 'your-sdk';

const sdk = new Core({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  environment: 'sandbox',
});

await sdk.api.examples.list({ code: 'NG' });
```

## Access Validation

You can register an access validator if the SDK should enforce custom auth or readiness checks before requests are made.

```ts
sdk.setAccessValidator(async (core) => {
  return core.getEnvironment() ? true : 'SDK is not initialized correctly';
});
```

Generated SDKs rely on the same mechanism.

## Runtime Manifest SDK From Scratch

If you do not want handwritten API classes, you can hand-author a runtime manifest bundle and bind it with `createSdk()`.

```ts
import { createSdk, type RuntimeSdkBundle } from '@oapiex/sdk-kit';

const bundle = {
  document: {},
  manifest: {
    groups: [
      {
        className: 'Example',
        propertyName: 'examples',
        operations: [
          {
            path: '/v1/examples',
            method: 'GET',
            methodName: 'list',
            responseType: 'Example[]',
            inputType: 'Record<string, never>',
            queryType: 'ListExamplesQuery',
            headerType: 'Record<string, never>',
            paramsType: 'Record<string, never>',
            hasBody: false,
            bodyRequired: false,
            pathParams: [],
            queryParams: [
              {
                name: 'code',
                accessor: 'code',
                in: 'query',
                required: false,
              },
            ],
            headerParams: [],
          },
        ],
      },
    ],
  },
} satisfies RuntimeSdkBundle;

const sdk = createSdk(bundle, {
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  environment: 'sandbox',
});

await sdk.api.examples.list({ code: 'NG' });
```

This avoids writing API classes, but you lose the clarity and explicitness of handwritten method implementations.

## When To Use The Generator Anyway

Building from scratch is useful when:

- the API surface is small
- you want a highly curated SDK
- you already have your own domain contracts and naming
- you want to wrap a non-OpenAPI source manually

The generator is still the better choice when:

- the API is large
- you want complete route coverage quickly
- you want generated schema types, runtime manifests, JSDoc, README output, and tests out of the box
- you want class and runtime SDK entrypoints emitted consistently from one source document

## Main Exports

### `Core`

The base authenticated SDK client.

`Core` handles:

- environment selection
- builder setup
- access validation
- API bootstrapping
- runtime manifest binding through `useDocument()` and `useSdk()`

### `BaseApi`

The base API class used for SDK-specific binders and generated API classes.

Generated SDKs build on top of this by:

1. creating a package-local `BaseApi` subclass
2. creating an `ApiBinder` that wires child API groups in `boot()`
3. making generated API classes extend the package-local `BaseApi`

### `createSdk()`

Helper for creating a runtime SDK from a generated manifest bundle.

```ts
import { createSdk } from '@oapiex/sdk-kit';
import { extractedApiDocumentSdk } from './Schema';

const sdk = createSdk(extractedApiDocumentSdk, {
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  environment: 'sandbox',
});
```

### `createRuntimeApi()`

Lower-level helper that binds manifest operations onto a `BaseApi` instance.

Generated packages usually hide this behind `createClient()` or `Core.useDocument()`.

### `Http`

Shared HTTP transport wrapper used by both generated class methods and runtime manifest calls.

### `Builder`

Utility used to resolve target URLs and environment-specific base URLs.

## Contracts And Types

The package also exports shared contracts and helper types, including:

- `InitOptions`
- `UnifiedResponse`
- `RuntimeSdkBundle`
- `RuntimeSdkManifest`
- `InferRuntimeSdkApi`

## Class-Based Example

```ts
import { BaseApi, Core, Http } from '@oapiex/sdk-kit';

class ExampleApi extends BaseApi {
  async list() {
    await this.core.validateAccess();

    const { data } = await Http.send(
      this.core.builder.buildTargetUrl('/v1/examples', {}, {}),
      'GET',
      {},
      {},
    );

    return data;
  }
}

class ApiBinder extends BaseApi {
  examples!: ExampleApi;

  protected override boot() {
    this.examples = new ExampleApi(this.core);
  }
}

class ExampleCore extends Core {
  static override apiClass = ApiBinder;

  declare api: ApiBinder;
}
```

## Runtime Manifest Example

```ts
import { createSdk } from '@oapiex/sdk-kit';
import { extractedApiDocumentSdk } from './Schema';

const sdk = createSdk(extractedApiDocumentSdk, {
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  environment: 'sandbox',
});

await sdk.api.examples.list({ code: 'NG' });
```

## Related Docs

- [SDK Generation](/guide/sdk-generation)
- [Programmatic Usage](/reference/programmatic-usage)
- [CLI Reference](/reference/cli)
