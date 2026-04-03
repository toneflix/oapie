---
layout: doc
---

# What OAPIEX Does

OAPIEX is a CLI and TypeScript toolkit for turning documentation pages into usable developer artifacts.

At its core, OAPIEX does four related jobs:

- load remote documentation URLs or saved local HTML files
- extract operations, parameters, examples, and metadata from ReadMe-style API docs
- normalize the extracted data into OpenAPI-like documents and TypeScript modules
- generate complete TypeScript SDK packages with runtime-first, class-based, or combined output modes

OAPIEX spans the full path from scraped documentation to generated SDK package output, with `@oapiex/sdk-kit` providing the shared runtime primitives behind generated clients.

## Typical Workflow

1. Load a docs page or saved HTML source
2. Extract operation metadata and optionally crawl linked reference pages
3. Build an OpenAPI-like document or TypeScript artifact
4. Generate a TypeScript SDK package from that document
5. Use the generated package directly, or build on top of `@oapiex/sdk-kit`

## What You Can Produce

- Raw extracted payloads for inspection or custom tooling
- OpenAPI-like documents in JSON or module form
- Generated TypeScript SDK packages
- Runtime manifest bundles with `createClient()` helpers
- Class-based SDK packages with `Core`, `ApiBinder`, and generated API groups

## Start Here

- [Getting Started](/guide/getting-started)
- [SDK Generation](/guide/sdk-generation)
- [Extraction Flow](/guide/extraction-flow)
- [CLI Reference](/reference/cli)
- [Programmatic Usage](/reference/programmatic-usage)
- [SDK Kit Reference](/reference/sdk-kit)
- [Configuration Reference](/reference/configuration)
- [Release Notes](/reference/release-notes)
- [Roadmap](/project/roadmap)

## Integration Styles

- Use the CLI when you want extraction, transformation, or SDK package output with minimal setup.
- Use the `oapiex` package API when you want to load, extract, crawl, transform, or generate inside your own scripts and build tooling.
- Use generated SDK packages when you want a ready-to-publish client package.
- Use `@oapiex/sdk-kit` directly when you want to build or customize SDK behavior on top of the shared runtime.
