import axios from 'axios'
import { extractReadmeOperationFromHtml } from './ReadmeExtractor'
import path from 'node:path'
import { readFile } from 'node:fs/promises'
import { resolveReadmeSidebarUrls } from './ReadmeCrawler'

export class Application {
    constructor() {
    }

    async crawlReadmeOperations (
        source: string,
        rootOperation: ReturnType<typeof extractReadmeOperationFromHtml>,
        baseUrl: string | null
    ): Promise<{
        rootSource: string,
        discoveredUrls: string[],
        operations: Array<ReturnType<InstanceType<typeof Application>['attachSourceUrl']>>
    }> {
        const crawlBaseUrl = this.resolveCrawlBaseUrl(source, baseUrl)

        if (!crawlBaseUrl) {
            throw new Error('Crawl mode requires a remote source URL or --base-url when using a local file')
        }

        const discoveredUrls = resolveReadmeSidebarUrls(rootOperation, crawlBaseUrl)
        const rootSourceUrl = new URL(crawlBaseUrl).toString()
        const rootEntry = this.attachSourceUrl(rootSourceUrl, rootOperation)
        const urlsToFetch = discoveredUrls.filter((url) => url !== rootSourceUrl)
        const crawledOperations = await Promise.all(urlsToFetch.map(async (url) => {
            const html = await this.loadHtmlSource(url)

            return this.attachSourceUrl(url, extractReadmeOperationFromHtml(html))
        }))

        return {
            rootSource: rootSourceUrl,
            discoveredUrls,
            operations: [rootEntry, ...crawledOperations],
        }
    }

    attachSourceUrl (
        sourceUrl: string,
        operation: ReturnType<typeof extractReadmeOperationFromHtml>
    ) {
        return {
            sourceUrl,
            ...operation,
        }
    }

    resolveCrawlBaseUrl (source: string, baseUrl: string | null): string | null {
        if (baseUrl) {
            return new URL(baseUrl).toString()
        }

        if (/^https?:\/\//i.test(source)) {
            return source
        }

        return null
    }

    async loadHtmlSource (source: string): Promise<string> {
        if (!source) {
            throw new Error('A source path or URL is required')
        }

        if (/^https?:\/\//i.test(source)) {
            const response = await axios.get<string>(source, {
                responseType: 'text',
            })

            return response.data
        }

        const filePath = path.resolve(process.cwd(), source)

        return readFile(filePath, 'utf8')
    }
}