import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        name: 'generated-sdk',
        environment: 'node',
        include: ['tests/*.{test,spec}.?(c|m)[jt]s?(x)'],
    },
})