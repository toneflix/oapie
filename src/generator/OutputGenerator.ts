import { TypeScriptGenerator } from './TypeScriptGenerator'
import { UserConfig } from 'src/types/app'
import path from 'node:path'
import prettier from 'prettier'

export class OutputGenerator {
    static serializeOutput = async (
        payload: unknown,
        outputFormat: UserConfig['outputFormat'],
        rootTypeName = 'ExtractedApiDocument'
    ): Promise<string> => {
        if (outputFormat === 'js') {
            return prettier.format(`export default ${JSON.stringify(payload, null, 2)}`, {
                parser: 'babel',
                semi: false,
                singleQuote: true,
            })
        }

        if (outputFormat === 'ts') {
            return prettier.format(TypeScriptGenerator.generateModule(payload as never, rootTypeName), {
                parser: 'typescript',
                semi: false,
                singleQuote: true,
            })
        }

        return JSON.stringify(payload, null, outputFormat === 'json' ? 0 : 2)
    }

    static buildFilePath = (
        workspaceRoot: string,
        source: string,
        shape: string,
        outputFormat: UserConfig['outputFormat']
    ): string => {
        const ext = {
            pretty: 'txt',
            json: 'json',
            js: 'js',
            ts: 'ts',
        }[outputFormat]
        const safeSource = source.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '')
        const shapeSuffix = shape === 'openapi' ? '.openapi' : ''

        return path.join(workspaceRoot, 'output', `${safeSource || 'output'}${shapeSuffix}.${ext}`)
    }

    static getRootTypeName = (shape: string): string => {
        return shape === 'openapi' ? 'ExtractedApiDocument' : 'ExtractedPayload'
    }
}