import { describe, expect, it } from 'vitest'

import { generateTypeScriptModule } from '../src/generator/TypeScriptGenerator'

describe('generateTypeScriptModule', () => {
    it('reuses semantic interfaces across OpenAPI paths when shapes match', () => {
        const content = generateTypeScriptModule({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {
                '/v1/issuing/business': {
                    get: {
                        parameters: [
                            { name: 'page', in: 'query', required: false, schema: { type: 'integer' } },
                            { name: 'X-Trace-Id', in: 'header', required: false, schema: { type: 'string' } },
                            { name: 'business_id', in: 'path', required: true, schema: { type: 'string' } },
                        ],
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            name: { type: 'string' },
                                            address: {
                                                type: 'object',
                                                properties: {
                                                    city: { type: 'string' },
                                                    street2: { type: 'string' },
                                                },
                                                required: ['city'],
                                            },
                                        },
                                        required: ['name', 'address'],
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
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        properties: {
                                                            id: { type: 'string' },
                                                            name: { type: 'string' },
                                                            address: {
                                                                type: 'object',
                                                                properties: {
                                                                    city: { type: 'string' },
                                                                },
                                                                required: ['city'],
                                                            },
                                                        },
                                                        required: ['id', 'name', 'address'],
                                                    },
                                                },
                                            },
                                            required: ['data'],
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '/v1/merchant': {
                    get: {
                        parameters: [
                            { name: 'page', in: 'query', required: false, schema: { type: 'integer' } },
                            { name: 'X-Trace-Id', in: 'header', required: false, schema: { type: 'string' } },
                            { name: 'merchant_id', in: 'path', required: true, schema: { type: 'string' } },
                        ],
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            name: { type: 'string' },
                                            address: {
                                                type: 'object',
                                                properties: {
                                                    city: { type: 'string' },
                                                },
                                                required: ['city'],
                                            },
                                        },
                                        required: ['name', 'address'],
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
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        properties: {
                                                            id: { type: 'string' },
                                                            name: { type: 'string' },
                                                            address: {
                                                                type: 'object',
                                                                properties: {
                                                                    city: { type: 'string' },
                                                                },
                                                                required: ['city'],
                                                            },
                                                        },
                                                        required: ['id', 'name', 'address'],
                                                    },
                                                },
                                            },
                                            required: ['data'],
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        } as never, 'ExtractedApiDocument')

        expect(content).toContain('export interface Business')
        expect(content).toContain('export interface BusinessInput')
        expect(content).toContain('export interface BusinessQuery')
        expect(content).toContain('export interface BusinessHeader')
        expect(content).toContain('export interface BusinessParams')
        expect(content).toContain('export interface Merchant extends Business {}')
        expect(content).toContain('export interface MerchantQuery extends BusinessQuery {}')
        expect(content).toContain('export interface MerchantHeader extends BusinessHeader {}')
        expect(content).not.toContain('export interface BusinessHeader extends BusinessQuery {}')
        expect(content).toContain('export interface Address')
        expect(content).not.toContain('export interface AddressAddress')
        expect(content).not.toContain('export interface Data2')
    })

    it('reuses nested interfaces when differences are only nullable fields', () => {
        const content = generateTypeScriptModule({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {
                '/v1/customers/{id}': {
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
                                                    type: 'object',
                                                    properties: {
                                                        address: {
                                                            type: 'object',
                                                            properties: {
                                                                city: { type: 'string' },
                                                                street2: { type: 'string' },
                                                            },
                                                            required: ['city'],
                                                        },
                                                        identity: {
                                                            type: 'object',
                                                            properties: {
                                                                image: { type: 'string' },
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
                '/v1/customers/upgrade-tier-2': {
                    post: {
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            address: {
                                                type: 'object',
                                                properties: {
                                                    city: { type: 'string' },
                                                    street2: { example: null },
                                                },
                                                required: ['city'],
                                            },
                                            identity: {
                                                type: 'object',
                                                properties: {
                                                    image: { example: null },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        responses: {},
                    },
                },
            },
        } as never, 'ExtractedApiDocument')

        expect(content).toContain('export interface Address')
        expect(content).toContain('street2?: string | null')
        expect(content).toContain('export interface Identity')
        expect(content).toContain('image?: string | null')
        expect(content).not.toContain('export interface AddressAddress')
        expect(content).not.toContain('export interface IdentityIdentity')
    })
})