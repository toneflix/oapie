import { Application } from './Application'
import { GenerateCommand } from './Commands/GenerateCommand'
import { InitCommand } from './Commands/InitCommand'
import { Kernel } from '@h3ravel/musket'
import { ParseCommand } from './Commands/ParseCommand'
import { resolveConfig } from './ConfigLoader'

// Parse CLI overrides for config (output, shape, loader, etc.)
// For now, we only support config file + per-command overrides, not global CLI flags
const config = await resolveConfig()
const app = new Application(config)

await Kernel.init(app, {
    name: 'OAPIEX',
    logo: '',
    allowRebuilds: false,
    packages: [
        '@h3ravel/musket',
    ],
    baseCommands: [
        InitCommand,
        GenerateCommand,
        ParseCommand
    ],
    exceptionHandler (exception) {
        console.error('An unexpected error occurred:', exception)
        process.exit(1)
    },
})