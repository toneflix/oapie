import { afterAll, describe, expect, it } from 'vitest'

import { buildOutputFilePath } from '../src/generator/OutputGenerator'
import { createServer } from 'node:http'
import { execFile } from 'node:child_process'
import { mergeSsrPropsIntoRenderedHtml } from '../src/Manager'
import path from 'node:path'
import { promisify } from 'node:util'
import { readFile } from 'node:fs/promises'
import { rm } from 'node:fs/promises'

const execFileAsync = promisify(execFile)

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

const runParseAndReadText = async (
    workspaceRoot: string,
    args: string[],
    source: string,
    shape: 'raw' | 'openapi',
    output: 'js' | 'pretty' | 'ts'
) => {
    const outputFilePath = buildOutputFilePath(workspaceRoot, source, shape, output)

    await rm(outputFilePath, { force: true })
    await execFileAsync(process.execPath, [
        '--import',
        'tsx',
        'src/cli.ts',
        ...args,
    ], {
        cwd: workspaceRoot,
    })

    return readFile(outputFilePath, 'utf8')
}

describe('parse command', () => {
    afterAll(async () => {
        const workspaceRoot = path.resolve(import.meta.dirname, '..')
        const outputDir = path.join(workspaceRoot, 'output')

        await rm(outputDir, { recursive: true, force: true })
    })

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
    }, 30000)

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
    }, 30000)

    it('supports overriding the CLI timeout for slow remote responses', async () => {
        const workspaceRoot = path.resolve(import.meta.dirname, '..')
        const source = 'http://127.0.0.1:0/reference/slow-customers'
        const fixtureHtml = await readFile(new URL('./fixtures/readme-ssr-props-parameters-example.html', import.meta.url), 'utf8')
        const server = createServer((request, response) => {
            if (request.url !== '/reference/slow-customers') {
                response.writeHead(404)
                response.end('Not found')

                return
            }

            setTimeout(() => {
                response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
                response.end(fixtureHtml)
            }, 50)
        })

        await new Promise<void>((resolve) => {
            server.listen(0, '127.0.0.1', () => resolve())
        })

        const address = server.address()

        if (!address || typeof address === 'string') {
            await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
            throw new Error('Failed to determine slow test server address')
        }

        const slowUrl = source.replace(':0', `:${address.port}`)

        try {
            const document = await runParseAndReadJson(workspaceRoot, [
                'parse',
                slowUrl,
                '--shape=openapi',
                '--output=json',
                '--browser=axios',
                '--timeout=500',
            ], slowUrl, 'openapi')

            expect(document.paths['/v1/customers']?.get?.parameters).toHaveLength(2)
        } finally {
            await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
        }
    }, 30000)

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
    }, 30000)

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
    }, 30000)

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
    }, 30000)

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

    it('emits semantic TypeScript models for SDK generation', async () => {
        const workspaceRoot = path.resolve(import.meta.dirname, '..')
        const source = 'tests/fixtures/fw-example.html'
        const content = await runParseAndReadText(workspaceRoot, [
            'parse',
            source,
            '--shape=openapi',
            '--output=ts',
        ], source, 'openapi', 'ts')

        expect(content).toContain('export interface Customer')
        expect(content).toContain('export interface CustomerInput')
        expect(content).toContain('export interface CustomerQuery')
        expect(content).toContain('export interface CustomerHeader')
        expect(content).toContain('export interface CustomerParams')
        expect(content).toContain('export interface Address')
        expect(content).toContain('\'X-Trace-Id\'?: string')
        expect(content).toContain('export interface Paths')
        expect(content).toContain('paths: Paths')
        expect(content).toContain('extends OpenApiOperationDefinition<')
        expect(content).toContain('ResponseExample')
        expect(content).not.toContain('export interface AddressAddress')
        expect(content).toContain('export interface ExtractedApiDocument')
        expect(content).not.toContain('extends CustomerQuery {}')
        expect(content).not.toContain('export interface Data2')
        expect(content).toContain('export const extractedApiDocument: ExtractedApiDocument =')
        expect(content).toContain('export default extractedApiDocument')
    }, 20000)
})