import { BrowserErrorCaptureEnum } from 'happy-dom'
import { UserConfig } from './types/app'

export const defineConfig = (config: Partial<UserConfig>): UserConfig => {
    return {
        outputFormat: 'pretty',
        outputShape: 'raw',
        requestTimeout: 10000,
        maxRedirects: 5,
        userAgent: 'Mozilla/5.0 (X11; Linux x64) AppleWebKit/537.36 (KHTML, like Gecko) OpenApiExtractor/1.0.0',
        retryCount: 3,
        retryDelay: 1000,
        ...config,
        happyDom: {
            errorCapture: BrowserErrorCaptureEnum.processLevel,
            enableJavaScriptEvaluation: true,
            suppressInsecureJavaScriptEnvironmentWarning: true,
            ...config.happyDom,
        },
    }
}