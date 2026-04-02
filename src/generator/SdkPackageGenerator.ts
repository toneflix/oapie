import { OperationTypeRefs, SdkNamingStrategyOptions } from './types'

import type { OpenApiDocumentLike } from '../types/open-api'
import { TypeScriptGenerator } from './TypeScriptGenerator'
import { TypeScriptTypeBuilder } from './TypeScriptTypeBuilder'

export interface SdkPackageGeneratorOptions extends SdkNamingStrategyOptions {
    outputMode?: 'runtime' | 'classes' | 'both'
    signatureStyle?: 'flat' | 'grouped'
    rootTypeName?: string
    schemaModule?: string
    packageName?: string
    packageVersion?: string
    packageDescription?: string
    sdkKitPackageName?: string
}

export class SdkPackageGenerator {
    private typeBuilder = new TypeScriptTypeBuilder()
    private typeScriptGenerator = new TypeScriptGenerator()

    generate (
        document: OpenApiDocumentLike,
        options: SdkPackageGeneratorOptions = {}
    ): Record<string, string> {
        const outputMode = options.outputMode ?? 'both'
        const signatureStyle = options.signatureStyle ?? 'grouped'
        const rootTypeName = options.rootTypeName ?? 'ExtractedApiDocument'
        const schemaModule = options.schemaModule
            ?? this.typeScriptGenerator.generateModule(document, rootTypeName, options)
        const operationTypeRefs = this.createOperationTypeRefs(document)
        const manifest = this.typeBuilder.buildSdkManifest(document, operationTypeRefs, options)
        const classNames = manifest.groups.map((group) => group.className)
        const files: Record<string, string> = {
            'package.json': this.renderPackageJson(options),
            'src/Schema.ts': schemaModule,
            'src/index.ts': this.renderIndexFile(classNames, outputMode, rootTypeName),
            'tsconfig.json': this.renderTsconfig(),
            'tsdown.config.ts': this.renderTsdownConfig(),
            'vitest.config.ts': this.renderVitestConfig(),
            'tests/exports.test.ts': this.renderExportsTest(rootTypeName, outputMode),
        }

        if (outputMode !== 'runtime') {
            files['src/Apis/BaseApi.ts'] = this.renderBaseApi(manifest)

            for (const group of manifest.groups) {
                files[`src/Apis/${group.className}.ts`] = this.renderApiClass(group, signatureStyle)
            }

            files['src/Core.ts'] = this.renderCoreFile()
        }

        return files
    }

    private createOperationTypeRefs (document: OpenApiDocumentLike): Map<string, OperationTypeRefs> {
        const context = this.typeBuilder.createContext()
        const operationTypeRefs = new Map<string, OperationTypeRefs>()

        for (const model of this.typeBuilder.collectSemanticModels(document)) {
            const operationKey = `${model.path}::${model.method}`
            const resolvedName = this.typeBuilder.registerNamedShape(
                this.typeBuilder.namespaceTopLevelShape(model.shape, model.role),
                model.name,
                context,
                model.collisionSuffix,
            )
            const existingRefs = operationTypeRefs.get(operationKey) ?? {
                response: 'Record<string, never>',
                responseExample: 'unknown',
                input: 'Record<string, never>',
                query: 'Record<string, never>',
                header: 'Record<string, never>',
                params: 'Record<string, never>',
            }

            existingRefs[model.role] = resolvedName
            operationTypeRefs.set(operationKey, existingRefs)
        }

        return operationTypeRefs
    }

    private renderBaseApi (manifest: ReturnType<TypeScriptTypeBuilder['buildSdkManifest']>): string {
        return [
            'import { BaseApi as KitBaseApi } from \'@oapiex/sdk-kit\'',
            '',
            ...manifest.groups.map((group) => `import { ${group.className} } from './${group.className}'`),
            '',
            'export class BaseApi extends KitBaseApi {',
            ...manifest.groups.map((group) => `    ${group.propertyName}!: ${group.className}`),
            '',
            '    protected override boot () {',
            ...manifest.groups.map((group) => `        this.${group.propertyName} = new ${group.className}(this.core)`),
            '    }',
            '}',
        ].join('\n')
    }

