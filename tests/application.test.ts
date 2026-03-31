import { describe, expect, it, vi } from 'vitest'

import { Application } from '../src/Application'
import { createOpenApiDocumentFromReadmeOperations } from '../src/OpenApiTransform'
import { extractReadmeOperationFromHtml } from '../src/ReadmeExtractor'
import { Browser, BrowserErrorCaptureEnum, Window } from 'happy-dom'
import { readFile } from 'node:fs/promises'

vi.mock('happy-dom', async () => {
    const actual = await vi.importActual<typeof import('happy-dom')>('happy-dom')

    class MockBrowserPage {
        public mainFrame: { document: Window['document'] }

        public constructor () {
            const window = new actual.Window()

            this.mainFrame = {
                document: window.document,
            }
        }

        public async goto (url: string): Promise<Response | null> {
            const html = mockedRemoteHtml.get(url)

            if (!html) {
                throw new Error(`Unexpected URL: ${url}`)
            }

            this.mainFrame.document.write(html)

            return null
        }

        public async waitUntilComplete (): Promise<void> {
        }
    }

    class MockBrowser {
        public static instances: MockBrowser[] = []
        public readonly settings: { errorCapture?: unknown }
        public readonly page = new MockBrowserPage()
        public closed = false

        public constructor (options?: { settings?: { errorCapture?: unknown } }) {
            this.settings = options?.settings ?? {}
            MockBrowser.instances.push(this)
        }

        public newPage (): MockBrowserPage {
            return this.page
        }

        public async close (): Promise<void> {
            this.closed = true
        }
    }

    return {
        ...actual,
        Browser: MockBrowser,
        BrowserErrorCaptureEnum: actual.BrowserErrorCaptureEnum,
    }
})

const mockedRemoteHtml = new Map<string, string>()

describe('Application', () => {
    it('keeps the root operation in crawl mode and reuses it when building the OpenAPI-like document', async () => {
        const rootSource = 'https://docs.example.com/reference/get-customers'
        const siblingSource = 'https://docs.example.com/reference/jobs'
        const rootHtml = await readFile(new URL('./fixtures/readme-crawl-root.html', import.meta.url), 'utf8')
        const siblingHtml = await readFile(new URL('./fixtures/readme-text-response-example.html', import.meta.url), 'utf8')
        mockedRemoteHtml.set(rootSource, rootHtml)
        mockedRemoteHtml.set(siblingSource, siblingHtml)

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
        const mockedBrowserClass = Browser as unknown as {
            instances: Array<{ settings: { errorCapture?: unknown }, closed: boolean }>
        }

        expect(mockedBrowserClass.instances).toHaveLength(2)
        expect(mockedBrowserClass.instances.map((instance) => instance.settings)).toEqual([
            { errorCapture: BrowserErrorCaptureEnum.processLevel },
            { errorCapture: BrowserErrorCaptureEnum.processLevel },
        ])
        expect(mockedBrowserClass.instances.every((instance) => instance.closed)).toBe(true)

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

        mockedRemoteHtml.clear()
        mockedBrowserClass.instances.length = 0
    })
})