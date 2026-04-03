import { UserConfig } from '../Contracts/Core'

const defaultConfig: UserConfig = {
    environment: 'sandbox',
    urls: {
        live: '',
        sandbox: ''
    },
    headers: {},
}

let globalConfig: UserConfig = defaultConfig

const defineConfig = (config: Partial<UserConfig>): UserConfig => {
    const baseConfig = globalConfig ?? defaultConfig
    const userConfig: UserConfig = {
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
    }

    globalConfig = userConfig

    return userConfig
}

const getConfig = (): UserConfig => globalConfig

const resetConfig = (): UserConfig => {
    globalConfig = {
        ...defaultConfig,
        urls: { ...(defaultConfig.urls ?? {}) },
        headers: { ...(defaultConfig.headers ?? {}) },
    }

    return globalConfig
}

export {
    getConfig,
    defineConfig,
    globalConfig,
    defaultConfig,
    resetConfig,
}