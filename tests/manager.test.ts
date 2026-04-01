import { describe, expect, it, vi } from 'vitest'

import { extractStablePageHtml } from '../src/Manager'

describe('extractStablePageHtml', () => {
    it('retries when Puppeteer loses execution context during navigation', async () => {
        const page = {
            waitForSelector: vi.fn().mockResolvedValue(undefined),
            waitForFunction: vi.fn().mockResolvedValue(undefined),
            waitForNetworkIdle: vi.fn().mockResolvedValue(undefined),
            content: vi
                .fn()
                .mockRejectedValueOnce(new Error('Execution context was destroyed, most likely because of a navigation.'))
                .mockResolvedValueOnce('<html><body>stable</body></html>'),
        }

        const html = await extractStablePageHtml(page as never, 1000)

        expect(html).toBe('<html><body>stable</body></html>')
        expect(page.content).toHaveBeenCalledTimes(2)
    })
})