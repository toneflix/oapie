import { Application } from './Application'
import { Kernel } from '@h3ravel/musket'
import path from 'node:path'

const app = new Application()

await Kernel.init(app, {
    name: 'mycli',
    discoveryPaths: [path.join(process.cwd(), 'src/Commands/*.ts')],
})