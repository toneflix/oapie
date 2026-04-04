import { UserConfig } from './types/app'
import { defaultConfig } from './Manager'
import { createJiti } from 'jiti'
import fs from 'node:fs/promises'
import path from 'node:path'

const CONFIG_BASENAMES = [
    'oapiex.config.ts',
    'oapiex.config.js',
    'oapiex.config.cjs',
]

export async function loadUserConfig (
    rootDir: string = process.cwd()
): Promise<Partial<UserConfig> | null> {
    const jiti = createJiti(import.meta.url, {
        interopDefault: true,
        moduleCache: false,
        fsCache: false,
    })

    for (const basename of CONFIG_BASENAMES) {
        const configPath = path.join(rootDir, basename)
        try {
            await fs.access(configPath)
            const configModule = await jiti.import<Partial<UserConfig> | Record<string, unknown>>(configPath)
            const loadedModule = (typeof configModule === 'object' && configModule !== null
                ? configModule as Record<string, unknown>
                : null)
            const config = loadedModule?.default ?? loadedModule?.config ?? configModule
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
