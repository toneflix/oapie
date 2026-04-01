import { UserConfig } from '../Contracts/Core'

const defaultConfig: UserConfig = {
    environment: 'sandbox',
    urls: {
        live: '',
        sandbox: ''
    }
}

let globalConfig: UserConfig = defaultConfig

const defineConfig = (config: Partial<UserConfig>): UserConfig => {
    const userConfig = {
        ...defaultConfig,
        ...config,
        urls: {
            ...defaultConfig.urls,
            ...config.urls,
        },
    }

    globalConfig = userConfig

    return userConfig
}

export {
    defineConfig,
    globalConfig,
    defaultConfig,
}