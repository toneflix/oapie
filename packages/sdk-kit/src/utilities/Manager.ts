import { InitOptions, UserConfig } from '../Contracts/Core'
import { createDefaultConfig, defaultConfig, mergeConfig } from '../config'
import { createJiti } from 'jiti'
import path from 'node:path'

const CONFIG_BASENAMES = [
    'oapiex.config.ts',
    'oapiex.config.js',
    'oapiex.config.cjs',
] as const

let globalConfig: UserConfig = createDefaultConfig()
let loadedConfigRoot: string | null = null

type SyncJitiLoader = (id: string) => unknown

const pickInitOptions = (value: unknown): Partial<InitOptions> | null => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return null
    }

    const config = value as Record<string, unknown>
    const scoped = config.sdkKit ?? config.sdk

    if (scoped && typeof scoped === 'object' && !Array.isArray(scoped)) {
        return pickInitOptions(scoped)
    }

    const knownKeys = ['clientId', 'clientSecret', 'encryptionKey', 'environment', 'urls', 'headers', 'timeout', 'auth', 'debugLevel'] as const
    const nextConfig = knownKeys.reduce<Partial<InitOptions>>((result, key) => {
        if (config[key] !== undefined) {
            result[key] = config[key] as never
        }

        return result
    }, {})

    return Object.keys(nextConfig).length > 0 ? nextConfig : null
}

const loadUserConfig = (rootDir: string = process.cwd()): Partial<UserConfig> | null => {
    const jiti = createJiti(import.meta.url, {
        interopDefault: true,
        moduleCache: false,
        fsCache: false,
    })
    const syncLoad = jiti as unknown as SyncJitiLoader

    for (const basename of CONFIG_BASENAMES) {
        const configPath = path.join(rootDir, basename)

        try {
            const loaded = syncLoad(configPath)
            const loadedModule = (typeof loaded === 'object' && loaded !== null
                ? loaded as Record<string, unknown>
                : null)
            const resolved = loadedModule?.default ?? loadedModule?.config ?? loaded
            const sdkConfig = pickInitOptions(resolved)

            if (sdkConfig) {
                return sdkConfig
            }
        } catch {
            continue
        }
    }

    return null
}

const ensureConfigLoaded = (rootDir: string = process.cwd()): UserConfig => {
    if (loadedConfigRoot === rootDir) {
        return globalConfig
    }

    globalConfig = createDefaultConfig()
    loadedConfigRoot = rootDir

    const userConfig = loadUserConfig(rootDir)

    if (userConfig) {
        globalConfig = mergeConfig(globalConfig, userConfig)
    }

    return globalConfig
}

const updateConfig = (config: Partial<UserConfig>): UserConfig => {
    const baseConfig = ensureConfigLoaded()
    const userConfig = mergeConfig(baseConfig, config)

    globalConfig = userConfig

    return userConfig
}

const getConfig = (): UserConfig => ensureConfigLoaded()

const resetConfig = (): UserConfig => {
    loadedConfigRoot = null
    globalConfig = createDefaultConfig()

    return globalConfig
}

export {
    getConfig,
    updateConfig,
    globalConfig,
    defaultConfig,
    resetConfig,
    loadUserConfig,
}