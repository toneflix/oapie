import { describe, expect, it } from 'vitest'

import { createServer } from 'node:http'
import { execFile } from 'node:child_process'
import { mergeSsrPropsIntoRenderedHtml } from '../src/Manager'
import path from 'node:path'
import { promisify } from 'node:util'
import { readFile } from 'node:fs/promises'
import { rm } from 'node:fs/promises'

const execFileAsync = promisify(execFile)

const buildOutputFilePath = (
    workspaceRoot: string,
    source: string,
    shape: 'raw' | 'openapi',
    output: 'json' | 'js' | 'pretty'
): string => {
    const ext = {
        pretty: 'txt',
        json: 'json',
        js: 'js',
    }[output]
    const safeSource = source.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '')
    const shapeSuffix = shape === 'openapi' ? '.openapi' : ''

    return path.join(workspaceRoot, 'output', `${safeSource || 'output'}${shapeSuffix}.${ext}`)
}

const runParseAndReadJson = async (
    workspaceRoot: string,
    args: string[],
    source: string,
    shape: 'raw' | 'openapi' = 'raw'
) => {
    const outputFilePath = buildOutputFilePath(workspaceRoot, source, shape, 'json')

    await rm(outputFilePath, { force: true })
    await execFileAsync(process.execPath, [
        '--import',
        'tsx',
        'src/cli.ts',
        ...args,
    ], {
        cwd: workspaceRoot,
    })

    return JSON.parse(await readFile(outputFilePath, 'utf8'))
}

