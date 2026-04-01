import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        name: 'example-sdk',
        environment: 'node',
        include: ['tests/*.{test,spec}.?(c|m)[jt]s?(x)'],
    },
})