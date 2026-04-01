---
layout: doc
---

# What OAPIE Does

OAPIE is a CLI and library for extracting API operation data from documentation sites powered by ReadMe. It can:

- load a local HTML file or remote docs URL
- extract request parameters, examples, response examples, and metadata
- crawl linked reference pages
- convert extracted operations into an OpenAPI-like document
- write the result into the `output/` directory relative to the current working directory
- run inside your own scripts through the `oapie` package API

## Start Here

- [Getting Started](/guide/getting-started)
- [Extraction Flow](/guide/extraction-flow)
- [CLI Reference](/reference/cli)
- [Programmatic Usage](/reference/programmatic-usage)
- [Configuration Reference](/reference/configuration)
- [Roadmap](/project/roadmap)

## Integration Styles

- Use the CLI when you want file output in `output/` with minimal setup.
- Use the programmatic API when you want to load, extract, crawl, or transform pages inside your own scripts or tooling via `import { ... } from 'oapie'`.
