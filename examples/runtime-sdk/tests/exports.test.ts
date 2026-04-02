import * as sdk from '../src/index'

import { describe, expect, it } from 'vitest'

describe('example-runtime-sdk exports', () => {
    it('exports the runtime bundle and convenience client factory', () => {
        expect(sdk.createClient).toBeTypeOf('function')
        expect(sdk.createSdk).toBeTypeOf('function')
        expect(sdk.exampleDocumentSdk).toBeDefined()
        expect(sdk.exampleDocumentManifest).toBeDefined()
        expect(sdk.Http).toBeTypeOf('function')
    })
})
