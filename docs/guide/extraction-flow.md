# Extraction Flow

## 1. Load The Source

OAPIE accepts either:

- a remote `http` or `https` URL
- a local HTML file path

Remote sources are loaded through one of the supported engines:

- `axios`
- `happy-dom`
- `jsdom`
- `puppeteer`

## 2. Extract Operation Data

The extractor reads the loaded HTML and looks for request and response details commonly found on ReadMe-style API docs pages, including:

- HTTP method and URL
- parameter forms
- request examples
- response examples
- sidebar links for crawl mode

For sites that hydrate client-side, the Puppeteer path waits for extractable content and preserves SSR payloads when the rendered DOM omits `script#ssr-props`.

## 3. Crawl Linked Pages

When `--crawl` is enabled, OAPIE:

- resolves sidebar links from the root page
- reuses a shared browser session when appropriate
- fetches each discovered page
- extracts operations and attaches the source URL for each page

## 4. Normalize The Result

Two output shapes are available:

- `raw`: the direct extracted payload
- `openapi`: an OpenAPI-like document built from the extracted operations

## 5. Write Output

Output is always written to the local `output/` directory. The file name is derived from the source and selected output shape.