    private renderApiClass (
        group: ReturnType<TypeScriptTypeBuilder['buildSdkManifest']>['groups'][number],
        signatureStyle: 'flat' | 'grouped'
    ): string {
        const typeImportContext = this.createTypeImportContext(group, signatureStyle)

        const imports = [
            "import type { Core as KitCore } from '@oapiex/sdk-kit'",
            "import { Http } from '@oapiex/sdk-kit'",
        ]

        if (typeImportContext.specifiers.length > 0) {
            imports.splice(1, 0, `import type { ${typeImportContext.specifiers.join(', ')} } from '../Schema'`)
        }

        return [
            ...imports,
            '',
            `export class ${group.className} {`,
            '    #core: KitCore',
            '',
            '    constructor(core: KitCore) {',
            '        this.#core = core',
            '    }',
            '',
            ...group.operations.flatMap((operation) => [
                this.renderApiMethod(operation, signatureStyle, typeImportContext.aliasMap),
                '',
            ]).slice(0, -1),
            '}',
        ].join('\n')
    }

    private renderApiMethod (
        operation: ReturnType<TypeScriptTypeBuilder['buildSdkManifest']>['groups'][number]['operations'][number],
        signatureStyle: 'flat' | 'grouped',
        aliasMap: Map<string, string>
    ): string {
        const signature = signatureStyle === 'flat'
            ? this.renderFlatSignature(operation, aliasMap)
            : this.renderGroupedSignature(operation, aliasMap)
        const urlPathArgs = signatureStyle === 'flat'
            ? this.renderFlatObjectLiteral(operation.paramsType, operation.pathParams)
            : operation.pathParams.length > 0 ? 'params' : '{}'
        const urlQueryArgs = signatureStyle === 'flat'
            ? this.renderFlatObjectLiteral(operation.queryType, operation.queryParams)
            : operation.queryParams.length > 0 ? 'query' : '{}'
        const headerArgs = signatureStyle === 'flat'
            ? this.renderFlatHeaders(operation)
            : operation.headerParams.length > 0
                ? '((headers ? { ...headers } : {}) as Record<string, string | undefined>)'
                : '{}'
        const bodyArg = signatureStyle === 'flat'
            ? (operation.hasBody ? 'body' : '{}')
            : (operation.hasBody ? 'body ?? {}' : '{}')

        return [
            `    async ${operation.methodName} ${signature}: Promise<${this.rewriteTypeReference(operation.responseType, aliasMap)}> {`,
            '        await this.#core.validateAccess()',
            '',
            `        const { data } = await Http.send<${this.rewriteTypeReference(operation.responseType, aliasMap)}>(`,
            `            this.#core.builder.buildTargetUrl('${operation.path}', ${urlPathArgs}, ${urlQueryArgs}),`,
            `            '${operation.method}',`,
            `            ${bodyArg},`,
            `            ${headerArgs}`,
            '        )',
            '',
            '        return data',
            '    }',
        ].join('\n')
    }

    private renderGroupedSignature (
        operation: ReturnType<TypeScriptTypeBuilder['buildSdkManifest']>['groups'][number]['operations'][number],
        aliasMap: Map<string, string>
    ): string {
        const args: string[] = []

        if (operation.pathParams.length > 0) {
            args.push(`params: ${this.rewriteTypeReference(operation.paramsType, aliasMap)}`)
        }

        if (operation.queryParams.length > 0) {
            args.push(`query: ${this.rewriteTypeReference(operation.queryType, aliasMap)}`)
        }

        if (operation.hasBody) {
            args.push(`body${operation.bodyRequired ? '' : '?'}: ${this.rewriteTypeReference(operation.inputType, aliasMap)}`)
        }

        if (operation.headerParams.length > 0) {
            args.push(`headers?: ${this.rewriteTypeReference(operation.headerType, aliasMap)}`)
        }

        return `(${args.join(', ')})`
    }

    private renderFlatSignature (
        operation: ReturnType<TypeScriptTypeBuilder['buildSdkManifest']>['groups'][number]['operations'][number],
        aliasMap: Map<string, string>
    ): string {
        const args = [
            ...operation.pathParams.map((parameter) => `${parameter.accessor}${parameter.required ? '' : '?'}: ${this.rewriteTypeReference(operation.paramsType, aliasMap)}[${JSON.stringify(parameter.name)}]`),
            ...operation.queryParams.map((parameter) => `${parameter.accessor}${parameter.required ? '' : '?'}: ${this.rewriteTypeReference(operation.queryType, aliasMap)}[${JSON.stringify(parameter.name)}]`),
            ...(operation.hasBody ? [`body${operation.bodyRequired ? '' : '?'}: ${this.rewriteTypeReference(operation.inputType, aliasMap)}`] : []),
            ...operation.headerParams.map((parameter) => `${parameter.accessor}${parameter.required ? '' : '?'}: ${this.rewriteTypeReference(operation.headerType, aliasMap)}[${JSON.stringify(parameter.name)}]`),
        ]

        return `(${args.join(', ')})`
    }

