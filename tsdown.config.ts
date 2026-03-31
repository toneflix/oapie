import 'dotenv/config'

import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: ['src/cli.ts'],
    format: ['esm'],
    outDir: 'bin',
    dts: false,
    minify: true,
    sourcemap: false,
    external: [
        'fs',
        'path',
        'os',
        'dotenv'
    ],
    clean: true,
    outExtensions () {
        return {
            'js': '.mjs'
        }
    }
}) 