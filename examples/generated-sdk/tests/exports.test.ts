import { describe, expect, it } from 'vitest'

import * as sdk from '../src/index'

describe('generated sdk exports', () => {
    it('exposes the generated schema and runtime helpers', () => {
        expect(sdk.BaseApi).toBeTypeOf('function')
        expect(sdk.Core).toBeTypeOf('function')
        expect(sdk.createClient).toBeTypeOf('function')
        expect(sdk.createSdk).toBeTypeOf('function')
        expect(sdk.extractedApiDocumentSdk).toBeDefined()
        expect(sdk.extractedApiDocumentManifest).toBeDefined()
    })
})