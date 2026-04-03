# @oapiex/example-both-sdk

An example SDK package that mirrors `oapie generate sdk ... -O both`.

This package shows both integration styles from the same output:

- class-based access through a generated `Core` and `BaseApi`
- runtime-first access through `createClient()` and the emitted manifest bundle

## Usage

```ts
import { Core, createClient } from '@oapiex/example-both-sdk';
import { createAccessTokenCache } from '@oapiex/sdk-kit';

const classSdk = new Core({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  environment: 'sandbox',
});

await classSdk.api.examples.list({ code: 'NG' }, { 'X-Key-1': 'header-1' });

const runtimeSdk = createClient({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  environment: 'sandbox',
});

await runtimeSdk.api.profiles.get({ profileId: 'profile-1' });

const tokenCache = createAccessTokenCache(async (core) => {
  const response = await fetch('https://developersandbox-api.example.com/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: core.getClientId(),
      client_secret: core.getClientSecret(),
    }),
  }).then((res) => res.json());

  return {
    token: response.access_token,
    expiresInSeconds: Math.max((response.expires_in ?? 60) - 30, 1),
  };
});

classSdk.setAccessValidator(tokenCache);
```

## Commands

```bash
pnpm test
pnpm build
```
