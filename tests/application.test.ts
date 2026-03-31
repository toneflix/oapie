import { describe, expect, it, vi } from 'vitest'

import { Application } from '../src/Application'
import axios from 'axios'
import { createOpenApiDocumentFromReadmeOperations } from '../src/OpenApiTransform'
import { extractReadmeOperationFromHtml } from '../src/ReadmeExtractor'
import { readFile } from 'node:fs/promises'

vi.mock('axios', () => ({
    default: {
        get: vi.fn(),
    },
}))

describe('Application', () => {
    it('keeps the root operation in crawl mode and reuses it when building the OpenAPI-like document', async () => {
        const rootSource = 'https://docs.example.com/reference/get-customers'
        const siblingSource = 'https://docs.example.com/reference/jobs'
        const rootHtml = await readFile(new URL('./fixtures/readme-crawl-root.html', import.meta.url), 'utf8')
        const siblingHtml = await readFile(new URL('./fixtures/readme-text-response-example.html', import.meta.url), 'utf8')
        const mockedAxiosGet = vi.mocked(axios.get)

        mockedAxiosGet.mockImplementation(async (url) => {
            if (url === rootSource) {
                return { data: rootHtml }
            }

            if (url === siblingSource) {
                return { data: siblingHtml }
            }

            throw new Error(`Unexpected URL: ${String(url)}`)
        })

        const app = new Application()
        const loadedRootHtml = await app.loadHtmlSource(rootSource)
        const crawlResult = await app.crawlReadmeOperations(
            rootSource,
            extractReadmeOperationFromHtml(loadedRootHtml),
            null,
        )

        expect(crawlResult.rootSource).toBe(rootSource)
        expect(crawlResult.discoveredUrls).toEqual([siblingSource])
        expect(crawlResult.operations.map((operation) => operation.sourceUrl)).toEqual([
            rootSource,
            siblingSource,
        ])
        expect(mockedAxiosGet).toHaveBeenCalledTimes(2)
        expect(mockedAxiosGet.mock.calls.map(([url]) => url)).toEqual([
            rootSource,
            siblingSource,
        ])

        const document = createOpenApiDocumentFromReadmeOperations(crawlResult.operations, 'Crawled API', '1.0.0')

        expect(document.paths).toEqual({
            '/customers': {
                get: {
                    summary: undefined,
                    description: 'Fetch the customer collection.',
                    operationId: 'getCustomers',
                    requestBody: undefined,
                    responses: {},
                },
            },
            '/jobs': {
                post: {
                    summary: undefined,
                    description: 'Queue a background job.',
                    operationId: 'postJobs',
                    requestBody: undefined,
                    responses: {
                        '202': {
                            description: '202 - Accepted',
                            content: {
                                'text/plain': {
                                    schema: {
                                        type: 'string',
                                        example: 'Accepted for processing',
                                    },
                                    example: 'Accepted for processing',
                                },
                            },
                        },
                    },
                },
            },
        })
    })
})