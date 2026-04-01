# Quick Reference

## Commands

```bash
oapie init
```

```bash
oapie parse <source>
```

## Common Parse Flags

- `--output=pretty|json|js`
- `--shape=raw|openapi`
- `--browser=axios|happy-dom|jsdom|puppeteer`
- `--crawl`
- `--base-url=<url>`

## Config File Names

- `oapiex.config.ts`
- `oapiex.config.js`
- `oapiex.config.cjs`

## Output Location

All parse results are written under:

```text
./output
```

## Defaults

- Browser: `puppeteer`
- Request timeout: `50000`

## Links

- [Getting Started](/guide/getting-started)
- [CLI Reference](/reference/cli)
- [Configuration](/reference/configuration)
- [Development](/project/development)
