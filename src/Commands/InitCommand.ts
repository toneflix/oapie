import { Command } from '@h3ravel/musket'
import { defaultConfig } from '../Manager'
import { fileURLToPath } from 'url'
import fs from 'node:fs/promises'
import path from 'node:path'
const __filename = fileURLToPath(import.meta.url)

export class InitCommand extends Command {
    protected signature = `init 
        {--f|force : Overwrite existing config}
        {--S|sdk-kit : Also include default SDK config values.}
    `
    protected description = 'Generate a default oapiex.config.ts in the current directory'

    public async handle (): Promise<void> {
        const cwd = process.cwd()
        const configPath = path.join(cwd, 'oapiex.config.js')
        const force = this.option('force', false)
        const sdkKit = this.option('sdkKit', false)

        const configTemplate = this.buildConfigTemplate(sdkKit)

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

    buildConfigTemplate (addSdkConfig: boolean = false): string {
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
            addSdkConfig ? this.buildSdkConfigTemplate() : undefined,
            '})',
        ].filter(Boolean).join('\n')
    }

    buildSdkConfigTemplate (): string {
        return [
            '  sdkKit: {',
            '    clientId: \'your-client-id\',',
            '    clientSecret: \'your-client-secret\',',
            '    encryptionKey: \'your-encryption-key\',',
            '    environment: \'sandbox\',',
            '    urls: {',
            '      live: \'https://live.oapiex.com\',',
            '      sandbox: \'https://sandbox.oapiex.com\',',
            '    },',
            '    debugLevel: 0,',
            '  },',
        ].join('\n')
    }
}
