import { Application } from 'src/Application'
import { Command } from '@h3ravel/musket'
import { createOpenApiDocumentFromReadmeOperations } from '../OpenApiTransform'
import { extractReadmeOperationFromHtml } from '../ReadmeExtractor'

export class ParseCommand extends Command<Application> {
    protected signature = `parse
        {source : Local HTML file path or remote URL}
        {--O|output=pretty : Output format [pretty,json]}
        {--S|shape=raw : Result shape [raw,openapi]}
        {--c|crawl : Crawl sidebar links and parse every discovered operation}
        {--b|base-url? : Base URL used to resolve sidebar links when crawling from a local file}
    `

    protected description = 'Parse a saved ReadMe page or remote documentation URL and print normalized output'

    public async handle (): Promise<void> {
        const source = String(this.argument('source', '')).trim()
        const output = String(this.option('output', 'pretty')).trim().toLowerCase()
        const shape = String(this.option('shape', 'raw')).trim().toLowerCase()
        const crawl = parseBooleanOption(this.option('crawl', false))
        const baseUrl = String(this.option('baseUrl', '')).trim() || null

        try {
            const html = await this.app.loadHtmlSource(source)
            const operation = extractReadmeOperationFromHtml(html)
            const payload = crawl
                ? await this.app.crawlReadmeOperations(source, operation, baseUrl)
                : operation
            const normalizedPayload = shape === 'openapi'
                ? buildOpenApiPayload(payload)
                : payload
            const serialized = JSON.stringify(normalizedPayload, null, output === 'json' ? 0 : 2)

            this.line(serialized)
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'

            this.error(`Failed to parse source: ${message}`)
            process.exit(1)
        }
    }
}

const buildOpenApiPayload = (payload: Awaited<ReturnType<Application['crawlReadmeOperations']>> | ReturnType<typeof extractReadmeOperationFromHtml>) => {
    if ('operations' in payload) {
        return createOpenApiDocumentFromReadmeOperations(payload.operations, 'Extracted API', '0.0.0')
    }

    return createOpenApiDocumentFromReadmeOperations([payload], 'Extracted API', '0.0.0')
}

const parseBooleanOption = (value: unknown): boolean => {
    if (typeof value === 'boolean') {
        return value
    }

    if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase()

        if (normalized === 'false' || normalized === '0' || normalized === '') {
            return false
        }

        if (normalized === 'true' || normalized === '1') {
            return true
        }
    }

    return Boolean(value)
}