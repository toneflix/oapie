import * as sdk from '../src/index'

import { describe, expect, it } from 'vitest'

describe('example-both-sdk exports', () => {
    it('exports both class-based and runtime entrypoints', () => {
        expect(sdk.Core).toBeTypeOf('function')
        expect(sdk.BaseApi).toBeTypeOf('function')
        expect(sdk.ExampleApi).toBeTypeOf('function')
        expect(sdk.ProfileApi).toBeTypeOf('function')
        expect(sdk.createClient).toBeTypeOf('function')
        expect(sdk.createSdk).toBeTypeOf('function')
        expect(sdk.setConfigFileBasename).toBeTypeOf('function')
        expect(sdk.exampleDocumentSdk).toBeDefined()
        expect(sdk.exampleDocumentManifest).toBeDefined()
    })
})
