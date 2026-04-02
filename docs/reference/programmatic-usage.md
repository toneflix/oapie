# Programmatic Usage

## Install

Install OAPIEX as a project dependency:

::: code-group

```bash [pnpm]
pnpm add oapiex
```

```bash [npm]
npm i oapiex
```

```bash [yarn]
yarn add  oapiex
```

:::

You can then import the programmatic API directly from `oapiex`.

## Main Building Blocks

The core programmatic pieces are:

- `Application`: load local or remote HTML and crawl linked pages
- `extractReadmeOperationFromHtml`: extract a normalized operation from HTML
- `transformer.createDocument`: convert extracted operations into an OpenAPI-like document
- `defineConfig`: merge config with defaults
- `startBrowserSession` and `endBrowserSession`: control shared browser sessions for advanced workflows

## Extract A Single Operation

```ts
import { Application, extractReadmeOperationFromHtml } from 'oapiex';

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
console.log(operation.requestParams);
console.log(operation.responseSchemas);
```

`loadHtmlSource()` accepts either a remote URL or a local file path.

## Transform Extracted Data Into OpenAPI

```ts
import {
  Application,
  transformer,
  extractReadmeOperationFromHtml,
} from 'oapiex';

const app = new Application({
  browser: 'puppeteer',
});

const html = await app.loadHtmlSource(
  'https://maplerad.dev/reference/create-a-customer',
  true,
);

const operation = extractReadmeOperationFromHtml(html);

const document = transformer.createDocument(
  [operation],
  'Extracted API',
  '0.0.0',
);

console.log(JSON.stringify(document, null, 2));
```

## Crawl A ReadMe Sidebar Section

```ts
import {
  Application,
  transformer,
  extractReadmeOperationFromHtml,
} from 'oapiex';

const source = 'https://maplerad.dev/reference/create-a-customer';

const app = new Application({
  browser: 'puppeteer',
});

const html = await app.loadHtmlSource(source, true);
const rootOperation = extractReadmeOperationFromHtml(html);

const crawled = await app.crawlReadmeOperations(source, rootOperation, null);

const document = transformer.createDocument(
  crawled.operations,
  'Extracted API',
  '0.0.0',
);

console.log(crawled.discoveredUrls);
console.log(document.paths);
```

When crawl mode is used from a local file, pass a base URL instead of `null` so sidebar links can be resolved.

## Work With Saved HTML Directly

If you already have the page HTML, you can skip `Application` and call the extractor directly.

```ts
import { readFile } from 'node:fs/promises';
import { extractReadmeOperationFromHtml } from 'oapiex';

const html = await readFile('./saved-page.html', 'utf8');
const operation = extractReadmeOperationFromHtml(html);

console.log(operation);
```

## Configure Defaults In Code

```ts
import { defineConfig } from 'oapiex';

const config = defineConfig({
  browser: 'axios',
  outputShape: 'openapi',
  requestTimeout: 15000,
});

console.log(config);
```

`defineConfig()` merges your overrides with the internal defaults.

## Reuse A Browser Session Manually

For advanced batching, you can manage the browser session yourself.

```ts
import {
  browser,
  defineConfig,
  endBrowserSession,
  startBrowserSession,
} from 'oapiex';

const config = defineConfig({ browser: 'puppeteer' });

await startBrowserSession(config);

try {
  const htmlA = await browser(
    'https://docs.example.com/reference/a',
    config,
    true,
  );
  const htmlB = await browser('https://docs.example.com/reference/b', config);

  console.log(htmlA.length, htmlB.length);
} finally {
  await endBrowserSession();
}
```

This matters most when you are loading many pages and want to avoid launching Chromium for every request.

## Notes

- The default browser is `puppeteer`.
- `Application.crawlReadmeOperations()` automatically opens and closes a shared browser session when needed.
- The OpenAPI transformer intentionally skips clearly invalid placeholder operations.
