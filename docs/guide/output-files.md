# Output Files

## Output Directory

`oapie parse` writes generated files into:

```text
./output
```

The directory is created automatically if it does not exist.

## Formats

### `pretty`

Human-readable text output.

File extension:

```text
.txt
```

### `json`

JSON output with no extra formatting.

File extension:

```text
.json
```

### `js`

An ES module exporting the payload as the default export.

File extension:

```text
.js
```

JavaScript output is formatted with Prettier before it is written.

## File Naming

Remote URLs and local paths are sanitized into safe file names. When `--shape=openapi` is used, OAPIE inserts `.openapi` before the extension.

Examples:

- `https://maplerad.dev/reference/create-a-customer` + `--shape=openapi --output=json`
- `output/https_maplerad_dev_reference_create-a-customer.openapi.json`
- `./saved-page.html` + `--shape=raw --output=js`
- `output/saved-page_html.js`

## SDK Package Output

`oapie generate sdk` emits a package scaffold into the selected output directory.

Example:

```bash
oapie generate sdk https://maplerad.dev/reference/create-a-customer \
	--dir=./output/sdk \
	--crawl \
	--output-mode=both
```

Typical generated files include:

- `README.md`
- `package.json`
- `src/Schema.ts`
- `src/index.ts`
- `src/Core.ts` in class-enabled modes
- `src/ApiBinder.ts` in class-enabled modes
- `src/BaseApi.ts` in class-enabled modes
- `src/Apis/*` in class-enabled modes
- `tests/exports.test.ts`

The output mode determines whether the package contains runtime-only entrypoints, class-based entrypoints, or both.

See [SDK Generation](/guide/sdk-generation) for the full package layout and mode behavior.
