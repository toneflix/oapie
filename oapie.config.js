import { defineConfig } from './src/Manager'

/**
 * See https://oapi-extractor.toneflix.net/configuration for docs
 */
export default defineConfig({
  outputFormat: 'pretty',
  outputShape: 'raw',
  browser: 'puppeteer',
  requestTimeout: 10000,
  maxRedirects: 5,
  userAgent: 'Mozilla/5.0 (X11; Linux x64) AppleWebKit/537.36 (KHTML, like Gecko) OpenApiExtractor/1.0.0',
  retryCount: 3,
  retryDelay: 1000,
})