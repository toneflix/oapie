# SDK Generation

OAPIEX can generate a full TypeScript SDK package from either:

- a live documentation URL
- a saved parsed OpenAPI TypeScript artifact

The CLI entrypoint is:

```bash
oapie generate sdk <source>
```

This writes a ready-to-build package scaffold containing generated schema types, package metadata, tests, and one or more SDK entrypoints depending on the selected output mode.

## Generate From A Documentation URL

```bash
oapie generate sdk https://maplerad.dev/reference/create-a-customer \
  --dir=./output/sdk \
  --crawl \
  --output-mode=both
```

This flow:

1. loads the source page
2. extracts the normalized operation metadata
3. optionally crawls linked sidebar operations
4. builds an OpenAPI-like document
5. emits a TypeScript SDK package scaffold

## Generate From A Parsed TypeScript Artifact

If you already parsed the source into a `.ts` or `.js` OpenAPI module, you can generate the SDK from that file directly.

```bash
oapie generate sdk ./output/https_maplerad_dev_reference_create-a-customer.openapi.ts \
  --dir=./output/generated-sdk \
  --output-mode=both
```

This is useful when you want a repeatable two-step workflow:

1. parse and inspect the extracted OpenAPI module
2. generate the SDK from that artifact later

## Output Modes

### `runtime`

Generates a runtime-first package that exports the generated manifest bundle and a `createClient()` helper.

Use this mode when you want the smallest SDK surface and prefer manifest-driven runtime calls.

```bash
oapie generate sdk <source> --output-mode=runtime
```

### `classes`

Generates a class-based package built around:

- `Core`
- `ApiBinder`
- `BaseApi`
- generated API classes under `src/Apis/*`

Use this mode when you want explicit generated classes without the runtime helper entrypoint.

```bash
oapie generate sdk <source> --output-mode=classes
```

### `both`

Generates both entry styles in the same package.

This is the default and the best option when you want consumers to choose between class-based and runtime-first access.

```bash
oapie generate sdk <source> --output-mode=both
```

## Signature Styles

Generated class methods support two signature styles.

### `grouped`

Groups params by request section.

```ts
await sdk.api.examples.list(query, headers);
await sdk.api.profiles.get(params);
```

This is the default and usually the easiest to work with.

### `flat`

Spreads path, query, and header members into flat method arguments.

```ts
await sdk.api.examples.list(code, xKey1);
```

Use this when you prefer narrower positional arguments over grouped objects.

## Naming Strategies

### `namespace-strategy`

- `smart`: prefers shorter resource names unless a scoped name is needed to avoid collisions
- `scoped`: prefers more contextual names for nested resources

### `method-strategy`

- `smart`: derives method names from HTTP method and route semantics
- `operation-id`: uses the OpenAPI `operationId` when available

## Generated Package Layout

Depending on output mode, generated packages contain some or all of these files:

- `README.md`
- `package.json`
- `src/Schema.ts`
- `src/index.ts`
- `src/Core.ts` in class-enabled modes
- `src/ApiBinder.ts` in class-enabled modes
- `src/BaseApi.ts` in class-enabled modes
- `src/Apis/*` in class-enabled modes
- `tests/exports.test.ts`

## Generated Method Documentation

Generated class methods emit JSDoc based on the extracted OpenAPI metadata. When available, the generated comments include:

- operation summary
- operation description
- HTTP method and path
- operation ID
- parameter descriptions
- request body description
- success response description

## Generated README Support

Each generated SDK package now includes a concise `README.md` with:

- what the package is
- install command
- quick start for the selected output mode
- main exports
- build and test commands

## Generated Security Helpers

When the source OpenAPI document includes `components.securitySchemes`, generated SDK packages now emit auth metadata and helper functions alongside `createClient()` and `Core`.

Generated packages export:

- `securitySchemes`: normalized security scheme metadata from the manifest
- `security`: document-level security requirements when present
- helper functions such as `createBearerAuth()`, `createBasicAuth()`, `createPartnerKeyAuth()`, or `createOauthAuth()` depending on the source schemes

Example:

```ts
import {
  Core,
  createBearerAuth,
  createPartnerKeyAuth,
  createQueryKeyAuth,
} from 'generated-sdk';

const sdk = new Core({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  environment: 'sandbox',
  auth: [
    createPartnerKeyAuth(process.env.PARTNER_KEY_VALUE!),
    createQueryKeyAuth(process.env.QUERY_KEY_VALUE!),
  ],
});
```

The helper signatures are derived from the security scheme type:

- HTTP bearer schemes map to bearer-style auth helpers
- HTTP basic schemes map to username/password helpers
- API key schemes map to header, query, or cookie auth helpers
- OAuth2 and OpenID Connect schemes map to access-token helpers

This keeps generated SDK setup aligned with the shared `InitOptions.auth` contract exposed by `@oapiex/sdk-kit`.

## Recommended Auth Refresh Pattern

If the target API requires exchanging your client credentials for an expiring bearer token, prefer `setAccessValidator()` together with `createAccessTokenCache()`.

This keeps the auth flow outside generated request methods, while avoiding a token-refresh request before every API call.

```ts
import axios from 'axios';
import { Core } from 'generated-sdk';
import { createAccessTokenCache } from '@oapiex/sdk-kit';

const sdk = new Core({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  environment: 'sandbox',
  urls: {
    sandbox: 'https://developersandbox-api.example.com',
  },
});

const tokenCache = createAccessTokenCache(async (core) => {
  const response = await axios.post(
    'https://developersandbox-api.example.com/auth/token',
    {
      client_id: core.getClientId(),
      client_secret: core.getClientSecret(),
    },
  );

  return {
    token: response.data.access_token,
    expiresInSeconds: Math.max((response.data.expires_in ?? 60) - 30, 1),
  };
});

sdk.setAccessValidator(tokenCache);

await sdk.api.examples.list({ code: 'NG' }, { 'X-Key-1': 'header-1' });
```

This makes sense when:

- The API uses an auth endpoint to mint bearer tokens from your client credentials
- Tokens expire and need periodic refresh
- You want generated SDK calls to stay unchanged while auth refresh remains centralized

If the source OpenAPI document already emits auth helpers such as `createBearerAuth()`, the validator can still return those helper results or a config object containing `auth`.

## Examples

See the checked-in example packages for concrete generated output shapes:

- `examples/runtime-sdk`
- `examples/both-sdk`
- `examples/generated-sdk`

## Related Docs

- [CLI Reference](/reference/cli)
- [Output Files](/guide/output-files)
- [SDK Kit Reference](/reference/sdk-kit)
- [Release Notes](/reference/release-notes)
