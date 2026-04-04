# Release Notes

## oapiex 0.3.7

`0.3.7` is a patch release focused on config authoring ergonomics, clearer separation between typed config helpers and runtime config resolution, and improved runtime example compatibility.

### Highlights

- Refactored `defineConfig()` in both `oapiex` and `@oapiex/sdk-kit` into a lightweight typed helper for autocomplete-only usage.
- Moved runtime config merging into dedicated internal helpers so config files no longer pull in heavy runtime modules just to get type support.
- Improved config-file loading and example runtime compatibility across the main library, sdk-kit, and checked-in example SDKs.

### Config Authoring And Loading

- Added dedicated lightweight config helper modules for both the root package and `@oapiex/sdk-kit`.
- `defineConfig()` now behaves as a simple identity-style typing helper rather than performing runtime default merging.
- Runtime defaults are now applied through explicit config resolution paths such as:
  - `resolveConfig()` in the main library
  - `Application` config consumption
  - sdk-kit runtime config update and load flows
- The main library now uses Jiti for `oapiex.config.ts`, `oapiex.config.js`, and `oapiex.config.cjs` loading, aligning config-file resolution with sdk-kit.

### SDK Kit And Example Runtime Fixes

- Updated sdk-kit internal config state management to use dedicated runtime update helpers instead of overloading `defineConfig()`.
- Fixed checked-in runtime and combined SDK examples so their manifest bundle types include the current runtime security metadata shape, including `securitySchemes`.
- Preserved typed autocomplete support for shared `sdkKit` and `sdk` config blocks in root `oapiex.config.*` files.

### Test And Developer Experience Improvements

- Removed heavy runtime imports from the checked-in root config path so test workers no longer pay unnecessary startup cost when config files are discovered.
- Restored fast and stable full-suite execution after config-loader and sdk-kit runtime changes.
- Updated programmatic usage docs to clarify that `defineConfig()` is a typed config helper and that runtime defaults are applied later by the consuming runtime.

## oapiex 0.3.5

`0.3.5` is a patch release focused on sdk-kit configuration usability, typed config authoring, and small packaging polish for the shared SDK runtime.

### Highlights

- Added file-backed sdk-kit initialization through `oapiex.config.ts`, `oapiex.config.js`, and `oapiex.config.cjs`.
- Added typed `sdkKit` config support on the root `oapiex` config surface so shared config files now get editor autocomplete.
- Improved `@oapiex/sdk-kit` package metadata and loader internals to reduce editor friction around config authoring and module loading.

### SDK Kit Configuration

- `@oapiex/sdk-kit` now reads init defaults from `oapiex.config.*` in the current working directory.
- Config-file loading supports the full sdk-kit init surface, including:
  - `clientId`
  - `clientSecret`
  - `environment`
  - `urls`
  - `headers`
  - `timeout`
  - `encryptionKey`
  - `auth`
  - `debugLevel`
- Explicit constructor options still override values loaded from `oapiex.config.*`.
- Shared extractor config files can now safely scope SDK runtime defaults under `sdkKit` or `sdk`.

### Typing And Packaging Improvements

- Added root config typing for `sdkKit` and `sdk` so `defineConfig({ sdkKit: { ... } })` has autocomplete support.
- Updated sdk-kit package export metadata to expose the main declaration entry more clearly for editor resolution.
- Switched the Jiti loader setup to the supported named export and removed the deprecated direct callable usage warning from the sdk-kit config loader.

### Documentation And Validation

- Updated sdk-kit docs to prefer `export default defineConfig(...)` for both dedicated sdk-kit config files and shared root `oapiex.config.*` files.
- Expanded sdk-kit config coverage with tests for file-backed config loading and explicit override precedence.

## oapiex 0.3.4

`0.3.4` is a focused patch release that tightens generated SDK naming and improves runtime SDK diagnostics and initialization ergonomics.

### Highlights

- Added init-time SDK debug configuration through `debugLevel: 0 | 1 | 2 | 3`, alongside the existing `client.debug(level)` runtime control.
- Relaxed SDK initialization so `clientId` is optional and `clientSecret` is only required when no auth strategy is already configured.
- Fixed generated SDK naming so singular words like `status` are preserved instead of being incorrectly trimmed to values like `Statu`.

### SDK Runtime Improvements

- `@oapiex/sdk-kit` now supports `debugLevel` directly in `InitOptions`, making it possible to enable request logging during SDK construction.
- Expanded SDK docs to explain the current debug flow, including when to use `debugLevel` versus `client.debug(level)`.
- Improved runtime logging support and related test coverage around SDK initialization and HTTP debug behavior.

### SDK Generation Fixes

- Corrected singularization rules in the TypeScript naming pipeline so singular segments ending in `s` are preserved.
- Added regression coverage to ensure generated schema types, API class names, and manifests keep `status`-based names intact.
- Updated the checked-in generated SDK example to align with the corrected naming output.

## oapiex 0.3.0

`0.3.0` expands the generated SDK runtime beyond route scaffolding into real-world client setup, authentication, and security-aware SDK output. This release adds configurable runtime clients, generated auth helpers from OpenAPI security schemes, validator-driven auth refresh, and stronger docs around using `@oapiex/sdk-kit` directly or through generated SDK packages.

### Highlights

- Generated SDKs now preserve OpenAPI security schemes and emit auth helper functions such as `createBearerAuth()`, `createBasicAuth()`, `createPartnerKeyAuth()`, and `createOauthAuth()` when the source document includes `components.securitySchemes`.
- Added first-class SDK runtime configuration for custom URLs, default headers, timeouts, encryption key overrides, and pluggable auth strategies.
- Added validator-driven auth replacement so `setAccessValidator()` can mint or replace auth before guarded requests are sent.
- Added `createAccessTokenCache()` and `createAuthCache()` to support cached token refresh flows for APIs that issue short-lived bearer tokens.
- Expanded the docs to cover sdk-kit configuration, auth strategies, generated security helpers, and a recommended cached-token refresh pattern.

