# Development

## Install Dependencies

```bash
pnpm install
```

## Useful Scripts

```bash
pnpm test
pnpm test:watch
pnpm build
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
```

## Project Layout

- `src/`: application logic, extractors, transforms, and CLI commands
- `tests/`: Vitest coverage for commands, application flow, and helpers
- `docs/`: VitePress documentation site

## Current Build And Test Tooling

- Build: `tsdown`
- Tests: `vitest`
- Docs: `vitepress`
- Lint: `eslint`

## Local Validation

Before publishing changes, run:

```bash
pnpm test
pnpm build
pnpm docs:build
```
