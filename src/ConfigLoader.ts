import path from 'node:path'
import fs from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { UserConfig } from './types/app'
import { defaultConfig } from './Manager'

const CONFIG_BASENAMES = [
    'oapie.config.ts',
    'oapie.config.js',
    'oapie.config.cjs',
]

export async function loadUserConfig (
    rootDir: string = process.cwd()
): Promise<Partial<UserConfig> | null> {
    for (const basename of CONFIG_BASENAMES) {
        const configPath = path.join(rootDir, basename)
        try {
            await fs.access(configPath)
            // Use dynamic import for .js/.ts/.cjs
            const configModule = await import(pathToFileURL(configPath).href)
            // Support both default and named export
            const config = configModule.default || configModule.config || configModule
            if (typeof config === 'object' && config !== null) {
                return config as Partial<UserConfig>
            }
        } catch {
            continue
        }
    }

    return null
}

export async function resolveConfig (
    cliOverrides: Partial<UserConfig> = {}
): Promise<UserConfig> {
    const userConfig = await loadUserConfig()

    return {
        ...defaultConfig,
        ...userConfig,
        ...cliOverrides,
        happyDom: {
            ...defaultConfig.happyDom,
            ...(userConfig?.happyDom || {}),
            ...(cliOverrides.happyDom || {}),
        },
    }
}
