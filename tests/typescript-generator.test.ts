import { describe, expect, it } from 'vitest'

import { TypeScriptGenerator } from '../src/generator/TypeScriptGenerator'

describe('generateTypeScriptModule', () => {
    it('reuses semantic interfaces across OpenAPI paths when shapes match', () => {
        const content = TypeScriptGenerator.generateModule({
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
        expect(content).toContain('export interface Paths')
        expect(content).toContain('\'/v1/issuing/business\': IssuingBusinessPath')
        expect(content).toContain('export interface IssuingBusinessPathGetOperation extends OpenApiOperationDefinition<Business, BusinessResponseExample, BusinessInput, BusinessQuery, BusinessHeader, BusinessParams> {}')
        expect(content).not.toContain('export interface AddressAddress')
        expect(content).not.toContain('export interface Data2')
    })

    it('reuses nested interfaces when differences are only nullable fields', () => {
        const content = TypeScriptGenerator.generateModule({
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

    it('uses contextual resource names and by-param suffixes for collisions', () => {
        const content = TypeScriptGenerator.generateModule({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {
                '/v1/customers': {
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
                    post: {
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            first_name: { type: 'string' },
                                        },
                                        required: ['first_name'],
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
                '/v1/customers/{id}': {
                    get: {
                        parameters: [
                            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                        ],
                        requestBody: {
                            required: false,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            note: { type: 'string' },
                                        },
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
                                                        first_name: { type: 'string' },
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
                '/v1/wallet/{currency_code}/history': {
                    get: {
                        parameters: [
                            { name: 'currency_code', in: 'path', required: true, schema: { type: 'string' } },
                            { name: 'page', in: 'query', required: false, schema: { type: 'integer' } },
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
                                                            amount: { type: 'number' },
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
                                                            chain: { type: 'string' },
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
                                                            currency: { type: 'string' },
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
        } as never, 'ExtractedApiDocument')

        expect(content).toContain('export interface Customer')
        expect(content).toContain('export interface CustomerById')
        expect(content).toContain('export interface CustomerListInput')
        expect(content).toContain('export interface CustomerByIdParams')
        expect(content).toContain('export interface WalletHistory')
        expect(content).toContain('export interface WalletHistoryQuery')
        expect(content).toContain('export interface Wallet')
        expect(content).not.toContain('CustomerGetCustomer')
        expect(content).not.toContain('HistoryQueryGetHistory')
        expect(content).not.toContain('WalletGetWallet')
    })

    it('unwraps response payloads nested inside meta.data', () => {
        const content = TypeScriptGenerator.generateModule({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {
                '/v1/customers/profile': {
                    get: {
                        responses: {
                            '200': {
                                description: 'OK',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                meta: {
                                                    type: 'object',
                                                    properties: {
                                                        data: {
                                                            type: 'object',
                                                            properties: {
                                                                id: { type: 'string' },
                                                                email: { type: 'string' },
                                                            },
                                                            required: ['id', 'email'],
                                                        },
                                                    },
                                                    required: ['data'],
                                                },
                                            },
                                            required: ['meta'],
                                        },
                                        example: {
                                            meta: {
                                                data: {
                                                    id: 'cus_123',
                                                    email: 'user@example.com',
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
        } as never, 'ExtractedApiDocument')

        expect(content).toContain('export interface Profile')
        expect(content).toContain('id: string')
        expect(content).toContain('email: string')
        expect(content).not.toContain('export interface Profile {\n  meta?:')
    })

    it('infers property types from parent object examples when property schemas are underspecified', () => {
        const content = TypeScriptGenerator.generateModule({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {
                '/v1/cable': {
                    post: {
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            addons: {},
                                            enabled: {},
                                        },
                                        example: {
                                            addons: ['sports'],
                                            enabled: true,
                                        },
                                    },
                                },
                            },
                        },
                        responses: {
                            '200': {
                                description: 'OK',
                            },
                        },
                    },
                },
            },
        } as never, 'ExtractedApiDocument')

        expect(content).toContain('addons?: string[]')
        expect(content).toContain('enabled?: boolean')
        expect(content).not.toContain('addons?: unknown[]')
        expect(content).not.toContain('enabled?: unknown')
    })

    it('does not type full response examples as the unwrapped payload type', () => {
        const content = TypeScriptGenerator.generateModule({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {
                '/v1/issuing/{id}': {
                    get: {
                        responses: {
                            '200': {
                                description: 'OK',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                status: { type: 'boolean' },
                                                message: { type: 'string' },
                                                data: {
                                                    type: 'object',
                                                    properties: {
                                                        id: { type: 'string' },
                                                    },
                                                    required: ['id'],
                                                },
                                            },
                                            required: ['data'],
                                        },
                                        example: {
                                            status: true,
                                            message: 'Successfully fetched card',
                                            data: {
                                                id: 'card_123',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        } as never, 'ExtractedApiDocument')

        expect(content).toContain('export interface OpenApiResponseDefinition<_TResponse = unknown, TExample = unknown> {')
        expect(content).toContain('content?: Record<string, OpenApiMediaTypeDefinition<TExample>>')
        expect(content).toContain('responses: Record<string, OpenApiResponseDefinition<_TResponse, TResponseExample>>')
    })

    it('generates typed response envelope examples per operation', () => {
        const content = TypeScriptGenerator.generateModule({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {
                '/v1/issuing/{id}': {
                    get: {
                        responses: {
                            '200': {
                                description: 'OK',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                status: { type: 'boolean' },
                                                message: { type: 'string' },
                                                data: {
                                                    type: 'object',
                                                    properties: {
                                                        id: { type: 'string' },
                                                    },
                                                    required: ['id'],
                                                },
                                            },
                                            required: ['status', 'message', 'data'],
                                        },
                                        example: {
                                            status: true,
                                            message: 'ok',
                                            data: { id: 'card_123' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        } as never, 'ExtractedApiDocument')

        expect(content).toContain('export interface IssuingResponseExample')
        expect(content).toContain('status: boolean')
        expect(content).toContain('message: string')
        expect(content).toContain('data: Data')
        expect(content).toContain('export interface IssuingByIdPathGetOperation extends OpenApiOperationDefinition<Issuing, IssuingResponseExample, IssuingInput, IssuingQuery, IssuingHeader, IssuingParams> {}')
    })

    it('uses stable variant names for response-example unions', () => {
        const content = TypeScriptGenerator.generateModule({
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
                                        example: {
                                            status: true,
                                            data: {
                                                id: 'cus_123',
                                            },
                                        },
                                    },
                                },
                            },
                            '202': {
                                description: 'Accepted',
                                content: {
                                    'application/json': {
                                        example: {
                                            status: true,
                                            data: {
                                                id: 'cus_123',
                                                review: {
                                                    state: 'pending',
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
        } as never, 'ExtractedApiDocument')

        expect(content).toContain('export type CustomerResponseExample = CustomerResponseExampleVariant1 | CustomerResponseExampleVariant2')
        expect(content).toContain('export interface CustomerResponseExampleVariant1')
        expect(content).toContain('export interface CustomerResponseExampleVariant2')
        expect(content).not.toContain('CustomerResponseExampleCustomerResponseExample')
        expect(content).not.toContain('CustomerResponseExampleVariant1 | CustomerResponseExampleVariant1')
    })

    it('emits an SDK manifest and typed runtime bundle helpers', () => {
        const content = TypeScriptGenerator.generateModule({
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
        } as never, 'ExtractedApiDocument')

        expect(content).toContain('export interface OpenApiSdkManifest')
        expect(content).toContain('export interface ExtractedApiDocumentApi')
        expect(content).toContain('exampleApps: {')
        expect(content).toContain('list(query: ExampleAppQuery, headers?: ExampleHeader): Promise<Example[]>')
        expect(content).toContain('create(body: ExampleInput, headers?: ExampleHeader): Promise<Example>')
        expect(content).toContain('export const extractedApiDocumentManifest = {')
        expect(content).toContain("methodName: 'list'")
        expect(content).toContain("className: 'ExampleApp'")
        expect(content).toContain("propertyName: 'exampleApps'")
        expect(content).toContain('export const extractedApiDocumentSdk: OpenApiRuntimeBundle<ExtractedApiDocumentApi> = {')
    })

    it('coerces scalar example values to match declared schema types', () => {
        const content = TypeScriptGenerator.generateModule({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {
                '/app/example': {
                    post: {
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            amount: { type: 'string' },
                                        },
                                        example: {
                                            amount: 10000,
                                        },
                                        required: ['amount'],
                                    },
                                    example: {
                                        amount: 10000,
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
        } as never, 'ExtractedApiDocument')

        expect(content).toContain("amount: '10000'")
        expect(content).not.toContain("amount: 10000")
    })

    it('omits schema examples that are missing required properties', () => {
        const content = TypeScriptGenerator.generateModule({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {
                '/app/example': {
                    post: {
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            amount: { type: 'string' },
                                            customer_id: { type: 'string' },
                                        },
                                        example: {
                                            amount: 10000,
                                        },
                                        required: ['amount', 'customer_id'],
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
        } as never, 'ExtractedApiDocument')

        expect(content).not.toContain("example: {\n                  amount: 10000")
        expect(content).not.toContain("example: {\n                  amount: '10000'")
    })

    it('prefixes unused OpenAPI helper generic parameters to satisfy lint rules', () => {
        const content = TypeScriptGenerator.generateModule({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {},
        } as never, 'ExtractedApiDocument')

        expect(content).toContain('export interface OpenApiResponseDefinition<_TResponse = unknown, TExample = unknown>')
        expect(content).toContain('export interface OpenApiOperationDefinition<_TResponse = unknown, TResponseExample = unknown, TInput = Record<string, never>, _TQuery = Record<string, never>, _THeader = Record<string, never>, _TParams = Record<string, never>>')
    })

    it('uses descriptive scoped manifest group names when a nested resource would otherwise collide', () => {
        const content = TypeScriptGenerator.generateModule({
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
        } as never, 'ExtractedApiDocument')

        expect(content).toContain("className: 'Wallet'")
        expect(content).toContain("propertyName: 'wallets'")
        expect(content).toContain("className: 'CryptoWallet'")
        expect(content).toContain("propertyName: 'cryptoWallets'")
        expect(content).toContain('cryptoWallets: {')
    })

    it('supports configurable namespace and method naming strategies in the SDK manifest', () => {
        const content = TypeScriptGenerator.generateModule({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {
                '/v1/crypto/wallets/{customer_id}': {
                    get: {
                        operationId: 'getCustomerCryptoWallets',
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
        } as never, 'ExtractedApiDocument', {
            namespaceStrategy: 'scoped',
            methodStrategy: 'operation-id',
        })

        expect(content).toContain("className: 'CryptoWallet'")
        expect(content).toContain("propertyName: 'cryptoWallets'")
        expect(content).toContain("methodName: 'getCustomerCryptoWallets'")
        expect(content).toContain('getCustomerCryptoWallets(params: WalletParams): Promise<Wallet[]>')
    })

    it('escapes multiline string examples in emitted TS literals', () => {
        const content = TypeScriptGenerator.generateModule({
            openapi: '3.1.0',
            info: {
                title: 'Test API',
                version: '1.0.0',
            },
            paths: {
                '/v1/instructions': {
                    get: {
                        responses: {
                            '200': {
                                description: 'OK',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                details: {
                                                    type: 'string',
                                                    example: '1/ Open the app\n---\n2/ Enter your code',
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
        } as never, 'ExtractedApiDocument')

        expect(content).toContain("example: '1/ Open the app\\n---\\n2/ Enter your code'")
    })
})