import { describe, expect, it } from 'vitest'

import { createServer } from 'node:http'
import { execFile } from 'node:child_process'
import path from 'node:path'
import { promisify } from 'node:util'
import { readFile } from 'node:fs/promises'

const execFileAsync = promisify(execFile)

describe('parse command', () => {
    it('emits OpenAPI-like JSON for a local fixture', async () => {
        const workspaceRoot = path.resolve(import.meta.dirname, '..')
        const { stdout } = await execFileAsync(process.execPath, [
            '--import',
            'tsx',
            'src/cli.ts',
            'parse',
            'tests/fixtures/fw-example.html',
            '--shape=openapi',
            '--output=json',
        ], {
            cwd: workspaceRoot,
        })
        const document = JSON.parse(stdout)

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
    })

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
            const { stdout } = await execFileAsync(process.execPath, [
                '--import',
                'tsx',
                'src/cli.ts',
                'parse',
                rootUrl,
                '--crawl',
                '--shape=raw',
                '--output=json',
            ], {
                cwd: workspaceRoot,
            })
            const payload = JSON.parse(stdout)

            expect(payload.rootSource).toBe(rootUrl)
            expect(payload.discoveredUrls).toEqual([`http://127.0.0.1:${address.port}/reference/jobs`])
            expect(payload.operations).toHaveLength(2)
            expect(payload.operations[0].sourceUrl).toBe(rootUrl)
            expect(payload.operations[1].sourceUrl).toBe(`http://127.0.0.1:${address.port}/reference/jobs`)
        } finally {
            await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
        }
    })
})