describe('parse command', () => {
    it('emits OpenAPI-like JSON for a local fixture', async () => {
        const workspaceRoot = path.resolve(import.meta.dirname, '..')
        const source = 'tests/fixtures/fw-example.html'
        const document = await runParseAndReadJson(workspaceRoot, [
            'parse',
            source,
            '--shape=openapi',
            '--output=json',
        ], source, 'openapi')

        expect(document.openapi).toBe('3.1.0')
        expect(document.paths['/customers']?.get?.summary).toBe('List customers')
        expect(document.paths['/customers']?.get?.parameters).toEqual([
            {
                name: 'page',
                in: 'query',
                required: false,
                description: 'The page of the data to retrieve. The most recent data entry is on page 1.',
                schema: {
                    type: 'string',
                    description: 'The page of the data to retrieve. The most recent data entry is on page 1.',
                    default: '1',
                },
                example: '1',
            },
            {
                name: 'size',
                in: 'query',
                required: false,
                description: 'Length of data returned. Defaults to 10.',
                schema: {
                    type: 'string',
                    description: 'Length of data returned. Defaults to 10.',
                    default: '10',
                },
                example: '10',
            },
            {
                name: 'X-Trace-Id',
                in: 'header',
                required: false,
                description: 'A unique identifier to track this operation. It must be between 12 and 255 characters in length.',
                schema: {
                    type: 'string',
                    description: 'A unique identifier to track this operation. It must be between 12 and 255 characters in length.',
                },
            },
        ])
        expect(document.paths['/customers']?.get?.requestBody).toBeUndefined()
        expect(document.paths['/customers']?.get?.responses['200']?.description).toBe('OK')
    }, 15000)

    it('supports crawl mode against remote pages', async () => {
        const workspaceRoot = path.resolve(import.meta.dirname, '..')
        const rootHtml = await readFile(new URL('./fixtures/readme-crawl-root.html', import.meta.url), 'utf8')
        const siblingHtml = await readFile(new URL('./fixtures/readme-text-response-example.html', import.meta.url), 'utf8')
        const server = createServer((request, response) => {
            if (request.url === '/reference/get-customers') {
                response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
                response.end(rootHtml)

                return
            }

            if (request.url === '/reference/jobs') {
                response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
                response.end(siblingHtml)

                return
            }

            response.writeHead(404)
            response.end('Not found')
        })

        await new Promise<void>((resolve) => {
            server.listen(0, '127.0.0.1', () => resolve())
        })

        const address = server.address()

        if (!address || typeof address === 'string') {
            await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
            throw new Error('Failed to determine test server address')
        }

        const rootUrl = `http://127.0.0.1:${address.port}/reference/get-customers`

        try {
            const payload = await runParseAndReadJson(workspaceRoot, [
                'parse',
                rootUrl,
                '--crawl',
                '--shape=raw',
                '--output=json',
                '--browser=axios',
            ], rootUrl)

            expect(payload.rootSource).toBe(rootUrl)
            expect(payload.discoveredUrls).toEqual([`http://127.0.0.1:${address.port}/reference/jobs`])
            expect(payload.operations).toHaveLength(2)
            expect(payload.operations[0].sourceUrl).toBe(rootUrl)
            expect(payload.operations[1].sourceUrl).toBe(`http://127.0.0.1:${address.port}/reference/jobs`)
        } finally {
            await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
        }
    }, 15000)

    it('infers full nested request body depth from collapsed body examples', async () => {
        const workspaceRoot = path.resolve(import.meta.dirname, '..')
        const source = 'tests/fixtures/anchor-example.html'
        const document = await runParseAndReadJson(workspaceRoot, [
            'parse',
            source,
            '--shape=openapi',
            '--output=json',
        ], source, 'openapi')
        const schema = document.paths['/api/v1/customers']?.post?.requestBody?.content?.['application/json']?.schema

        expect(schema?.properties?.data?.properties?.type?.type).toBe('string')
        expect(schema?.properties?.data?.properties?.attributes?.properties?.fullName?.properties?.firstName?.type).toBe('string')
        expect(schema?.properties?.data?.properties?.attributes?.properties?.fullName?.properties?.lastName?.type).toBe('string')
        expect(schema?.properties?.data?.properties?.attributes?.properties?.address?.properties?.country?.type).toBe('string')
        expect(document.paths['/api/v1/customers']?.post?.responses['200']?.content?.['application/json']?.schema?.properties?.data?.properties?.type?.type).toBe('string')
        expect(document.paths['/api/v1/customers']?.post?.responses['200']?.content?.['text/plain']).toBeUndefined()
    }, 15000)

    it('uses embedded ssr props when parsing a sparse local fixture', async () => {
        const workspaceRoot = path.resolve(import.meta.dirname, '..')
        const source = 'tests/fixtures/readme-ssr-props-example.html'
        const document = await runParseAndReadJson(workspaceRoot, [
            'parse',
            source,
            '--shape=openapi',
            '--output=json',
        ], source, 'openapi')

        expect(document.paths['/v1/customers']?.post?.requestBody?.content?.['application/json']?.schema?.properties?.first_name?.type).toBe('string')
        expect(document.paths['/v1/customers']?.post?.requestBody?.content?.['application/json']?.schema?.properties?.country?.description).toBe('Customer country.')
        expect(document.paths['/v1/customers']?.post?.responses['200']?.content?.['application/json']?.schema?.properties?.status?.type).toBe('boolean')
        expect(document.paths['/v1/customers']?.post?.responses['400']?.content?.['application/json']?.schema?.type).toBe('object')
    }, 15000)

    it('uses embedded ssr props parameters when parsing a sparse local fixture', async () => {
        const workspaceRoot = path.resolve(import.meta.dirname, '..')
        const source = 'tests/fixtures/readme-ssr-props-parameters-example.html'
        const document = await runParseAndReadJson(workspaceRoot, [
            'parse',
            source,
            '--shape=openapi',
            '--output=json',
        ], source, 'openapi')

        expect(document.paths['/v1/customers']?.get?.parameters).toEqual([
            {
                name: 'page',
                in: 'query',
                required: false,
                description: 'Page number.',
                schema: {
                    type: 'integer',
                    description: 'Page number.',
                    default: '1',
                },
                example: '1',
            },
            {
                name: 'X-Trace-Id',
                in: 'header',
                required: false,
                description: 'Trace identifier.',
                schema: {
                    type: 'string',
                    description: 'Trace identifier.',
                },
            },
        ])
        expect(document.paths['/v1/customers']?.get?.requestBody).toBeUndefined()
        expect(document.paths['/v1/customers']?.get?.responses['200']?.content?.['application/json']?.schema?.properties?.data?.type).toBe('array')
    }, 15000)

    it('merges ssr props from raw html when rendered html drops the script', () => {
        const rawHtml = [
            '<html>',
            '<body>',
            '<article id="content"></article>',
            '<script id="ssr-props" type="application/json">{"document":{"api":{}}}</script>',
            '</body>',
            '</html>',
        ].join('')
        const renderedHtml = [
            '<html>',
            '<body>',
            '<article id="content"></article>',
            '</body>',
            '</html>',
        ].join('')

        const mergedHtml = mergeSsrPropsIntoRenderedHtml(renderedHtml, rawHtml)

        expect(mergedHtml).toContain('id="ssr-props"')
        expect(mergedHtml.indexOf('id="ssr-props"')).toBeGreaterThan(mergedHtml.indexOf('<article id="content">'))
    })
})