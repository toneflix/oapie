import { defineConfig } from 'tsdown'

export default defineConfig([
    {
        entry: ['src/index.ts'],
        format: ['esm', 'cjs'],
        outDir: 'dist',
        dts: true,
        minify: false,
        exports: true,
        sourcemap: false,
        external: [
            'fs',
            'path',
            'os',
        ],
        clean: true,
        outExtensions (ctx) {
            return {
                'js': ctx.format === 'es' ? '.mjs' : '.cjs',
                'dts': '.d.ts'
            }
        }
    },
    {
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
        ],
        clean: true,
        outExtensions: () => ({ 'js': '.mjs' })
    }
]) 