import { SdkMethodNamingStrategy, SdkNamespaceNamingStrategy } from '../generator/types'
import { endBrowserSession, isSupportedBrowser, startBrowserSession } from '../Manager'

import { Application } from 'src/Application'
import { Command } from '@h3ravel/musket'
import { Logger } from '@h3ravel/shared'
import type { OpenApiDocumentLike } from '../types/open-api'
import { OutputGenerator } from '../generator/OutputGenerator'
import { SdkPackageGenerator } from '../generator/SdkPackageGenerator'
import { TypeScriptGenerator } from '../generator/TypeScriptGenerator'
import { extractReadmeOperationFromHtml } from '../ReadmeExtractor'
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import prettier from 'prettier'
import { transformer } from '../OpenApiTransform'

export class GenerateCommand extends Command<Application> {
    protected signature = `generate
        {artifact : Artifact to generate [sdk]}
        {source? : Documentation URL/local source or parsed TypeScript output file}
        {--d|dir? : Output directory for the generated artifact}
        {--n|name? : Package name for generated SDK packages}
        {--O|output-mode=both : SDK output mode [runtime,classes,both]}
        {--S|signature-style=grouped : SDK method signature style [flat,grouped]}
        {--N|namespace-strategy=smart : Namespace naming strategy [smart,scoped]}
        {--M|method-strategy=smart : Method naming strategy [smart,operation-id]}
        {--r|root-type-name=ExtractedApiDocument : Root type name for the generated Schema.ts module}
        {--B|browser? : Remote loader [axios,happy-dom,jsdom,puppeteer]}
        {--t|timeout? : Request/browser timeout in milliseconds}
        {--c|crawl : Crawl sidebar links and parse every discovered operation}
        {--b|base-url? : Base URL used to resolve sidebar links when crawling from a local file}
    `

    protected description = 'Generate artifacts such as SDK packages from documentation sources or parsed TypeScript outputs'

    public async handle (): Promise<void> {
        const conf = this.app.getConfig()
        const artifact = String(this.argument('artifact', '')).trim().toLowerCase()
        const source = String(this.argument('source', '')).trim()
        const browser = String(this.option('browser', conf.browser)).trim().toLowerCase()
        const timeoutOption = String(this.option('timeout', '')).trim()
        const crawl = this.option('crawl')
        const baseUrl = String(this.option('baseUrl', '')).trim() || null
        const spinner = this.spinner('Generating artifact...').start()
        let startedBrowserSession = false

        try {
            const start = Date.now()

            if (!isSupportedBrowser(browser)) {
                throw new Error(`Unsupported browser: ${browser}`)
            }

            if (artifact !== 'sdk') {
                throw new Error(`Unsupported artifact: ${artifact}`)
            }

            if (!source) {
                throw new Error('The sdk artifact requires a source argument')
            }

            if (!this.isTypeScriptArtifactSource(source) && !isSupportedBrowser(browser)) {
                throw new Error(`Unsupported browser: ${browser}`)
            }

            const requestTimeout = this.resolveTimeoutOverride(timeoutOption, conf.requestTimeout)
            const namespaceStrategy = this.parseNamespaceStrategy(this.option('namespaceStrategy', 'smart'))
            const methodStrategy = this.parseMethodStrategy(this.option('methodStrategy', 'smart'))
            const outputMode = this.parseOutputMode(this.option('outputMode', 'both'))
            const signatureStyle = this.parseSignatureStyle(this.option('signatureStyle', 'grouped'))
            const rootTypeName = String(this.option('rootTypeName', 'ExtractedApiDocument')).trim() || 'ExtractedApiDocument'

            this.app.configure({ browser, requestTimeout })

            if (!this.isTypeScriptArtifactSource(source) && crawl) {
                await startBrowserSession(this.app.getConfig())
                startedBrowserSession = true
            }

            const sdkSource = await this.resolveSdkSource({
                source,
                crawl,
                baseUrl,
                rootTypeName,
                namespaceStrategy,
                methodStrategy,
            })

            const packageDir = this.resolveOutputDirectory(source)
            const packageName = this.resolvePackageName(packageDir)
            const files = new SdkPackageGenerator().generate(sdkSource.document, {
                outputMode,
                signatureStyle,
                rootTypeName,
                namespaceStrategy,
                methodStrategy,
                schemaModule: sdkSource.schemaModule,
                packageName: String(this.option('name', '')).trim() || packageName,
            })

            await this.writePackageFiles(packageDir, files)

            const duration = Date.now() - start

            Logger.twoColumnDetail(
                Logger.log([['Generated', 'green'], [`${duration / 1000}s`, 'gray']], ' ', false),
                packageDir.replace(process.cwd(), '.')
            )

            spinner.succeed('Artifact generation completed')
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'

            spinner.fail(`Failed to generate artifact: ${message}`)
            process.exitCode = 1
        } finally {
            if (startedBrowserSession) {
                await endBrowserSession()
            }
        }
    }

