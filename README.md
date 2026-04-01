# OPENAPIE

[![NPM Downloads](https://img.shields.io/npm/dt/openapie.svg)](https://www.npmjs.com/package/openapie)
[![npm version](https://img.shields.io/npm/v/openapie.svg)](https://www.npmjs.com/package/openapie)
[![License](https://img.shields.io/npm/l/openapie.svg)](https://github.com/toneflix/openapie/blob/main/LICENSE)
[![Deploy Docs](https://github.com/toneflix/openapie/actions/workflows/docs.yml/badge.svg)](https://github.com/toneflix/openapie/actions/workflows/docs.yml)
[![Run Tests](https://github.com/toneflix/openapie/actions/workflows/test.yml/badge.svg)](https://github.com/toneflix/openapie/actions/workflows/test.yml)
[![Publish Package](https://github.com/toneflix/openapie/actions/workflows/publish.yml/badge.svg)](https://github.com/toneflix/openapie/actions/workflows/publish.yml)

OAPIE is a CLI and TypeScript library for extracting API operation data from documentation sites and converting it into raw extracted payloads or OpenAPI-like documents.

It currently focuses on ReadMe-powered API docs and saved HTML pages, with room to expand to additional documentation platforms.

- npm: https://www.npmjs.com/package/openapie
- docs: https://toneflix.github.io/openapie
- repository: https://github.com/toneflix/oapi

## Features

- parse remote documentation URLs or saved local HTML files
- extract methods, URLs, parameters, request examples, and response examples
- crawl linked sidebar pages for multi-endpoint references
- transform extracted operations into an OpenAPI-like document
- use the tool as a CLI or as a programmatic package
- choose among `axios`, `happy-dom`, `jsdom`, and `puppeteer` loaders

## Installation

### CLI

Install globally if you want the `openapie` command available everywhere:

```bash
pnpm add -g openapie
```

```bash
npm i -g openapie
```

```bash
yarn global add openapie
```

### Library

Install locally if you want to use OPENAPIE from your own scripts or tooling:

```bash
pnpm add openapie
```

```bash
npm i openapie
```

```bash
yarn add openapie
```

## CLI Quick Start

Extract a single page into an OpenAPI-like JSON document:

```bash
oapie parse https://maplerad.dev/reference/create-a-customer \
  --shape=openapi \
  --output=json
```

Crawl a sidebar section and write a JavaScript module:

```bash
oapie parse https://maplerad.dev/reference/create-a-customer \
  --shape=openapi \
  --output=js \
  --crawl
```

Generate a config file:

```bash
oapie init
```

## Programmatic Usage

Extract a single operation:

```ts
import { Application, extractReadmeOperationFromHtml } from 'openapie';

const app = new Application({
  browser: 'puppeteer',
});

const html = await app.loadHtmlSource(
  'https://maplerad.dev/reference/create-a-customer',
  true,
);

const operation = extractReadmeOperationFromHtml(html);

console.log(operation.method);
console.log(operation.url);
```

Convert extracted data into an OpenAPI-like document:

```ts
import {
  Application,
  createOpenApiDocumentFromReadmeOperations,
  extractReadmeOperationFromHtml,
} from 'openapie';

const app = new Application({ browser: 'puppeteer' });
const html = await app.loadHtmlSource(
  'https://maplerad.dev/reference/create-a-customer',
  true,
);
const operation = extractReadmeOperationFromHtml(html);

const document = createOpenApiDocumentFromReadmeOperations(
  [operation],
  'Extracted API',
  '0.0.0',
);

console.log(document.paths);
```

## Configuration

OPENAPIE looks for one of these files in the current working directory:

- `openapie.config.ts`
- `openapie.config.js`
- `openapie.config.cjs`

Example:

```ts
import { defineConfig } from 'openapie';

export default defineConfig({
  outputFormat: 'json',
  outputShape: 'openapi',
  browser: 'puppeteer',
  requestTimeout: 50000,
});
```

## Supported Loaders

- `axios`
- `happy-dom`
- `jsdom`
- `puppeteer`

The default browser is `puppeteer`.

## Output

CLI parse results are written to the local `output/` directory.

Available output shapes:

- `raw`
- `openapi`

Available output formats:

- `pretty`
- `json`
- `js`

## Documentation

Full documentation is available at https://oapi-extractor.toneflix.net.

Useful sections:

- Getting started: https://toneflix.github.io/openapie/guide/getting-started
- CLI reference: https://toneflix.github.io/openapie/reference/cli
- Programmatic usage: https://toneflix.github.io/openapie/reference/programmatic-usage
- Configuration: https://toneflix.github.io/openapie/reference/configuration
- Roadmap: https://toneflix.github.io/openapie/project/roadmap

## Roadmap Highlights

Current future-looking areas include:

- improved ReadMe extraction coverage
- stronger schema and example inference
- broader programmatic API helpers
- support for Apidog documentation pages
- support for Postman documentation pages

See the full roadmap at https://toneflix.github.io/openapie/project/roadmap.

## Development

Install dependencies:

```bash
pnpm install
```

Common commands:

```bash
pnpm test
pnpm build
pnpm docs:dev
pnpm docs:build
```

## License

MIT
