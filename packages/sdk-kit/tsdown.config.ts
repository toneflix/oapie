import { defineConfig } from 'tsdown'

export default defineConfig([
    {
        entry: {
            index: 'src/index.ts',
            contracts: 'src/Contracts/index.ts',
        },
        exports: true,
        format: ['esm'],
        outDir: 'dist',
        dts: true,
        sourcemap: false,
        deps: {
            neverBundle: [
                'fs',
                'path',
                'os',
                'dotenv',
                'jiti',
                '@h3ravel/shared',
            ]
        },
        clean: true,
    },
]) 