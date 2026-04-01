import type { IOptionalBrowserSettings } from 'happy-dom'

export type BrowserName = 'axios' | 'happy-dom' | 'jsdom' | 'puppeteer'

export interface UserConfig {
    outputFormat: 'pretty' | 'json' | 'js'
    outputShape: 'raw' | 'openapi'
    requestTimeout: number
    maxRedirects: number
    userAgent: string
    retryCount: number
    retryDelay: number
    happyDom: IOptionalBrowserSettings
    browser: BrowserName
    puppeteer?: {
        headless?: boolean
        args?: string[]
    }
}