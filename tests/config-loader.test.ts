import { describe, expect, it, vi } from 'vitest'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { loadUserConfig, resolveConfig } from '../src/ConfigLoader'

describe('ConfigLoader', () => {
    it('loads oapiex.config.cjs with Jiti and preserves shared sdkKit config', async () => {
        const tempDir = await mkdtemp(path.join(os.tmpdir(), 'oapiex-config-loader-'))

        await writeFile(path.join(tempDir, 'oapiex.config.cjs'), `module.exports = {
        outputFormat: 'json',
        retryCount: 7,
        sdkKit: {
            clientId: 'config-client-id',
            environment: 'sandbox',
        },
    }`)

        const config = await loadUserConfig(tempDir)

        expect(config).toMatchObject({
            outputFormat: 'json',
            retryCount: 7,
            sdkKit: {
                clientId: 'config-client-id',
                environment: 'sandbox',
            },
        })

        await rm(tempDir, { recursive: true, force: true })
    })

    it('merges loaded config with defaults and cli overrides', async () => {
        const tempDir = await mkdtemp(path.join(os.tmpdir(), 'oapiex-config-loader-'))

        await writeFile(path.join(tempDir, 'oapiex.config.cjs'), `module.exports = {
        outputFormat: 'json',
        retryCount: 7,
        happyDom: {
            disableJavaScriptFileLoading: true,
        },
    }`)

        vi.spyOn(process, 'cwd').mockReturnValue(tempDir)

        const config = await resolveConfig({
            retryDelay: 250,
            happyDom: {
                enableJavaScriptEvaluation: false,
            },
        })

        expect(config.outputFormat).toBe('json')
        expect(config.retryCount).toBe(7)
        expect(config.retryDelay).toBe(250)
        expect(config.happyDom).toMatchObject({
            disableJavaScriptFileLoading: true,
            enableJavaScriptEvaluation: false,
        })

        await rm(tempDir, { recursive: true, force: true })
    })
})