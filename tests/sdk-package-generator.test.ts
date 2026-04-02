import { describe, expect, it } from 'vitest'

import { SdkPackageGenerator } from '../src/generator/SdkPackageGenerator'

describe('SdkPackageGenerator', () => {
    const document = {
        openapi: '3.1.0',
        info: {
            title: 'Test API',
            version: '1.0.0',
        },
        paths: {
            '/app/example': {
                get: {
                    parameters: [
                        { name: 'code', in: 'query', required: true, schema: { type: 'string' } },
                        { name: 'X-Key-1', in: 'header', required: false, schema: { type: 'string' } },
                    ],
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            data: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        id: { type: 'string' },
                                                        code: { type: 'string' },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    parameters: [
                        { name: 'X-Key-1', in: 'header', required: false, schema: { type: 'string' } },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        code: { type: 'string' },
                                    },
                                    required: ['code'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    id: { type: 'string' },
                                                    code: { type: 'string' },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    } as const

    it('generates runtime and class package files from the shared manifest', () => {
        const files = new SdkPackageGenerator().generate(document as never)

        expect(files['src/Schema.ts']).toContain('export const extractedApiDocumentSdk')
        expect(files['src/Apis/BaseApi.ts']).toContain('examples!: Example')
        expect(files['src/Apis/Example.ts']).toContain('async list (query: ExampleAppQuery, headers?: ExampleHeader): Promise<Example[]>')
        expect(files['src/Apis/Example.ts']).toContain('async create (body: ExampleInput, headers?: ExampleHeader): Promise<Example>')
        expect(files['src/Core.ts']).toContain('static override apiClass = BaseApi')
        expect(files['src/index.ts']).toContain('export * from \'./Schema\'')
        expect(files['src/index.ts']).toContain('createSdk')
    })

    it('supports runtime-only and flat signature class generation modes', () => {
        const generator = new SdkPackageGenerator()
        const runtimeFiles = generator.generate(document as never, { outputMode: 'runtime' })
        const classFiles = generator.generate(document as never, { outputMode: 'classes', signatureStyle: 'flat' })

        expect(runtimeFiles['src/Schema.ts']).toContain('OpenApiRuntimeBundle')
        expect(runtimeFiles['src/Core.ts']).toBeUndefined()
        expect(classFiles['src/Apis/Example.ts']).toContain('async list (code: ExampleAppQuery["code"], xKey1?: ExampleHeader["X-Key-1"]): Promise<Example[]>')
        expect(classFiles['src/Apis/Example.ts']).toContain('async create (body: ExampleInput, xKey1?: ExampleHeader["X-Key-1"]): Promise<Example>')
    })

    it('uses scoped class names when nested resources would otherwise collide', () => {
        const files = new SdkPackageGenerator().generate({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {
                '/v1/wallets': {
                    get: {
                        responses: {
                            '200': {
                                description: 'OK',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                data: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        properties: {
                                                            id: { type: 'string' },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '/v1/crypto/wallets/{customer_id}': {
                    get: {
                        parameters: [
                            { name: 'customer_id', in: 'path', required: true, schema: { type: 'string' } },
                        ],
                        responses: {
                            '200': {
                                description: 'OK',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                data: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        properties: {
                                                            id: { type: 'string' },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        } as never)

        expect(files['src/Apis/BaseApi.ts']).toContain('wallets!: Wallet')
        expect(files['src/Apis/BaseApi.ts']).toContain('cryptoWallets!: CryptoWallet')
        expect(files['src/Apis/CryptoWallet.ts']).toContain('export class CryptoWallet')
    })
})