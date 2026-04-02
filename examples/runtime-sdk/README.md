# @oapiex/example-runtime-sdk

An example runtime-only SDK package built on top of `@oapiex/sdk-kit`.

This package mirrors `oapie generate sdk ... -O runtime`. It exports a typed manifest bundle and a convenience `createClient()` helper so consumers do not have to wire `createSdk(exampleDocumentSdk, options)` themselves.

## Usage

```ts
import { createClient } from '@oapiex/example-runtime-sdk';

const sdk = createClient({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  environment: 'sandbox',
});

await sdk.api.examples.list({ code: 'NG' }, { 'X-Key-1': 'header-1' });
await sdk.api.profiles.get({ profileId: 'profile-1' });
```

## Commands

```bash
pnpm test
pnpm build
```
