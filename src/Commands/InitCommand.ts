import { Command } from '@h3ravel/musket'
import { defaultConfig } from '../Manager'
import { fileURLToPath } from 'url'
import fs from 'node:fs/promises'
import path from 'node:path'
const __filename = fileURLToPath(import.meta.url)

export class InitCommand extends Command {
    protected signature = `init 
        {--f|force : Overwrite existing config}
        {--p|pkg? : Generate config for another package (e.g. sdk-kit) instead of oapiex [sdk]}
    `
    protected description = 'Generate a default oapiex.config.ts in the current directory'

    public async handle (): Promise<void> {
        const cwd = process.cwd()
        const configPath = path.join(cwd, 'oapiex.config.js')
        const force = this.option('force', false)
        const pkg = this.option('pkg', 'base').trim().toLowerCase() as 'base' | 'sdk'

        const configTemplate = {
            base: this.buildConfigTemplate(),
            sdk: this.buildSdkConfigTemplate(),
        }

        if (!['base', 'sdk'].includes(pkg))
            return void this.error(`Invalid package option: ${pkg}`)

        try {
            await fs.access(configPath)
            if (!force) {
                this.error(`Config file already exists at ${configPath}. Use --force to overwrite.`)
                process.exit(1)
            }
        } catch {
            // File does not exist, proceed
        }

        await fs.writeFile(configPath, configTemplate[pkg], 'utf8')
        this.line(`Created ${configPath} `)
    }

    buildConfigTemplate (): string {
        const def = defaultConfig
        const from = __filename.includes('node_modules') ? 'oapiex' : './src/Manager'

        return [
            `import { defineConfig } from '${from}'`,
            '',
            '/**',
            ' * See https://toneflix.github.io/oapiex/configuration for docs',
            ' */',
            'export default defineConfig({',
            `  outputFormat: '${def.outputFormat}',`,
            `  outputShape: '${def.outputShape}',`,
            `  browser: '${def.browser}',`,
            `  requestTimeout: ${def.requestTimeout},`,
            `  maxRedirects: ${def.maxRedirects},`,
            `  userAgent: '${def.userAgent}',`,
            `  retryCount: ${def.retryCount},`,
            `  retryDelay: ${def.retryDelay},`,
            '})',
        ].join('\n')
    }

    buildSdkConfigTemplate (): string {
        return [
            'import { defineConfig } from \'@oapiex/sdk-kit\'',
            '',
            '/**',
            ' * See https://toneflix.github.io/oapiex/configuration for docs',
            ' */',
            'export default defineConfig({',
            '  environment: \'sandbox\',',
            '  urls: {',
            '    live: \'https://live.oapiex.com\',',
            '    sandbox: \'https://sandbox.oapiex.com\',',
            '  },',
            '})',
        ].join('\n')
    }
}
