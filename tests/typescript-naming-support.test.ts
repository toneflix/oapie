import { describe, expect, it } from 'vitest'

import { NamingSupport } from '../src/generator/NamingSupport'

describe('NamingSupport', () => {
    const naming = new NamingSupport()

    it('preserves singular words that end with s', () => {
        expect(naming.singularize('status')).toBe('status')
        expect(naming.singularize('analysis')).toBe('analysis')
        expect(naming.singularize('series')).toBe('series')
    })

    it('still singularizes regular and irregular plural path segments', () => {
        expect(naming.singularize('wallets')).toBe('wallet')
        expect(naming.singularize('statuses')).toBe('status')
        expect(naming.singularize('analyses')).toBe('analysis')
    })

    it('keeps status path segments intact when deriving operation names', () => {
        expect(naming.deriveOperationNaming('/v1/collections/virtual-account/status/{reference}')).toEqual({
            baseName: 'VirtualAccountStatus',
            collisionSuffix: 'By Reference',
        })
    })
})