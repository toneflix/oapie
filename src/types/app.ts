import { IOptionalBrowserSettings } from 'happy-dom'

export interface UserConfig {
    outputFormat: 'pretty' | 'json'
    outputShape: 'raw' | 'openapi'
    requestTimeout: number
    maxRedirects: number
    userAgent: string
    retryCount: number
    retryDelay: number
    happyDom: IOptionalBrowserSettings
}