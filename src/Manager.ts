import type { BrowserName, UserConfig } from './types/app'
import { DOMWindow, JSDOM } from 'jsdom'
import type { Page, Browser as PuppeteerBrowser } from 'puppeteer'

import { Window } from 'happy-dom'
import axios from 'axios'

interface BrowserSession {
    browser: BrowserName
    closers: Array<() => Promise<void> | void>
    puppeteerBrowser?: PuppeteerBrowser
}

declare global {
    var __oapieBrowserSession: BrowserSession | undefined
}

const supportedBrowsers: BrowserName[] = ['axios', 'happy-dom', 'jsdom', 'puppeteer']

const defaultConfig: UserConfig = {
    outputFormat: 'pretty',
    outputShape: 'raw',
    requestTimeout: 50000,
    maxRedirects: 5,
    userAgent: 'Mozilla/5.0 (X11; Linux x64) AppleWebKit/537.36 (KHTML, like Gecko) OpenApiExtractor/1.0.0',
    retryCount: 3,
    retryDelay: 1000,
    browser: 'puppeteer',
    happyDom: {
        enableJavaScriptEvaluation: true,
        suppressInsecureJavaScriptEnvironmentWarning: true,
    },
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
}

let globalConfig: UserConfig = defaultConfig

const getBrowserSession = (): BrowserSession | undefined => globalThis.__oapieBrowserSession

const startBrowserSession = async (
    config: UserConfig = globalConfig
): Promise<BrowserSession> => {
    const activeSession = getBrowserSession()

    if (activeSession?.browser === config.browser) {
        return activeSession
    }

    if (activeSession) {
        await endBrowserSession()
    }

    const nextSession: BrowserSession = {
        browser: config.browser,
        closers: [],
    }

    if (config.browser === 'puppeteer') {
        const puppeteer = await import('puppeteer')

        nextSession.puppeteerBrowser = await puppeteer.launch({
            headless: config.puppeteer?.headless ?? true,
            args: config.puppeteer?.args ?? ['--no-sandbox', '--disable-setuid-sandbox']
        })
    }

    globalThis.__oapieBrowserSession = nextSession

    return nextSession
}

const endBrowserSession = async (): Promise<void> => {
    const activeSession = getBrowserSession()

    if (!activeSession) {
        return
    }

    globalThis.__oapieBrowserSession = undefined

    for (const closer of activeSession.closers.reverse()) {
        await closer()
    }

    if (activeSession.puppeteerBrowser) {
        await activeSession.puppeteerBrowser.close()
    }
}

const registerDeferredCloser = (
    browserName: BrowserName,
    closer: () => Promise<void> | void
): boolean => {
    const activeSession = getBrowserSession()

    if (!activeSession || activeSession.browser !== browserName) {
        return false
    }

    activeSession.closers.push(closer)

    return true
}

const defineConfig = (config: Partial<UserConfig>): UserConfig => {
    const userConfig = {
        ...defaultConfig,
        ...config,
        happyDom: {
            ...defaultConfig.happyDom,
            ...config.happyDom,
        },
    }

    globalConfig = userConfig

    return userConfig
}

const isSupportedBrowser = (value: string): value is BrowserName => {
    return supportedBrowsers.includes(value as BrowserName)
}

/**
 * Loads HTML content from a given source URL using the configured browser.
 * 
 * @param source    The URL of the source to load HTML from.
 * @param config    Optional user configuration to override global settings for this load operation.
 * @returns         A promise that resolves to the HTML content as a string.
 */
