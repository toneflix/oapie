import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
    resolve: {
        alias: {
            '@oapiex/sdk-kit': path.resolve(import.meta.dirname, '../../packages/sdk-kit/src/index.ts'),
            '@oapiex/sdk-kit/contracts': path.resolve(import.meta.dirname, '../../packages/sdk-kit/src/Contracts/index.ts'),
        },
    },
    test: {
        name: 'example-sdk',
        environment: 'node',
        include: ['tests/*.{test,spec}.?(c|m)[jt]s?(x)'],
    },
})