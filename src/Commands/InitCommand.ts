import { Command } from '@h3ravel/musket'
import { defaultConfig } from '../Manager'
import { fileURLToPath } from 'url'
import fs from 'node:fs/promises'
import path from 'node:path'
const __filename = fileURLToPath(import.meta.url)

export class InitCommand extends Command {
    protected signature = `init 
        {--f|force : Overwrite existing config}
    `
    protected description = 'Generate a default openapie.config.ts in the current directory'

    public async handle (): Promise<void> {
        const cwd = process.cwd()
        const configPath = path.join(cwd, 'openapie.config.js')
        const force = Boolean(this.option('force', false))

        const configTemplate = this.buildConfigTemplate()

        try {
            await fs.access(configPath)
            if (!force) {
                this.error(`Config file already exists at ${configPath}. Use --force to overwrite.`)
                process.exit(1)
            }
        } catch {
            // File does not exist, proceed
        }

        await fs.writeFile(configPath, configTemplate, 'utf8')
        this.line(`Created ${configPath} `)
    }

    buildConfigTemplate (): string {
        const def = defaultConfig
        const from = __filename.includes('node_modules') ? 'openapie' : './src/Manager'

        return [
            `import { defineConfig } from '${from}'`,
            '',
            '/**',
            ' * See https://oapi-extractor.toneflix.net/configuration for docs',
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
}
