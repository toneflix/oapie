# @oapiex/example-sdk

An example generated SDK package built on top of `@oapiex/sdk-kit`.

This package exists as a scaffold showing how extracted API groups can be mapped into a typed SDK without hardcoding endpoint logic into the shared kit.

## Structure

- `src/Core.ts`: SDK-specific `Core` subclass
- `src/Apis/BaseApi.ts`: SDK-specific API root that wires child groups
- `src/Apis/Example.ts`: Example API group
- `src/Apis/Profile.ts`: Another example API group
- `src/Contracts/Api/*`: generated request and response contracts

## Install Dependencies

Run this inside the package directory:

```bash
pnpm install
```

## Commands

Run these inside `packages/example-sdk`:

```bash
pnpm test
pnpm build
```

## Generation Pattern

The intended generated structure is:

1. create one SDK-specific `Core` subclass that points to an SDK-specific `BaseApi`
2. create one child API class per endpoint group
3. register those child APIs inside `BaseApi.boot()`
4. emit contracts beside the API classes
5. re-export the generated APIs together with the shared kit primitives
