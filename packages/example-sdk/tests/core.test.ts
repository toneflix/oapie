import { afterEach, describe, expect, it, vi } from 'vitest'

import { Core } from '../src/Core'
import { Example } from '../src/Apis/Example'
import { Profile } from '../src/Apis/Profile'
import { Http } from '@oapiex/sdk-kit'

describe('example-sdk Core', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('wires multiple generated api groups onto the sdk base api', async () => {
        const core = new Core({
            clientId: 'client-id',
            clientSecret: 'client-secret',
            environment: 'sandbox',
        })
        const validator = vi.fn(async () => true)
        const sendSpy = vi.spyOn(Http, 'send')

        sendSpy.mockResolvedValueOnce({
            success: true,
            message: 'ok',
            data: [],
            meta: {},
        })

        core.setAccessValidator(validator)

        expect(core.api.examples).toBeInstanceOf(Example)
        expect(core.api.profiles).toBeInstanceOf(Profile)

        await expect(core.api.examples.list('NG')).resolves.toEqual([])

        sendSpy.mockResolvedValueOnce({
            success: true,
            message: 'ok',
            data: {
                id: 'profile-1',
                displayName: 'Jane Doe',
                email: 'jane@example.com',
                status: 'active',
            },
            meta: {},
        })

        await expect(core.api.profiles.get('profile-1')).resolves.toEqual({
            id: 'profile-1',
            displayName: 'Jane Doe',
            email: 'jane@example.com',
            status: 'active',
        })

        expect(validator).toHaveBeenCalledTimes(2)
        expect(validator).toHaveBeenCalledWith(core)
        expect(sendSpy).toHaveBeenCalledTimes(2)
    })
})