    private async resolveSdkSource (options: {
        source: string
        crawl: boolean
        baseUrl: string | null
        rootTypeName: string
        namespaceStrategy: SdkNamespaceNamingStrategy
        methodStrategy: SdkMethodNamingStrategy
    }): Promise<{ document: OpenApiDocumentLike, schemaModule: string }> {
        if (this.isTypeScriptArtifactSource(options.source)) {
            return this.loadSdkSourceFromTypeScriptArtifact(options.source)
        }

        const html = await this.app.loadHtmlSource(options.source, true)
        const operation = extractReadmeOperationFromHtml(html)
        const payload = options.crawl
            ? await this.app.crawlReadmeOperations(options.source, operation, options.baseUrl)
            : operation
        const document = this.buildOpenApiPayload(payload) as never
        const schemaModule = await prettier.format(
            TypeScriptGenerator.generateModule(document, options.rootTypeName, {
                namespaceStrategy: options.namespaceStrategy,
                methodStrategy: options.methodStrategy,
            }),
            {
                parser: 'typescript',
                semi: false,
                singleQuote: true,
            }
        )

        return {
            document,
            schemaModule,
        }
    }

    private async loadSdkSourceFromTypeScriptArtifact (
        source: string
    ): Promise<{ document: OpenApiDocumentLike, schemaModule: string }> {
        const filePath = path.resolve(process.cwd(), source)
        const schemaModule = await fs.readFile(filePath, 'utf8')
        const importedModule = await import(`${pathToFileURL(filePath).href}?t=${Date.now()}`)
        const documentCandidate = importedModule.default
            ?? Object.values(importedModule).find((value) => this.isOpenApiDocumentLike(value))

        if (!this.isOpenApiDocumentLike(documentCandidate)) {
            throw new Error('The provided TypeScript source does not export an OpenAPI document')
        }

        return {
            document: documentCandidate,
            schemaModule,
        }
    }

    private buildOpenApiPayload (
        payload: Awaited<
            ReturnType<Application['crawlReadmeOperations']>
        > | ReturnType<typeof extractReadmeOperationFromHtml>
    ): OpenApiDocumentLike {
        if ('operations' in payload) {
            return transformer.createDocument(payload.operations, 'Extracted API', '0.0.0')
        }

        return transformer.createDocument([payload], 'Extracted API', '0.0.0')
    }

    private resolveTimeoutOverride (value: string, fallback: number): number {
        if (!value) return fallback
        const parsed = Number(value)

        if (!Number.isFinite(parsed) || parsed <= 0) {
            throw new Error(`Invalid timeout override: ${value}`)
        }

        return parsed
    }

    private resolveOutputDirectory (source: string): string {
        const explicitDir = String(this.option('dir', '')).trim()

        if (explicitDir) {
            return path.resolve(process.cwd(), explicitDir)
        }

        return OutputGenerator.buildArtifactDirectory(process.cwd(), source, 'sdk')
    }

    private resolvePackageName (packageDir: string): string {
        const explicitName = String(this.option('name', '')).trim()

        if (explicitName) {
            return explicitName
        }

        return path.basename(packageDir).replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'generated-sdk'
    }

    private parseOutputMode (value: unknown): 'runtime' | 'classes' | 'both' {
        const normalized = String(value ?? 'both').trim().toLowerCase()

        if (normalized === 'runtime' || normalized === 'classes' || normalized === 'both') {
            return normalized
        }

        throw new Error(`Unsupported sdk output mode: ${normalized}`)
    }

    private parseSignatureStyle (value: unknown): 'flat' | 'grouped' {
        const normalized = String(value ?? 'grouped').trim().toLowerCase()

        if (normalized === 'flat' || normalized === 'grouped') {
            return normalized
        }

        throw new Error(`Unsupported signature style: ${normalized}`)
    }

    private parseNamespaceStrategy (value: unknown): SdkNamespaceNamingStrategy {
        const normalized = String(value ?? 'smart').trim().toLowerCase()

        if (normalized === 'smart' || normalized === 'scoped') {
            return normalized
        }

        throw new Error(`Unsupported namespace strategy: ${normalized}`)
    }

    private parseMethodStrategy (value: unknown): SdkMethodNamingStrategy {
        const normalized = String(value ?? 'smart').trim().toLowerCase()

        if (normalized === 'smart' || normalized === 'operation-id') {
            return normalized
        }

        throw new Error(`Unsupported method strategy: ${normalized}`)
    }

    private isTypeScriptArtifactSource (source: string): boolean {
        return /\.(?:[cm]?ts|[cm]?js)$/i.test(source)
    }

    private isOpenApiDocumentLike (value: unknown): value is OpenApiDocumentLike {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            return false
        }

        const candidate = value as Record<string, unknown>
        const info = candidate.info

        return candidate.openapi === '3.1.0'
            && typeof info === 'object'
            && info !== null
            && !Array.isArray(info)
            && typeof (info as Record<string, unknown>).title === 'string'
            && typeof (info as Record<string, unknown>).version === 'string'
            && typeof candidate.paths === 'object'
            && candidate.paths !== null
            && !Array.isArray(candidate.paths)
    }

    private async writePackageFiles (packageDir: string, files: Record<string, string>): Promise<void> {
        await Promise.all(Object.entries(files).map(async ([relativePath, content]) => {
            const filePath = path.join(packageDir, relativePath)

            await fs.mkdir(path.dirname(filePath), { recursive: true })
            await fs.writeFile(filePath, content, 'utf8')
        }))
    }
}