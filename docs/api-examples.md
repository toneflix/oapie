---
outline: deep
---

# Extraction Examples

## Extract A Single Remote Page

```bash
oapie parse https://maplerad.dev/reference/create-a-customer \
	--shape=openapi \
	--output=json
```

This writes a file like:

```text
output/https_maplerad_dev_reference_create-a-customer.openapi.json
```

## Crawl A Reference Section

```bash
oapie parse https://maplerad.dev/reference/create-a-customer \
	--shape=openapi \
	--output=js \
	--crawl
```

## Parse A Saved HTML File

```bash
oapie parse ./fixtures/readme-response-example.html \
	--shape=openapi \
	--output=json
```

If you want crawl mode from a local file, provide a base URL:

```bash
oapie parse ./saved-page.html \
	--crawl \
	--base-url=https://docs.example.com/reference/root-page \
	--shape=raw \
	--output=json
```

## Force A Loader

```bash
oapie parse https://docs.example.com/reference/jobs \
	--browser=axios \
	--shape=raw \
	--output=json
```

Supported loaders:

- `axios`
- `happy-dom`
- `jsdom`
- `puppeteer`

## Generate A JavaScript Module

```bash
oapie parse https://maplerad.dev/reference/create-a-customer \
	--shape=openapi \
	--output=js
```

JavaScript output is formatted with Prettier before being written.

## Generate A Runtime SDK Package

```bash
oapie generate sdk https://maplerad.dev/reference/create-a-customer \
	--dir=./output/sdk-runtime \
	--crawl \
	--output-mode=runtime
```

## Generate A Class-Based SDK Package

```bash
oapie generate sdk https://maplerad.dev/reference/create-a-customer \
	--dir=./output/sdk-classes \
	--crawl \
	--output-mode=classes
```

## Generate A Combined SDK Package

```bash
oapie generate sdk https://maplerad.dev/reference/create-a-customer \
	--dir=./output/sdk \
	--crawl \
	--output-mode=both \
	--signature-style=grouped
```

## Generate An SDK From A Parsed Artifact

```bash
oapie parse https://maplerad.dev/reference/create-a-customer \
	--shape=openapi \
	--output=js \
	--crawl

oapie generate sdk ./output/https_maplerad_dev_reference_create-a-customer.openapi.js \
	--dir=./output/generated-sdk \
	--output-mode=both
```