const browser = async (
    source: string,
    config: UserConfig = globalConfig,
    initial = false
): Promise<string> => {
    const { data } = config.browser !== 'puppeteer' ? await axios.get(source, {
        timeout: config.requestTimeout,
        maxRedirects: config.maxRedirects,
        headers: {
            'User-Agent': config.userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
    }) : { data: '' }

    if (config.browser === 'axios') {
        return data
    } else if (config.browser === 'happy-dom') {
        const window = new Window({
            url: source,
            innerWidth: 1024,
            innerHeight: 768,
            settings: config.happyDom
        })

        window.document.write(data)

        await window.happyDOM.waitUntilComplete()

        const html = window.document.documentElement.outerHTML

        if (!html) {
            await window.happyDOM.close()

            throw new Error(`Unable to extract HTML from remote source: ${source}`)
        }

        if (!registerDeferredCloser('happy-dom', () => window.happyDOM.close())) {
            await window.happyDOM.close()
        }

        return html

    } else if (config.browser === 'jsdom') {
        let window: DOMWindow | undefined

        try {
            ({ window } = new JSDOM(data, {
                url: source,
                contentType: 'text/html',
                runScripts: 'dangerously',
                includeNodeLocations: true,
            }))

            const html = window.document.documentElement.outerHTML
            if (!html) {
                throw new Error(`Unable to extract HTML from remote source: ${source}`)
            }

            const currentWindow = window

            if (!registerDeferredCloser('jsdom', () => currentWindow.close())) {
                window.close()
                window = undefined
            } else {
                window = undefined
            }

            return html
        } finally {
            if (window) window.close()
        }
    } else if (config.browser === 'puppeteer') {
        const activeSession = getBrowserSession()
        let browserInstance = activeSession?.browser === 'puppeteer'
            ? activeSession.puppeteerBrowser
            : undefined
        let shouldClose = false
        let page: Awaited<ReturnType<NonNullable<typeof browserInstance>['newPage']>> | undefined

        try {
            if (!browserInstance) {
                const puppeteer = await import('puppeteer')

                browserInstance = await puppeteer.launch({
                    headless: config.puppeteer?.headless ?? true,
                    args: config.puppeteer?.args ?? ['--no-sandbox', '--disable-setuid-sandbox']
                })
                shouldClose = true
            }

            page = await browserInstance.newPage()
            await page.setUserAgent({ userAgent: config.userAgent })
            await page.setRequestInterception(true)

            page.on('request', (e) => {
                const type = e.resourceType()
                if (['image', 'font', 'media', 'stylesheet'].includes(type))
                    return void e.abort()
                e.continue()
            })

            try {
                await page.goto(source, {
                    waitUntil: 'domcontentloaded',
                    timeout: config.requestTimeout
                })
            } catch (error) {
                if (!page || !(await hasExtractableReadmeContent(page))) {
                    throw error
                }
            }
            await waitForExtractableReadmeContent(page, config.requestTimeout, initial)
            await waitForOperationHydration(page, config.requestTimeout)

            let html = await page.content()
            if (!html) {
                throw new Error(`Unable to extract HTML from remote source: ${source}`)
            }

            if (!html.includes('id="ssr-props"')) {
                const { data: rawHtml } = await axios.get<string>(source, {
                    timeout: config.requestTimeout,
                    maxRedirects: config.maxRedirects,
                    headers: {
                        'User-Agent': config.userAgent,
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    },
                })

                html = mergeSsrPropsIntoRenderedHtml(html, rawHtml)
            }

            return html
        } finally {
            if (page && !page.isClosed()) {
                await page.close()
            }

            if (shouldClose && browserInstance) {
                await browserInstance.close()
            }
        }
    } else {
        throw new Error(`Unsupported browser specified in configuration: ${globalConfig.browser}`)
    }
}

const waitForExtractableReadmeContent = async (
    page: Page,
    timeout: number,
    initial = false
): Promise<void> => {
    try {
        if (initial) await page.waitForSelector('.hub-sidebar-content .rm-Sidebar-link')
        await page.waitForSelector(
            '[data-testid="http-method"], article#content, script#ssr-props',
            { timeout }
        )
    } catch {
        // Continue and let downstream extraction decide whether the page is usable.
    }
}

const waitForOperationHydration = async (page: Page, timeout: number): Promise<void> => {
    try {
        await page.waitForFunction(() => {
            const hasMethod = !!document.querySelector('[data-testid="http-method"]')
            const hasRequestForm = !!document.querySelector('form[name="Parameters"]')
            const hasReqPlayground = !!document.querySelector('.rm-PlaygroundRequest')
            const hasResPlayground = !!document.querySelector('.rm-PlaygroundResponse')
            const hasSsrProps = !!document.querySelector('script#ssr-props')

            if (!hasMethod) {
                return false
            }

            return hasRequestForm || hasReqPlayground || hasResPlayground || hasSsrProps
        }, { timeout })
    } catch {/** */ }

    try {
        await page.waitForSelector('.rm-PlaygroundRequest, .rm-PlaygroundResponse, form[name="Parameters"], script#ssr-props', {
            timeout: Math.min(timeout, 5000)
        })
    } catch {/** */ }

    try {
        await page.waitForNetworkIdle?.({ idleTime: 500, timeout: Math.min(timeout, 5000) })
    } catch {/** */ }

    try {
        // await (page as any).waitForTimeout?.(750)
    } catch {/** */ }
}

const hasExtractableReadmeContent = async (
    page: {
        $: (selector: string) => Promise<unknown>
    }
): Promise<boolean> => {
    return Boolean(
        await page.$('[data-testid="http-method"], article#content, script#ssr-props')
    )
}

const mergeSsrPropsIntoRenderedHtml = (renderedHtml: string, rawHtml: string): string => {
    if (renderedHtml.includes('id="ssr-props"')) {
        return renderedHtml
    }

    const ssrPropsScript = extractSsrPropsScript(rawHtml)

    if (!ssrPropsScript) {
        return renderedHtml
    }

    if (renderedHtml.includes('</body>')) {
        return renderedHtml.replace('</body>', `${ssrPropsScript}</body>`)
    }

    if (renderedHtml.includes('</html>')) {
        return renderedHtml.replace('</html>', `${ssrPropsScript}</html>`)
    }

    return `${renderedHtml}${ssrPropsScript}`
}

const extractSsrPropsScript = (html: string): string | null => {
    const match = html.match(/<script id="ssr-props"[^>]*>[\s\S]*?<\/script>/i)

    return match?.[0] ?? null
}

export {
    defineConfig,
    browser,
    globalConfig,
    defaultConfig,
    supportedBrowsers,
    startBrowserSession,
    endBrowserSession,
    getBrowserSession,
    isSupportedBrowser,
    mergeSsrPropsIntoRenderedHtml,
}