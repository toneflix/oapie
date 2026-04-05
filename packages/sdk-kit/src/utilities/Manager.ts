import { InitOptions, UserConfig } from '../Contracts/Core'
import { createDefaultConfig, defaultConfig, mergeConfig } from '../config'

import { createJiti } from 'jiti'
import path from 'node:path'

const DEFAULT_CONFIG_BASENAME = 'oapiex.config'
const CONFIG_EXTENSIONS = ['ts', 'js', 'cjs'] as const

let globalConfig: UserConfig = createDefaultConfig()
let loadedConfigRoot: string | null = null
let configBasename = DEFAULT_CONFIG_BASENAME

type SyncJitiLoader = (id: string) => unknown

const resolveConfigBasenames = (): string[] => {
    return CONFIG_EXTENSIONS.map((extension) => `${configBasename}.${extension}`)
}

const normalizeConfigBasename = (value: string): string => {
    const normalizedValue = value.trim()

    if (!normalizedValue) {
        return DEFAULT_CONFIG_BASENAME
    }

    return normalizedValue.replace(/\.(?:ts|js|cjs)$/u, '')
}

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

    for (const basename of resolveConfigBasenames()) {
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

const setConfigFileBasename = (value: string): string => {
    configBasename = normalizeConfigBasename(value)
    loadedConfigRoot = null
    globalConfig = createDefaultConfig()

    return configBasename
}

const getConfigFileBasename = (): string => configBasename

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
    configBasename = DEFAULT_CONFIG_BASENAME
    globalConfig = createDefaultConfig()

    return globalConfig
}

export {
    getConfigFileBasename,
    getConfig,
    setConfigFileBasename,
    updateConfig,
    globalConfig,
    defaultConfig,
    resetConfig,
    loadUserConfig,
}