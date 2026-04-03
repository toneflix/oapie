# Release Notes

## oapiex 0.2.0

`0.2.0` is a substantial SDK-generation release focused on turning extracted OpenAPI documents into usable TypeScript SDK packages with better structure, better docs, better examples, and stronger test coverage.

### Highlights

- Added a full SDK package generator with support for `runtime`, `classes`, and `both` output modes.
- Introduced a stronger SDK generation pipeline built around `TypeScriptShapeBuilder`, `TypeScriptTypeBuilder`, and improved naming/shape inference.
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
