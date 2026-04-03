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
