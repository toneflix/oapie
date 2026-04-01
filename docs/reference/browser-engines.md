# Browser Engines

## `axios`

Use a simple HTTP fetch and return the raw HTML response body. This is the lightest option and works well when the docs page already contains the content server-side.

## `happy-dom`

Load the HTML into Happy DOM and wait for the virtual browser to complete. This is useful for some pages that need limited script evaluation without a full browser.

## `jsdom`

Run the page inside JSDOM with scripts enabled. This is helpful when you need DOM APIs and script execution but do not want to launch Chromium.

## `puppeteer`

Launch a real headless browser, wait for extractable content, and read the rendered page HTML. This is the default because it handles the broadest range of client-rendered documentation pages.

For crawl mode, OAPIE reuses a shared browser session to avoid paying startup cost on every page.

## Choosing An Engine

- Use `axios` first if the site is fully server-rendered.
- Use `happy-dom` or `jsdom` when the page needs some client-side evaluation.
- Use `puppeteer` when hydration timing matters or the page hides useful content until the browser executes scripts.
