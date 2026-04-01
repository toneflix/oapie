import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'

export default defineConfig({
    plugins: [tsconfigPaths()],
    resolve: {
        alias: {
            '@oapiex/sdk-kit': path.resolve(import.meta.dirname, '../sdk-kit/src/index.ts'),
            '@oapiex/sdk-kit/contracts': path.resolve(import.meta.dirname, '../sdk-kit/src/Contracts/index.ts'),
        },
    },
    test: {
        name: 'example-sdk',
        environment: 'node',
        include: ['tests/*.{test,spec}.?(c|m)[jt]s?(x)'],
    },
})