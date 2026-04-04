import { afterEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { BadRequestException } from '../src/Exceptions/BadRequestException'
import { BaseApi } from '../src/Apis/BaseApi'
import { Builder } from '../src/Builder'
import { Core } from '../src/Core'
import { Http } from '../src/Http'
import { createAccessTokenCache } from '../src/utilities/AuthCache'
import { getConfig, resetConfig } from '../src/utilities/Manager'

class TestExampleApi {
    constructor(private core: Core) { }

    async list (): Promise<Array<{ id: string }>> {
        await this.core.validateAccess()

        const { data } = await Http.send<Array<{ id: string }>>(
            'https://example.test/app/example',
            'GET',
            {},
            {}
        )

        return data
    }
}

class TestBaseApi extends BaseApi {
    testExamples!: TestExampleApi

    protected override boot () {
        this.testExamples = new TestExampleApi(this.core)
    }
}

class TestCore extends Core {
    static override apiClass = TestBaseApi

    declare api: TestBaseApi
}

const withClearedCredentialEnv = async (run: () => Promise<void> | void) => {
    const previousClientId = process.env.CLIENT_ID
    const previousClientSecret = process.env.CLIENT_SECRET

    delete process.env.CLIENT_ID
    delete process.env.CLIENT_SECRET

    try {
        await run()
    } finally {
        if (previousClientId === undefined) {
            delete process.env.CLIENT_ID
        } else {
            process.env.CLIENT_ID = previousClientId
        }

        if (previousClientSecret === undefined) {
            delete process.env.CLIENT_SECRET
        } else {
            process.env.CLIENT_SECRET = previousClientSecret
        }
    }
}

describe('BaseApi', () => {
    afterEach(() => {
        vi.restoreAllMocks()
        resetConfig()
        Http.clearAuth()
        Builder.setEnvironment('sandbox')
    })

    it('boots sdk-specific child apis with the same core instance', async () => {
        const core = new TestCore({
            clientId: 'client-id',
            clientSecret: 'client-secret',
            environment: 'sandbox',
        })
        const validator = vi.fn(async () => true)
        const sendSpy = vi.spyOn(Http, 'send').mockResolvedValue({
            success: true,
            message: 'ok',
            data: [],
            meta: {},
        })

        core.setAccessValidator(validator)

        expect(core.api.testExamples).toBeInstanceOf(TestExampleApi)

        await expect(core.api.testExamples.list()).resolves.toEqual([])

        expect(validator).toHaveBeenCalledTimes(1)
        expect(validator).toHaveBeenCalledWith(core)
        expect(sendSpy).toHaveBeenCalledTimes(1)
        expect(sendSpy).toHaveBeenCalledWith(
            'https://example.test/app/example',
            'GET',
            {},
            {},
        )
    })

    it('delegates setAccessValidator to the injected core', () => {
        const core = new TestCore({
            clientId: 'client-id',
            clientSecret: 'client-secret',
            environment: 'sandbox',
        })
        const validator = vi.fn(async () => true)
        const setAccessValidatorSpy = vi.spyOn(core, 'setAccessValidator')

        core.api.setAccessValidator(validator)

        expect(setAccessValidatorSpy).toHaveBeenCalledTimes(1)
        expect(setAccessValidatorSpy).toHaveBeenCalledWith(validator)
    })

    it('stores the last exception when a child api request fails', async () => {
        const core = new TestCore({
            clientId: 'client-id',
            clientSecret: 'client-secret',
            environment: 'sandbox',
        })

        const request = vi.fn().mockRejectedValue({
            response: {
                status: 400,
                data: {
                    message: 'Request failed',
                    error: {
                        type: 'invalid_request',
                        code: 'bad_request',
                        message: 'Country code is invalid',
                        validation_errors: [],
                    },
                },
            },
        })
        const axiosInstance = Object.assign(request, {
            interceptors: {
                request: { use: vi.fn() },
                response: { use: vi.fn() },
            },
            defaults: {},
        })

        vi.spyOn(axios, 'create').mockReturnValue(axiosInstance as unknown as ReturnType<typeof axios.create>)

        await expect(core.api.testExamples.list()).rejects.toBeInstanceOf(BadRequestException)

        const lastException = core.api.getLastException()

        expect(request).toHaveBeenCalledTimes(1)
        expect(lastException).toBeInstanceOf(BadRequestException)
        expect(lastException?.message).toBe('Country code is invalid')
    })

    it('applies init config values to runtime url resolution', () => {
        const core = new TestCore({
            clientId: 'client-id',
            clientSecret: 'client-secret',
            environment: 'sandbox',
            encryptionKey: 'encryption-key',
            urls: {
                sandbox: 'https://sandbox.override.test/api',
            },
            headers: {
                'X-SDK': 'sdk-kit',
            },
            timeout: 4321,
        })

        expect(core.getEnvironment()).toBe('sandbox')
        expect(Builder.baseUrl()).toBe('https://sandbox.override.test/api/')
        expect(getConfig()).toMatchObject({
            environment: 'sandbox',
            encryptionKey: 'encryption-key',
            timeout: 4321,
            headers: {
                'X-SDK': 'sdk-kit',
            },
            urls: {
                sandbox: 'https://sandbox.override.test/api',
            },
        })
    })

    it('accepts debugLevel during initialization and forwards it to Http', () => {
        const setDebugLevelSpy = vi.spyOn(Http, 'setDebugLevel')

        const core = new TestCore({
            environment: 'sandbox',
            auth: {
                type: 'bearer',
                token: 'debug-token',
            },
            debugLevel: 2,
        })

        expect(core.debugLevel).toBe(2)
        expect(setDebugLevelSpy).toHaveBeenCalledWith(2)
    })

    it('loads sdk init options from oapiex.config.cjs', async () => {
        const tempDir = await mkdtemp(path.join(os.tmpdir(), 'oapiex-sdk-kit-config-'))
        const setDebugLevelSpy = vi.spyOn(Http, 'setDebugLevel')

        await writeFile(path.join(tempDir, 'oapiex.config.cjs'), `module.exports = {
        sdkKit: {
            clientId: 'config-client-id',
            clientSecret: 'config-client-secret',
            environment: 'sandbox',
            urls: { sandbox: 'https://config.override.test/api' },
            headers: { 'X-Config': 'loaded' },
            timeout: 2468,
            encryptionKey: 'config-encryption-key',
            auth: { type: 'bearer', token: 'config-token' },
            debugLevel: 3,
        }}`)

        vi.spyOn(process, 'cwd').mockReturnValue(tempDir)
        resetConfig()

        const core = new TestCore()

        expect(core.getClientId()).toBe('config-client-id')
        expect(core.getClientSecret()).toBe('config-client-secret')
        expect(core.getEnvironment()).toBe('sandbox')
        expect(core.debugLevel).toBe(3)
        expect(setDebugLevelSpy).toHaveBeenCalledWith(3)
        expect(getConfig()).toMatchObject({
            clientId: 'config-client-id',
            clientSecret: 'config-client-secret',
            environment: 'sandbox',
            encryptionKey: 'config-encryption-key',
            timeout: 2468,
            headers: {
                'X-Config': 'loaded',
            },
            urls: {
                sandbox: 'https://config.override.test/api',
            },
            auth: {
                type: 'bearer',
                token: 'config-token',
            },
            debugLevel: 3,
        })
        expect(Builder.baseUrl()).toBe('https://config.override.test/api/')

        await rm(tempDir, { recursive: true, force: true })
    })

    it('lets explicit init options override oapiex.config values', async () => {
        const tempDir = await mkdtemp(path.join(os.tmpdir(), 'oapiex-sdk-kit-config-'))

        await writeFile(path.join(tempDir, 'oapiex.config.cjs'), `module.exports = {
        sdkKit: {
            clientId: 'config-client-id',
            clientSecret: 'config-client-secret',
            environment: 'sandbox',
            urls: { sandbox: 'https://config.override.test/api' },
            headers: { 'X-Config': 'loaded' },
            timeout: 2468,
            debugLevel: 1,
        }}`)

        vi.spyOn(process, 'cwd').mockReturnValue(tempDir)
        resetConfig()

        const core = new TestCore({
            clientId: 'explicit-client-id',
            auth: {
                type: 'bearer',
                token: 'explicit-token',
            },
            headers: {
                'X-Explicit': 'yes',
            },
            debugLevel: 2,
        })

        expect(core.getClientId()).toBe('explicit-client-id')
        expect(core.getClientSecret()).toBe('config-client-secret')
        expect(core.debugLevel).toBe(2)
        expect(core.getConfig()).toMatchObject({
            auth: {
                type: 'bearer',
                token: 'explicit-token',
            },
            headers: {
                'X-Explicit': 'yes',
            },
            timeout: 2468,
            debugLevel: 2,
        })

        await rm(tempDir, { recursive: true, force: true })
    })

    it('applies drop-in auth strategies to outgoing requests', async () => {
        new TestCore({
            clientId: 'client-id',
            clientSecret: 'client-secret',
            environment: 'sandbox',
            urls: {
                sandbox: 'https://sandbox.override.test/api',
            },
            headers: {
                'X-SDK': 'sdk-kit',
            },
            timeout: 9876,
            auth: [
                {
                    type: 'basic',
                    username: 'demo',
                    password: 'secret',
                },
                {
                    type: 'apiKey',
                    name: 'X-Api-Key',
                    value: 'header-key',
                },
                {
                    type: 'apiKey',
                    name: 'api_key',
                    value: 'query-key',
                    in: 'query',
                },
                {
                    type: 'apiKey',
                    name: 'session',
                    value: 'cookie-key',
                    in: 'cookie',
                },
                {
                    type: 'custom',
                    apply: async request => ({
                        ...request,
                        headers: {
                            ...request.headers,
                            'X-Custom': 'custom-value',
                        },
                    }),
                },
            ],
        })

        const request = vi.fn().mockResolvedValue({
            data: {
                message: 'ok',
                data: { id: '1' },
                meta: {},
            },
        })
        const axiosInstance = Object.assign(request, {
            interceptors: {
                request: { use: vi.fn() },
                response: { use: vi.fn() },
            },
            defaults: {},
        })
        const createSpy = vi.spyOn(axios, 'create').mockReturnValue(axiosInstance as unknown as ReturnType<typeof axios.create>)

        await expect(
            Http.send('/charges', 'GET', undefined, { 'X-Request': 'request-header' }, { page: 1 })
        ).resolves.toMatchObject({
            success: true,
            data: { id: '1' },
        })

        expect(createSpy).toHaveBeenCalledWith(expect.objectContaining({
            baseURL: 'https://sandbox.override.test/api/',
            timeout: 9876,
            headers: expect.objectContaining({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Basic ZGVtbzpzZWNyZXQ=',
                Cookie: 'session=cookie-key',
                'X-Api-Key': 'header-key',
                'X-Custom': 'custom-value',
                'X-SDK': 'sdk-kit',
                'X-Request': 'request-header',
            }),
        }))
        expect(request).toHaveBeenCalledWith(expect.objectContaining({
            url: '/charges',
            method: 'GET',
            params: {
                page: 1,
                api_key: 'query-key',
            },
        }))
    })

    it('allows auth-only initialization without client credentials', async () => {
        await withClearedCredentialEnv(async () => {
            const tempDir = await mkdtemp(path.join(os.tmpdir(), 'oapiex-sdk-kit-empty-config-'))
            vi.spyOn(process, 'cwd').mockReturnValue(tempDir)
            resetConfig()

            const core = new TestCore({
                environment: 'sandbox',
                urls: {
                    sandbox: 'https://sandbox.override.test/api',
                },
                auth: {
                    type: 'bearer',
                    token: 'auth-only-token',
                },
            })
            const request = vi.fn().mockResolvedValue({
                data: {
                    message: 'ok',
                    data: [],
                    meta: {},
                },
            })
            const axiosInstance = Object.assign(request, {
                interceptors: {
                    request: { use: vi.fn() },
                    response: { use: vi.fn() },
                },
                defaults: {},
            })
            const createSpy = vi.spyOn(axios, 'create').mockReturnValue(axiosInstance as unknown as ReturnType<typeof axios.create>)

            core.setAccessValidator(async () => true)

            expect(core.getClientId()).toBeUndefined()
            expect(core.getClientSecret()).toBeUndefined()
            await expect(core.api.testExamples.list()).resolves.toEqual([])
            expect(createSpy).toHaveBeenCalledWith(expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: 'Bearer auth-only-token',
                }),
            }))

            await rm(tempDir, { recursive: true, force: true })
        })
    })

    it('still requires a client secret when auth is not configured', async () => {
        await withClearedCredentialEnv(async () => {
            const tempDir = await mkdtemp(path.join(os.tmpdir(), 'oapiex-sdk-kit-empty-config-'))
            vi.spyOn(process, 'cwd').mockReturnValue(tempDir)
            resetConfig()

            expect(() => new TestCore({
                clientId: 'client-id',
                environment: 'sandbox',
            })).toThrow('Client Secret is required to initialize API instance when auth is not provided')

            await rm(tempDir, { recursive: true, force: true })
        })
    })

    it('keeps bearer auth helper working for authorization headers', async () => {
        Http.setBearerToken('token-123')

        const request = vi.fn().mockResolvedValue({
            data: {
                message: 'ok',
                data: [],
                meta: {},
            },
        })
        const axiosInstance = Object.assign(request, {
            interceptors: {
                request: { use: vi.fn() },
                response: { use: vi.fn() },
            },
            defaults: {},
        })

        const createSpy = vi.spyOn(axios, 'create').mockReturnValue(axiosInstance as unknown as ReturnType<typeof axios.create>)

        await Http.send('/charges', 'GET')

        expect(createSpy).toHaveBeenCalledWith(expect.objectContaining({
            headers: expect.objectContaining({
                Authorization: 'Bearer token-123',
            }),
        }))
    })

    it('allows access validators to replace auth before a request is sent', async () => {
        const core = new TestCore({
            clientId: 'client-id',
            clientSecret: 'client-secret',
            environment: 'sandbox',
            urls: {
                sandbox: 'https://sandbox.override.test/api',
            },
            auth: {
                type: 'basic',
                username: 'demo',
                password: 'secret',
            },
        })
        const validator = vi.fn(async () => ({
            type: 'bearer' as const,
            token: 'fresh-token',
        }))
        const request = vi.fn().mockResolvedValue({
            data: {
                message: 'ok',
                data: [],
                meta: {},
            },
        })
        const axiosInstance = Object.assign(request, {
            interceptors: {
                request: { use: vi.fn() },
                response: { use: vi.fn() },
            },
            defaults: {},
        })
        const createSpy = vi.spyOn(axios, 'create').mockReturnValue(axiosInstance as unknown as ReturnType<typeof axios.create>)

        core.setAccessValidator(validator)

        await expect(core.api.testExamples.list()).resolves.toEqual([])

        expect(validator).toHaveBeenCalledTimes(1)
        expect(createSpy).toHaveBeenCalledWith(expect.objectContaining({
            headers: expect.objectContaining({
                Authorization: 'Bearer fresh-token',
            }),
        }))
    })

    it('exposes client credentials and allows config updates from access validators', async () => {
        const core = new TestCore({
            clientId: 'client-id',
            clientSecret: 'client-secret',
            environment: 'sandbox',
            urls: {
                sandbox: 'https://sandbox.override.test/api',
            },
        })
        const validator = vi.fn(async (instance: Core) => {
            expect(instance.getClientId()).toBe('client-id')
            expect(instance.getClientSecret()).toBe('client-secret')

            return {
                headers: {
                    'X-Access-Token': 'fetched-token',
                },
                auth: {
                    type: 'bearer' as const,
                    token: 'token-from-auth-endpoint',
                },
            }
        })
        const request = vi.fn().mockResolvedValue({
            data: {
                message: 'ok',
                data: [],
                meta: {},
            },
        })
        const axiosInstance = Object.assign(request, {
            interceptors: {
                request: { use: vi.fn() },
                response: { use: vi.fn() },
            },
            defaults: {},
        })
        const createSpy = vi.spyOn(axios, 'create').mockReturnValue(axiosInstance as unknown as ReturnType<typeof axios.create>)

        core.setAccessValidator(validator)

        await core.api.testExamples.list()

        expect(createSpy).toHaveBeenCalledWith(expect.objectContaining({
            headers: expect.objectContaining({
                Authorization: 'Bearer token-from-auth-endpoint',
                'X-Access-Token': 'fetched-token',
            }),
        }))
        expect(core.getConfig()).toMatchObject({
            headers: {
                'X-Access-Token': 'fetched-token',
            },
            auth: {
                type: 'bearer',
                token: 'token-from-auth-endpoint',
            },
        })
    })

    it('reuses cached validator tokens until expiry', async () => {
        const core = new TestCore({
            clientId: 'client-id',
            clientSecret: 'client-secret',
            environment: 'sandbox',
            urls: {
                sandbox: 'https://sandbox.override.test/api',
            },
        })
        const fetchToken = vi.fn()
            .mockResolvedValueOnce({
                token: 'cached-token-1',
                expiresInMs: 60_000,
            })
            .mockResolvedValueOnce({
                token: 'cached-token-2',
                expiresInMs: 60_000,
            })
        const request = vi.fn().mockResolvedValue({
            data: {
                message: 'ok',
                data: [],
                meta: {},
            },
        })
        const axiosInstance = Object.assign(request, {
            interceptors: {
                request: { use: vi.fn() },
                response: { use: vi.fn() },
            },
            defaults: {},
        })
        const createSpy = vi.spyOn(axios, 'create').mockReturnValue(axiosInstance as unknown as ReturnType<typeof axios.create>)
        const tokenCache = createAccessTokenCache(fetchToken)

        core.setAccessValidator(tokenCache)

        await core.api.testExamples.list()
        await core.api.testExamples.list()

        expect(fetchToken).toHaveBeenCalledTimes(1)
        expect(createSpy).toHaveBeenNthCalledWith(1, expect.objectContaining({
            headers: expect.objectContaining({
                Authorization: 'Bearer cached-token-1',
            }),
        }))
        expect(createSpy).toHaveBeenNthCalledWith(2, expect.objectContaining({
            headers: expect.objectContaining({
                Authorization: 'Bearer cached-token-1',
            }),
        }))
    })
})