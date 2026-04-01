---
layout: home

hero:
  name: 'OAPIEX'
  tagline: 'A CLI and library for extracting OpenAPI documents from ReadMe powered API docs.'
  text: OpenAPI Extraction Toolkit
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: CLI Reference
      link: /reference/cli

features:
  - title: Remote and local parsing
    details: Parse saved HTML files or live documentation URLs with one CLI.
  - title: OpenAPI generation
    details: Convert extracted operations into raw payloads or OpenAPI-shaped documents.
  - title: Crawl-aware extraction
    details: Reuse a shared browser session while crawling linked reference pages.
---

## Install

::: code-group

```bash [pnpm]
pnpm add -g oapiex
```

```bash [npm]
npm i -g oapiex
```

```bash [yarn]
yarn global add oapiex
```

:::

Or install it in a project for programmatic usage:

::: code-group

```bash [pnpm]
pnpm add oapiex
```

```bash [npm]
npm i oapiex
```

```bash [yarn]
yarn add oapiex
```

:::

## Start Here

[Getting Started](/guide/getting-started) | [Extraction Flow](/guide/extraction-flow) | [CLI Reference](/reference/cli) | [Programmatic Usage](/reference/programmatic-usage) | [Configuration Reference](/reference/configuration)
