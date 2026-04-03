import { afterEach, describe, expect, it, vi } from 'vitest'

import { ActiveCustomer } from '../src/Apis/ActiveCustomer'
import { BillBiller } from '../src/Apis/BillBiller'
import { Core } from '../src/Core'
import { Http } from '@oapiex/sdk-kit'

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

        expect(core.api.billBillers).toBeInstanceOf(BillBiller)
        expect(core.api.activeCustomers).toBeInstanceOf(ActiveCustomer)

        sendSpy.mockResolvedValueOnce({
            success: true,
            message: 'ok',
            data: [],
            meta: {},
        })

        await expect(
            core.api.billBillers.get({ country: 'NG', type: 'all' })
        ).resolves.toEqual([])

        sendSpy.mockResolvedValueOnce({
            success: true,
            message: 'ok',
            data: {
                commission: 100,
                name: 'John Doe',
                identifier: 'customer-1',
            },
            meta: {},
        })

        await expect(
            core.api.billBillers.get({ country: 'NG', type: 'all' })
        ).resolves.toEqual({
            commission: 100,
            name: 'John Doe',
            identifier: 'customer-1',
        })

        expect(validator).toHaveBeenCalledTimes(2)
        expect(validator).toHaveBeenCalledWith(core)
        expect(sendSpy).toHaveBeenCalledTimes(2)
    })
})
