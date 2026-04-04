import type { UserConfig } from './Contracts/Core'

export const defaultConfig: UserConfig = {
    environment: 'sandbox',
    urls: {
        live: '',
        sandbox: ''
    },
    headers: {},
    debugLevel: 0,
}

export const createDefaultConfig = (): UserConfig => ({
    ...defaultConfig,
    urls: { ...(defaultConfig.urls ?? {}) },
    headers: { ...(defaultConfig.headers ?? {}) },
})

export const mergeConfig = (
    baseConfig: UserConfig,
    config: Partial<UserConfig>
): UserConfig => ({
    ...baseConfig,
    ...config,
    urls: config.urls
        ? {
            ...(baseConfig.urls ?? defaultConfig.urls),
            ...config.urls,
        }
        : baseConfig.urls,
    headers: config.headers
        ? {
            ...(baseConfig.headers ?? defaultConfig.headers),
            ...config.headers,
        }
        : baseConfig.headers,
})

export const defineConfig = <TConfig extends Partial<UserConfig>> (
    config: TConfig
): TConfig => config