    private createTypeImportContext (
        group: ReturnType<TypeScriptTypeBuilder['buildSdkManifest']>['groups'][number],
        signatureStyle: 'flat' | 'grouped'
    ): { specifiers: string[], aliasMap: Map<string, string> } {
        const requiredTypeRefs = new Set<string>()

        for (const operation of group.operations) {
            requiredTypeRefs.add(operation.responseType)

            if (operation.hasBody) {
                requiredTypeRefs.add(operation.inputType)
            }

            if (operation.queryParams.length > 0) {
                requiredTypeRefs.add(operation.queryType)
            }

            if (operation.headerParams.length > 0) {
                requiredTypeRefs.add(operation.headerType)
            }

            if (operation.pathParams.length > 0) {
                requiredTypeRefs.add(operation.paramsType)
            }

            if (signatureStyle === 'flat') {
                continue
            }
        }

        const identifiers = Array.from(new Set(Array.from(requiredTypeRefs).flatMap((typeRef) => this.collectTypeIdentifiers(typeRef)))).sort()
        const aliasMap = new Map<string, string>()
        const specifiers = identifiers.map((identifier) => {
            if (identifier === group.className) {
                const aliasedName = `${identifier}Model`

                aliasMap.set(identifier, aliasedName)

                return `${identifier} as ${aliasedName}`
            }

            return identifier
        })

        return {
            specifiers,
            aliasMap,
        }
    }

    private rewriteTypeReference (typeRef: string, aliasMap: Map<string, string>): string {
        let rewritten = typeRef

        for (const [identifier, alias] of aliasMap.entries()) {
            rewritten = rewritten.replace(new RegExp(`\\b${identifier}\\b`, 'g'), alias)
        }

        return rewritten
    }

    private renderFlatObjectLiteral (_typeName: string, parameters: Array<{ name: string, accessor: string }>): string {
        if (parameters.length === 0) {
            return '{}'
        }

        return `{ ${parameters.map((parameter) => `${JSON.stringify(parameter.name)}: ${parameter.accessor}`).join(', ')} }`
    }

    private renderFlatHeaders (
        operation: ReturnType<TypeScriptTypeBuilder['buildSdkManifest']>['groups'][number]['operations'][number]
    ): string {
        if (operation.headerParams.length === 0) {
            return '{}'
        }

        return `({ ${operation.headerParams.map((parameter) => `${JSON.stringify(parameter.name)}: ${parameter.accessor}`).join(', ')} } as Record<string, string | undefined>)`
    }

    private renderCoreFile (): string {
        return [
            "import { Core as KitCore } from '@oapiex/sdk-kit'",
            '',
            "import { BaseApi } from './Apis/BaseApi'",
            '',
            'export class Core extends KitCore {',
            '    static override apiClass = BaseApi',
            '',
            '    declare api: BaseApi',
            '}',
        ].join('\n')
    }

    private renderPackageJson (options: SdkPackageGeneratorOptions): string {
        return JSON.stringify({
            name: options.packageName ?? 'generated-sdk',
            type: 'module',
            version: options.packageVersion ?? '0.1.0',
            private: true,
            description: options.packageDescription ?? 'Generated SDK scaffold emitted by oapiex.',
            main: './dist/index.cjs',
            module: './dist/index.js',
            types: './dist/index.d.ts',
            exports: {
                '.': {
                    import: './dist/index.js',
                    require: './dist/index.cjs',
                },
                './package.json': './package.json',
            },
            files: [
                'dist',
            ],
            scripts: {
                test: 'pnpm vitest --run',
                'test:watch': 'pnpm vitest',
                build: 'tsdown',
            },
            dependencies: {
                [options.sdkKitPackageName ?? '@oapiex/sdk-kit']: '^0.1.1',
            },
            devDependencies: {
                '@types/node': '^20.14.5',
                tsdown: '^0.20.1',
                typescript: '^5.4.5',
                vitest: '^3.2.4',
            },
        }, null, 2)
    }

    private renderTsconfig (): string {
        return JSON.stringify({
            compilerOptions: {
                rootDir: '.',
                outDir: './dist',
                target: 'esnext',
                module: 'es2022',
                moduleResolution: 'bundler',
                esModuleInterop: true,
                strict: true,
                allowJs: true,
                skipLibCheck: true,
                resolveJsonModule: true,
            },
            include: ['./src/**/*', './tests/**/*'],
            exclude: ['./dist', './node_modules'],
        }, null, 2)
    }

