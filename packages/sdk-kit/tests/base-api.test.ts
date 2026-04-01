import { afterEach, describe, expect, it, vi } from 'vitest'

import { BadRequestException } from '../src/Exceptions/BadRequestException'
import { Core } from '../src/Core'
import { Example } from '../src/Apis/Example'
import { Http } from '../src/Http'
import axios from 'axios'

describe('BaseApi', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('initializes the examples api with the same core instance', async () => {
        const core = new Core({
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

        expect(core.api.examples).toBeInstanceOf(Example)

        await expect(core.api.examples.list('NG')).resolves.toEqual([])

        expect(validator).toHaveBeenCalledTimes(1)
        expect(validator).toHaveBeenCalledWith(core)
        expect(sendSpy).toHaveBeenCalledTimes(1)
        expect(sendSpy).toHaveBeenCalledWith(
            'https://developersandbox-api.flutterwave.com/app/example?code=NG',
            'GET',
            {},
            { 'X-Key-1': undefined },
        )
    })

    it('delegates setAccessValidator to the injected core', () => {
        const core = new Core({
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

    it('stores the last exception when an example request fails', async () => {
        const core = new Core({
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

        await expect(core.api.examples.list('NG')).rejects.toBeInstanceOf(BadRequestException)

        const lastException = core.api.getLastException()

        expect(request).toHaveBeenCalledTimes(1)
        expect(lastException).toBeInstanceOf(BadRequestException)
        expect(lastException?.message).toBe('Country code is invalid')
    })
})