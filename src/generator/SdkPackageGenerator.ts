import type { OpenApiDocumentLike } from '../types/open-api'
import { OperationTypeRefs } from './types'
import { TypeScriptGenerator } from './TypeScriptGenerator'
import { TypeScriptTypeBuilder } from './TypeScriptTypeBuilder'

export interface SdkPackageGeneratorOptions {
    outputMode?: 'runtime' | 'classes' | 'both'
    signatureStyle?: 'flat' | 'grouped'
    rootTypeName?: string
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
        const schemaModule = this.typeScriptGenerator.generateModule(document, rootTypeName)
        const operationTypeRefs = this.createOperationTypeRefs(document)
        const manifest = this.typeBuilder.buildSdkManifest(document, operationTypeRefs)
        const files: Record<string, string> = {
            'src/Schema.ts': schemaModule,
        }

        if (outputMode !== 'runtime') {
            files['src/Apis/BaseApi.ts'] = this.renderBaseApi(manifest)

            for (const group of manifest.groups) {
                files[`src/Apis/${group.className}.ts`] = this.renderApiClass(group, signatureStyle)
            }

            files['src/Core.ts'] = this.renderCoreFile()
        }

        files['src/index.ts'] = this.renderIndexFile(manifest.groups.map((group) => group.className), outputMode)

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
        const typeImports = new Set<string>()

        for (const operation of group.operations) {
            for (const typeRef of [operation.responseType, operation.inputType, operation.queryType, operation.headerType, operation.paramsType]) {
                for (const identifier of this.collectTypeIdentifiers(typeRef)) {
                    typeImports.add(identifier)
                }
            }
        }

        const imports = [
            "import type { Core as KitCore } from '@oapiex/sdk-kit'",
            "import { Http } from '@oapiex/sdk-kit'",
        ]

        if (typeImports.size > 0) {
            imports.splice(1, 0, `import type { ${Array.from(typeImports).sort().join(', ')} } from '../Schema'`)
        }

        return [
            ...imports,
            '',
            `export class ${group.className} {`,
            '    #core: KitCore',
            '',
            '    constructor(coreInstance: KitCore) {',
            '        this.#core = coreInstance',
            '    }',
            '',
            ...group.operations.flatMap((operation) => [
                this.renderApiMethod(operation, signatureStyle),
                '',
            ]).slice(0, -1),
            '}',
        ].join('\n')
    }

    private renderApiMethod (
        operation: ReturnType<TypeScriptTypeBuilder['buildSdkManifest']>['groups'][number]['operations'][number],
        signatureStyle: 'flat' | 'grouped'
    ): string {
        const signature = signatureStyle === 'flat'
            ? this.renderFlatSignature(operation)
            : this.renderGroupedSignature(operation)
        const urlPathArgs = signatureStyle === 'flat'
            ? this.renderFlatObjectLiteral(operation.paramsType, operation.pathParams)
            : operation.pathParams.length > 0 ? 'params' : '{}'
        const urlQueryArgs = signatureStyle === 'flat'
            ? this.renderFlatObjectLiteral(operation.queryType, operation.queryParams)
            : operation.queryParams.length > 0 ? 'query' : '{}'
        const headerArgs = signatureStyle === 'flat'
            ? this.renderFlatHeaders(operation)
            : operation.headerParams.length > 0 ? 'headers ?? {}' : '{}'
        const bodyArg = signatureStyle === 'flat'
            ? (operation.hasBody ? 'body' : '{}')
            : (operation.hasBody ? 'body ?? {}' : '{}')

        return [
            `    async ${operation.methodName} ${signature}: Promise<${operation.responseType}> {`,
            '        await this.#core.validateAccess()',
            '',
            `        const { data } = await Http.send<${operation.responseType}>(`,
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
        operation: ReturnType<TypeScriptTypeBuilder['buildSdkManifest']>['groups'][number]['operations'][number]
    ): string {
        const args: string[] = []

        if (operation.pathParams.length > 0) {
            args.push(`params: ${operation.paramsType}`)
        }

        if (operation.queryParams.length > 0) {
            args.push(`query: ${operation.queryType}`)
        }

        if (operation.hasBody) {
            args.push(`body${operation.bodyRequired ? '' : '?'}: ${operation.inputType}`)
        }

        if (operation.headerParams.length > 0) {
            args.push(`headers?: ${operation.headerType}`)
        }

        return `(${args.join(', ')})`
    }

    private renderFlatSignature (
        operation: ReturnType<TypeScriptTypeBuilder['buildSdkManifest']>['groups'][number]['operations'][number]
    ): string {
        const args = [
            ...operation.pathParams.map((parameter) => `${parameter.accessor}${parameter.required ? '' : '?'}: ${operation.paramsType}[${JSON.stringify(parameter.name)}]`),
            ...operation.queryParams.map((parameter) => `${parameter.accessor}${parameter.required ? '' : '?'}: ${operation.queryType}[${JSON.stringify(parameter.name)}]`),
            ...(operation.hasBody ? [`body${operation.bodyRequired ? '' : '?'}: ${operation.inputType}`] : []),
            ...operation.headerParams.map((parameter) => `${parameter.accessor}${parameter.required ? '' : '?'}: ${operation.headerType}[${JSON.stringify(parameter.name)}]`),
        ]

        return `(${args.join(', ')})`
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

        return `{ ${operation.headerParams.map((parameter) => `${JSON.stringify(parameter.name)}: ${parameter.accessor}`).join(', ')} }`
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

    private renderIndexFile (classNames: string[], outputMode: 'runtime' | 'classes' | 'both'): string {
        const lines = ["export * from './Schema'"]

        if (outputMode !== 'runtime') {
            lines.push("export * from './Apis/BaseApi'")
            lines.push(...classNames.map((className) => `export * from './Apis/${className}'`))
            lines.push("export * from './Core'")
        }

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