    private renderTsdownConfig (): string {
        return [
            "import { defineConfig } from 'tsdown'",
            '',
            'export default defineConfig({',
            '    entry: {',
            "        index: 'src/index.ts',",
            '    },',
            '    exports: true,',
            "    format: ['esm', 'cjs'],",
            "    outDir: 'dist',",
            '    dts: true,',
            '    sourcemap: false,',
            "    external: ['@oapiex/sdk-kit'],",
            '    clean: true,',
            '})',
        ].join('\n')
    }

    private renderVitestConfig (): string {
        return [
            "import { defineConfig } from 'vitest/config'",
            '',
            'export default defineConfig({',
            '    test: {',
            "        name: 'generated-sdk',",
            "        environment: 'node',",
            "        include: ['tests/*.{test,spec}.?(c|m)[jt]s?(x)'],",
            '    },',
            '})',
        ].join('\n')
    }

    private renderExportsTest (rootTypeName: string, outputMode: 'runtime' | 'classes' | 'both'): string {
        const rootExportName = `${rootTypeName.charAt(0).toLowerCase()}${rootTypeName.slice(1)}`
        const assertions = [
            "        expect(sdk.createClient).toBeTypeOf('function')",
            "        expect(sdk.createSdk).toBeTypeOf('function')",
            `        expect(sdk.${rootExportName}Sdk).toBeDefined()`,
            `        expect(sdk.${rootExportName}Manifest).toBeDefined()`,
        ]

        if (outputMode !== 'runtime') {
            assertions.unshift("        expect(sdk.Core).toBeTypeOf('function')")
            assertions.unshift("        expect(sdk.BaseApi).toBeTypeOf('function')")
        }

        return [
            "import { describe, expect, it } from 'vitest'",
            '',
            "import * as sdk from '../src/index'",
            '',
            "describe('generated sdk exports', () => {",
            "    it('exposes the generated schema and runtime helpers', () => {",
            ...assertions,
            '    })',
            '})',
        ].join('\n')
    }

    private renderIndexFile (
        classNames: string[],
        outputMode: 'runtime' | 'classes' | 'both',
        rootTypeName: string
    ): string {
        const rootExportName = `${rootTypeName.charAt(0).toLowerCase()}${rootTypeName.slice(1)}`
        const lines = [
            `import type { ${rootTypeName}Api } from './Schema'`,
            `import { ${rootExportName}Sdk } from './Schema'`,
            "import { createSdk as createBoundSdk } from '@oapiex/sdk-kit'",
            "import type { BaseApi as KitBaseApi, Core as KitCore, InitOptions } from '@oapiex/sdk-kit'",
            '',
            "export * from './Schema'",
        ]

        if (outputMode !== 'runtime') {
            lines.push("export { BaseApi } from './Apis/BaseApi'")
            lines.push(...classNames.map((className) => `export { ${className} as ${className}Api } from './Apis/${className}'`))
            lines.push("export { Core } from './Core'")
        }

        lines.push('')
    lines.push('export const createClient = (')
    lines.push('    options: InitOptions')
    lines.push(`): KitCore & { api: KitBaseApi & ${rootTypeName}Api } =>`)
    lines.push(`    createBoundSdk(${rootExportName}Sdk, options) as KitCore & { api: KitBaseApi & ${rootTypeName}Api }`)
        lines.push('')
        lines.push('export {')
        lines.push('    BadRequestException,')
        lines.push('    Builder,')
        lines.push('    ForbiddenRequestException,')
        lines.push('    Http,')
        lines.push('    HttpException,')
        lines.push('    UnauthorizedRequestException,')
        lines.push('    WebhookValidator,')
        lines.push('    createSdk,')
        lines.push('} from \'@oapiex/sdk-kit\'')
        lines.push('')
        lines.push('export type {')
        lines.push('    InitOptions,')
        lines.push('    UnifiedResponse,')
        lines.push('    XGenericObject,')
        lines.push('} from \'@oapiex/sdk-kit\'')

        return lines.join('\n')
    }

    private collectTypeIdentifiers (typeRef: string): string[] {
        return Array.from(new Set((typeRef.match(/\b[A-Z][A-Za-z0-9_]*/g) ?? []).filter((identifier) => {
            return !['Record', 'Promise'].includes(identifier)
        })))
    }
}