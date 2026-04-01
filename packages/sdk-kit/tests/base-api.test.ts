import { afterEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'

import { BadRequestException } from '../src/Exceptions/BadRequestException'
import { BaseApi } from '../src/Apis/BaseApi'
import { Core } from '../src/Core'
import { Http } from '../src/Http'

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

describe('BaseApi', () => {
    afterEach(() => {
        vi.restoreAllMocks()
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
})