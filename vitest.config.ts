import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
    resolve: {
        alias: {
            '@oapiex/sdk-kit': path.resolve(import.meta.dirname, 'packages/sdk-kit/src/index.ts'),
            '@oapiex/sdk-kit/contracts': path.resolve(import.meta.dirname, 'packages/sdk-kit/src/Contracts/index.ts'),
        },
    },
    test: {
        passWithNoTests: true,
        pool: process.platform === 'win32' ? 'forks' : 'threads',
        name: 'generic',
        environment: 'node',
        root: './',
        include: [
            'tests/*.{test,spec}.?(c|m)[jt]s?(x)',
            'packages/*/tests/*.{test,spec}.?(c|m)[jt]s?(x)',
            'examples/*/tests/*.{test,spec}.?(c|m)[jt]s?(x)',
        ],
        coverage: {
            reporter: ['text', 'json', 'html', 'lcov'],
            include: [
                'src/**/*.{ts,js}',
                'packages/*/src/**/*.{ts,js}',
                'examples/*/src/**/*.{ts,js}',
            ],
            exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*', '**/.h3ravel/**'],
        }
    }
})