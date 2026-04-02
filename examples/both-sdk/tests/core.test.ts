import { afterEach, describe, expect, it, vi } from 'vitest'

import { Core } from '../src/Core'
import { Example } from '../src/Apis/Example'
import { Http } from '@oapiex/sdk-kit'
import { Profile } from '../src/Apis/Profile'

describe('example-both-sdk Core', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('wires generated api groups onto the sdk base api', async () => {
        const core = new Core({
            clientId: 'client-id',
            clientSecret: 'client-secret',
            environment: 'sandbox',
        })
        const validator = vi.fn(async () => true)
        const sendSpy = vi.spyOn(Http, 'send')

        core.setAccessValidator(validator)

        expect(core.api.examples).toBeInstanceOf(Example)
        expect(core.api.profiles).toBeInstanceOf(Profile)

        sendSpy.mockResolvedValueOnce({
            success: true,
            message: 'ok',
            data: [],
            meta: {},
        })

        await expect(
            core.api.examples.list({ code: 'NG' }, { 'X-Key-1': 'header-1' })
        ).resolves.toEqual([])

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

        await expect(
            core.api.profiles.get({ profileId: 'profile-1' })
        ).resolves.toEqual({
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
