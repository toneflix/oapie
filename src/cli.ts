import { Application } from './Application'
import { Kernel } from '@h3ravel/musket'
import path from 'node:path'
import { resolveConfig } from './ConfigLoader'

// Parse CLI overrides for config (output, shape, loader, etc.)
// For now, we only support config file + per-command overrides, not global CLI flags
const config = await resolveConfig()
const app = new Application(config)

await Kernel.init(app, {
    name: 'mycli',
    discoveryPaths: [
        path.join(process.cwd(), 'src/Commands/*.ts'),
    ],
})