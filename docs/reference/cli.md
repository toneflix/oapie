# CLI Reference

## Commands

### `oapie init`

Create a default config file in the current directory.

Options:

- `--force`: overwrite an existing config file

### `oapie parse <source>`

Parse a local HTML file or remote documentation URL.

Options:

- `--output`, `-O`: `pretty`, `json`, or `js`
- `--shape`, `-S`: `raw` or `openapi`
- `--browser`, `-B`: `axios`, `happy-dom`, `jsdom`, or `puppeteer`
- `--crawl`, `-c`: crawl sidebar links and parse discovered operations
- `--base-url`, `-b`: base URL for crawling when the source is a local file

### `oapie generate sdk <source>`

Generate a TypeScript SDK package from either a documentation source or a parsed TypeScript OpenAPI artifact.

Options:

- `--dir`, `-d`: output directory for the generated SDK package
- `--name`, `-n`: package name for the generated SDK
- `--output-mode`, `-O`: `runtime`, `classes`, or `both`
- `--signature-style`, `-S`: `grouped` or `flat`
- `--namespace-strategy`, `-N`: `smart` or `scoped`
- `--method-strategy`, `-M`: `smart` or `operation-id`
- `--root-type-name`, `-r`: root type name for the generated `Schema.ts` module
- `--browser`, `-B`: `axios`, `happy-dom`, `jsdom`, or `puppeteer`
- `--timeout`, `-t`: request or browser timeout in milliseconds
- `--crawl`, `-c`: crawl sidebar links and include discovered operations
- `--base-url`, `-b`: base URL when crawling from a local HTML file

## Examples

```bash
oapie init
oapie parse ./saved-page.html
oapie parse https://docs.example.com/reference/jobs --output=json --shape=openapi
oapie parse https://docs.example.com/reference/jobs --crawl --browser=puppeteer
oapie generate sdk https://docs.example.com/reference/jobs --dir=./output/sdk --crawl --output-mode=both
oapie generate sdk ./output/docs_example_reference_jobs.openapi.ts --dir=./output/generated-sdk --output-mode=runtime
```

## Exit Behavior

Successful commands write their output artifact and log its relative path. Failed commands set a non-zero exit code.