### Runtime Configuration And Auth

- `InitOptions` now supports:
  - `urls`
  - `headers`
  - `timeout`
  - `encryptionKey`
  - `auth`
- Added support for multiple drop-in auth shapes across the shared transport layer:
  - bearer
  - OAuth2-style access tokens
  - basic auth
  - API keys in headers, query params, or cookies
  - custom request mutators
- Added shared config merging for runtime SDK setup so auth and request defaults are applied consistently across both generated class-based SDKs and manifest-driven runtime SDKs.

### Security-Aware SDK Generation

- Generated schema modules now carry security metadata from the extracted OpenAPI document.
- Generated SDK manifests now include:
  - `securitySchemes`
  - document-level `security`
  - operation-level security requirements
- Generated package entrypoints now export security metadata and generated auth helper factories alongside `createClient()` and `Core`.
- Generated README output now includes auth-aware quick-start snippets when the source API defines security schemes.

### Access Validation And Token Refresh

- `setAccessValidator()` can now:
  - allow requests unchanged
  - fail requests with a custom error message
  - return replacement auth config
  - return partial runtime config updates
- `Core` now exposes the runtime state needed for auth bootstrapping flows, including client credentials and current config accessors.
- Added cached access-token helpers so SDKs can exchange client credentials for bearer tokens and reuse them until expiry instead of re-authenticating on every request.

### Documentation And Examples

- Added a dedicated `@oapiex/sdk-kit` reference covering:
  - runtime configuration
  - auth strategies
  - handwritten SDK construction
  - validator-driven auth refresh
  - cached token refresh helpers
- Expanded the SDK generation guide with:
  - generated security helper behavior
  - recommended auth refresh patterns for generated SDKs
- Updated example SDK documentation to show validator-based cached token refresh in a combined-mode SDK package.

### Testing And Internal Changes

- Expanded sdk-kit tests to cover:
  - runtime configuration merging
  - auth strategy application
  - validator-driven auth replacement
  - cached token reuse until expiry
- Extended generator tests to validate security scheme emission, generated auth helpers, and auth-aware README output.
- Added new sdk-kit utility exports for auth caching and strengthened the runtime manifest typing surface to include security metadata.

### Potentially Breaking Or Notable Output Changes

- Generated SDK packages may now expose additional exports for auth helpers and security metadata when the source API includes security schemes.
- Consumers with custom wrapper code around generated SDK entrypoints may need to account for the richer generated runtime manifest shape.
- Access validation is now capable of mutating auth and shared runtime config, which is more powerful than the earlier boolean-or-error gate behavior.

## oapiex 0.2.0

`0.2.0` is a substantial SDK-generation release focused on turning extracted OpenAPI documents into usable TypeScript SDK packages with better structure, better docs, better examples, and stronger test coverage.

### Highlights

- Added a full SDK package generator with support for `runtime`, `classes`, and `both` output modes.
- Introduced a stronger SDK generation pipeline built around `TypeScriptShapeBuilder`, `TypeBuilder`, and improved naming/shape inference.
- Added checked-in example SDKs for runtime-only, class-based, and combined usage.
- Generated SDK methods now include richer JSDoc pulled from OpenAPI metadata, including summaries, descriptions, parameter descriptions, and response descriptions.
- Generated SDK packages now include a concise README with install instructions, quick-start usage, main exports, and build/test commands.
- Added generated SDK samples and broader generator test coverage, including URL-based and TypeScript-artifact-based generation flows.

### SDK Generation Improvements

- Added support for generating complete SDK packages from extracted documentation or TypeScript OpenAPI artifacts.
- Added runtime helper generation through `createClient()` so consumers can use generated runtime bundles without wiring `createSdk(...)` manually.
- Added support for grouped and flat method signatures.
- Improved namespace and method naming strategies, including better handling for nested resources and path-param-heavy routes.
- Improved generated SDK structure by introducing `ApiBinder` and a package-local `BaseApi`, reducing per-class boilerplate and making generated class APIs more consistent.
- Added support for richer generated exports and generated API tests.

### Documentation and Developer Experience

- Added generated README support for SDK packages.
- Added example SDK packages that demonstrate:
  - runtime-only usage
  - class-based usage
  - combined runtime + class-based usage
- Added more inline JSDoc in generation-related source code and generated SDK methods.

### Testing and Coverage

- Expanded test coverage for SDK generation and TypeScript module rendering.
- Added generated SDK example tests for exports, runtime usage, and class-based usage.
- Added coverage tooling and coverage scripts.
- Updated CI to run coverage-focused validation and improved Vitest configuration and aliases.

### Tooling and Release Automation

- Updated GitHub Actions to use Node.js 24.
- Improved publish workflow version resolution so release-triggered publishes use the release version.
- Extended publish automation to bump and publish workspace packages under `packages/*`.
- Added release automation improvements for package publishing and release creation.

### Notable Internal Changes

- Added `TypeScriptShapeBuilder` to improve schema inference and type generation.
- Refined OpenAPI-to-TypeScript rendering behavior and naming support.
- Improved handling of generated parameter metadata and documentation in SDK manifests.

### Potentially Breaking or Notable Output Changes

- Class-based generated SDK structure changed:
  - generated APIs now use `ApiBinder`
  - generated API classes inherit from a generated `BaseApi`
- Generated package layout and exports are richer than before, including README generation and more helper exports.
- Consumers relying on the older generated class layout may need to update imports or assumptions about generated file structure.
