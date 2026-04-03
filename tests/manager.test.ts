import { describe, expect, it, vi } from 'vitest'

import { closeActiveBrowserResources, extractStablePageHtml, registerActiveBrowserCloser } from '../src/Manager'

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

describe('browser cleanup registry', () => {
    it('closes registered active browser resources', async () => {
        const closeFirst = vi.fn().mockResolvedValue(undefined)
        const closeSecond = vi.fn().mockResolvedValue(undefined)

        registerActiveBrowserCloser(closeFirst)
        registerActiveBrowserCloser(closeSecond)

        await closeActiveBrowserResources()

        expect(closeSecond).toHaveBeenCalledTimes(1)
        expect(closeFirst).toHaveBeenCalledTimes(1)
    })

    it('does not close resources after they are unregistered', async () => {
        const closeSpy = vi.fn().mockResolvedValue(undefined)
        const unregister = registerActiveBrowserCloser(closeSpy)

        unregister()

        await closeActiveBrowserResources()

        expect(closeSpy).not.toHaveBeenCalled()
    })
})