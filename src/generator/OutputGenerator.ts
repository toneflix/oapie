import { TypeScriptGenerator } from './TypeScriptGenerator'
import { UserConfig } from 'src/types/app'
import path from 'node:path'
import prettier from 'prettier'

export class OutputGenerator {
    /**
     * Serialize the extracted payload into the desired output format, optionally 
     * generating TypeScript types when requested.
     * 
     * @param payload The extracted payload to serialize.
     * @param outputFormat The desired output format ('json', 'js', 'ts', 'pretty').
     * @param rootTypeName The root type name to use when generating TypeScript types.
     * @returns A promise that resolves to the serialized output string.

     */
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

    /**
     * Build a safe file path for the output based on the workspace root, source 
     * identifier, desired shape, and output format.
     * 
     * @param workspaceRoot     The root directory of the workspace.
     * @param source            The original source identifier
     * @param shape             The desired output shape ('raw' or 'openapi').  
     * @param outputFormat      The desired output format ('json', 'js', 'ts', 'pretty').
     * @returns                 The constructed file path for the output.
     */
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

    /**
     * Determine the appropriate root type name for TypeScript generation based on the desired 
     * output shape. This helps ensure that generated types are meaningful and contextually relevant.
     * 
     * @param shape     The desired output shape ('raw' or 'openapi').
     * @returns         The root type name to use for TypeScript generation.
     */
    static getRootTypeName = (shape: string): string => {
        return shape === 'openapi' ? 'ExtractedApiDocument' : 'ExtractedPayload'
    }
}