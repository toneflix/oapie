import { afterEach, describe, expect, it, vi } from 'vitest'

import { Core } from '../src/Core'
import { Http } from '../src/Http'
import { createSdk } from '../src/RuntimeSdk'

describe('RuntimeSdk', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('binds a manifest-driven runtime API onto Core', async () => {
        const core = new Core({
            clientId: 'client-id',
            clientSecret: 'client-secret',
            environment: 'sandbox',
            urls: {
                sandbox: 'https://sandbox-api.example.com',
            },
        })
        const validator = vi.fn(async () => true)
        const sendSpy = vi.spyOn(Http, 'send')
            .mockResolvedValueOnce({
                success: true,
                message: 'ok',
                data: [{ id: 'ex_1' }],
                meta: {},
            })
            .mockResolvedValueOnce({
                success: true,
                message: 'ok',
                data: { id: 'ex_2' },
                meta: {},
            })

        core.setAccessValidator(validator)

        const runtimeCore = core.useDocument({
            document: {},
            manifest: {
                securitySchemes: [],
                groups: [
                    {
                        className: 'Example',
                        propertyName: 'examples',
                        operations: [
                            {
                                path: '/app/example',
                                method: 'GET',
                                methodName: 'list',
                                responseType: 'Example[]',
                                inputType: 'Record<string, never>',
                                queryType: 'ExampleQuery',
                                headerType: 'ExampleHeader',
                                paramsType: 'Record<string, never>',
                                hasBody: false,
                                bodyRequired: false,
                                pathParams: [],
                                queryParams: [{ name: 'code', accessor: 'code', in: 'query', required: true }],
                                headerParams: [{ name: 'X-Key-1', accessor: 'xKey1', in: 'header', required: false }],
                            },
                            {
                                path: '/app/example',
                                method: 'POST',
                                methodName: 'create',
                                responseType: 'Example',
                                inputType: 'ExampleInput',
                                queryType: 'Record<string, never>',
                                headerType: 'ExampleHeader2',
                                paramsType: 'Record<string, never>',
                                hasBody: true,
                                bodyRequired: true,
                                pathParams: [],
                                queryParams: [],
                                headerParams: [{ name: 'X-Key-1', accessor: 'xKey1', in: 'header', required: false }],
                            },
                        ],
                    },
                ],
            },
        })

        await expect(runtimeCore.api.examples.list({ code: 'NG' }, { 'X-Key-1': 'header-1' })).resolves.toEqual([{ id: 'ex_1' }])
        await expect(runtimeCore.api.examples.create({ code: 'NG' }, { 'X-Key-1': 'header-2' })).resolves.toEqual({ id: 'ex_2' })

        expect(validator).toHaveBeenCalledTimes(2)
        expect(sendSpy).toHaveBeenNthCalledWith(
            1,
            'https://sandbox-api.example.com/app/example?code=NG',
            'GET',
            {},
            { 'X-Key-1': 'header-1' },
        )
        expect(sendSpy).toHaveBeenNthCalledWith(
            2,
            'https://sandbox-api.example.com/app/example',
            'POST',
            { code: 'NG' },
            { 'X-Key-1': 'header-2' },
        )
    })

    it('creates a runtime SDK from init options and a manifest bundle', async () => {
        const sendSpy = vi.spyOn(Http, 'send').mockResolvedValue({
            success: true,
            message: 'ok',
            data: [{ id: 'ex_1' }],
            meta: {},
        })

        const core = createSdk({
            document: {},
            manifest: {
                securitySchemes: [],
                groups: [
                    {
                        className: 'Example',
                        propertyName: 'examples',
                        operations: [
                            {
                                path: '/app/example',
                                method: 'GET',
                                methodName: 'list',
                                responseType: 'Example[]',
                                inputType: 'Record<string, never>',
                                queryType: 'ExampleQuery',
                                headerType: 'Record<string, never>',
                                paramsType: 'Record<string, never>',
                                hasBody: false,
                                bodyRequired: false,
                                pathParams: [],
                                queryParams: [{ name: 'code', accessor: 'code', in: 'query', required: true }],
                                headerParams: [],
                            },
                        ],
                    },
                ],
            },
        }, {
            clientId: 'client-id',
            clientSecret: 'client-secret',
            environment: 'sandbox',
            urls: {
                sandbox: 'https://sandbox-api.example.com',
            },
        })

        core.setAccessValidator(async () => true)

        await expect(core.api.examples.list({ code: 'NG' })).resolves.toEqual([{ id: 'ex_1' }])
        expect(sendSpy).toHaveBeenCalledTimes(1)
    })
})