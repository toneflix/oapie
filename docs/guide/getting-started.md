# Getting Started

## Install

Install the CLI globally:

::: code-group

```bash [pnpm]
pnpm add -g oapie
```

```bash [npm]
npm i -g oapie
```

```bash [yarn]
yarn global add oapie
```

:::

Or install it locally in a project:

::: code-group

```bash [pnpm]
pnpm add oapie
```

```bash [npm]
npm i oapie
```

```bash [yarn]
yarn add  oapie
```

:::

Use the global install when you want the `oapie` command everywhere.

Use the project dependency when you want programmatic imports in your own scripts or build tooling.

## First Parse

```bash
oapie parse https://maplerad.dev/reference/create-a-customer \
  --shape=openapi \
  --output=json
```

That command loads the documentation page, extracts the operation metadata, normalizes it into an OpenAPI-like document, and writes the result into `output/`.

## Crawl A Full Section

```bash
oapie parse https://maplerad.dev/reference/create-a-customer \
  --shape=openapi \
  --output=js \
  --crawl
```

When crawl mode is enabled, OAPIE resolves sidebar links from the current page and visits each discovered operation page.

## Initialize Config

```bash
oapie init
```

This creates `oapie.config.js` in the current directory with the default settings.

## Programmatic Usage

If you want to use OAPIE without the CLI, install it as a dependency and import from `oapie`:

```ts
import { Application, extractReadmeOperationFromHtml } from 'oapie';

const app = new Application({ browser: 'puppeteer' });
const html = await app.loadHtmlSource(
  'https://docs.example.com/reference/jobs',
  true,
);
const operation = extractReadmeOperationFromHtml(html);

console.log(operation);
```

See [Programmatic Usage](/reference/programmatic-usage) for the full API flow.

## Local HTML Files

You can also parse a saved HTML file:

```bash
oapie parse ./saved-page.html --shape=raw --output=pretty
```

If you need crawl mode from a local file, provide a base URL so sidebar links can be resolved correctly:

```bash
oapie parse ./saved-page.html \
  --crawl \
  --base-url=https://docs.example.com/reference/root-page
```
