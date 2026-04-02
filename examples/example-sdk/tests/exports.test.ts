import * as sdk from '../src/index'

import { describe, expect, it } from 'vitest'

describe('example-sdk exports', () => {
    it('exports generated APIs and shared kit primitives from the package entry', () => {
        expect(sdk.Core).toBeTypeOf('function')
        expect(sdk.BaseApi).toBeTypeOf('function')
        expect(sdk.Example).toBeTypeOf('function')
        expect(sdk.Profile).toBeTypeOf('function')
        expect(sdk.Http).toBeTypeOf('function')
        expect(sdk.Builder).toBeTypeOf('function')
    })
})