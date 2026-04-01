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

## Examples

```bash
oapie init
oapie parse ./saved-page.html
oapie parse https://docs.example.com/reference/jobs --output=json --shape=openapi
oapie parse https://docs.example.com/reference/jobs --crawl --browser=puppeteer
```

## Exit Behavior

Successful parses write an output file and log its relative path. Failed parses set a non-zero exit code.
