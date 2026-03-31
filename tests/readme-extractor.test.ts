import { describe, expect, it } from 'vitest'

import { createOpenApiDocumentFromReadmeOperations } from '../src/OpenApiTransform'
import { extractReadmeOperationFromHtml } from '../src/ReadmeExtractor'
import { readFile } from 'node:fs/promises'
import { resolveReadmeSidebarUrls } from '../src/ReadmeCrawler'

describe('extractReadmeOperationFromHtml', () => {
    it('extracts the main operation data from a saved ReadMe reference page', async () => {
        const html = await readFile(new URL('./fixtures/example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)

        expect(operation.method).toBe('POST')
        expect(operation.url).toBe('https://api.maplerad.com/v1/customers')
        expect(operation.description).toBe('This resource enables the creation of a new customer. A customer ID is returned which can be used for further actions within the Maplerad ecosystem.')
        expect(operation.sidebarLinks.length).toBeGreaterThan(50)
        expect(operation.sidebarLinks).toEqual(expect.arrayContaining([
            {
                section: 'Customers',
                label: 'Create a Customer (Tier 0)',
                href: '/reference/create-a-customer',
                method: 'POST',
                active: true,
                subpage: false,
            },
            {
                section: 'Banking',
                label: 'Mobile Money',
                href: '/reference/mobile-money',
                method: 'POST',
                active: false,
                subpage: false,
            },
            {
                section: 'Banking',
                label: 'Verify OTP',
                href: '/reference/verify-otp',
                method: 'POST',
                active: false,
                subpage: true,
            },
            {
                section: 'Issuing',
                label: 'Getting Started',
                href: '/reference/getting-started-with-issuing',
                method: null,
                active: false,
                subpage: false,
            },
        ]))

        expect(operation.requestParams).toEqual([
            {
                name: 'first_name',
                type: 'string',
                required: true,
                defaultValue: 'John',
                description: null,
            },
            {
                name: 'last_name',
                type: 'string',
                required: true,
                defaultValue: 'Doe',
                description: null,
            },
            {
                name: 'email',
                type: 'string',
                required: true,
                defaultValue: 'johndoe@example.com',
                description: null,
            },
            {
                name: 'country',
                type: 'string',
                required: true,
                defaultValue: 'NG',
                description: 'The country of origin of the customer.',
            },
        ])
        expect(operation.requestCodeSnippets).toEqual([
            {
                label: 'cURL Request',
                body: [
                    'curl --request POST \\',
                    '     --url https://api.maplerad.com/v1/customers \\',
                    '     --header \'accept: application/json\' \\',
                    '     --header \'content-type: application/json\' \\',
                    '     --data \'',
                    '{',
                    '  "first_name": "John",',
                    '  "last_name": "Doe",',
                    '  "email": "johndoe@example.com",',
                    '  "country": "NG"',
                    '}',
                    '\'',
                ].join('\n'),
            },
        ])
        expect(operation.requestExample).toBe(operation.requestCodeSnippets[0]?.body ?? null)
        expect(operation.requestExampleNormalized).toEqual({
            sourceLabel: 'cURL Request',
            method: 'POST',
            url: 'https://api.maplerad.com/v1/customers',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            bodyFormat: 'json',
            body: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@example.com',
                country: 'NG',
            },
            rawBody: [
                '{',
                '  "first_name": "John",',
                '  "last_name": "Doe",',
                '  "email": "johndoe@example.com",',
                '  "country": "NG"',
                '}',
            ].join('\n'),
        })

        expect(operation.responseSchemas).toEqual([
            {
                statusCode: '200',
                description: '200',
            },
            {
                statusCode: '400',
                description: '400',
            },
        ])
        expect(operation.responseBodies).toEqual([])
        expect(operation.responseExample).toBeNull()
        expect(operation.responseExampleRaw).toBeNull()
    })

    it('extracts populated request and response playground examples', async () => {
        const html = await readFile(new URL('./fixtures/readme-response-example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)

        expect(operation.requestCodeSnippets).toEqual([
            {
                label: 'JavaScript Request',
                body: [
                    'await fetch("https://api.example.com/customers", {',
                    '  method: "GET"',
                    '  headers: {',
                    '    "accept": "application/json"',
                    '  },',
                    '  body: JSON.stringify({',
                    '    "limit": 20',
                    '  })',
                    '})',
                ].join('\n'),
            },
        ])
        expect(operation.requestExample).toBe(operation.requestCodeSnippets[0]?.body ?? null)
        expect(operation.requestExampleNormalized).toEqual({
            sourceLabel: 'JavaScript Request',
            method: 'GET',
            url: 'https://api.example.com/customers',
            headers: {
                accept: 'application/json',
            },
            bodyFormat: 'json',
            body: {
                limit: 20,
            },
            rawBody: '{\n    "limit": 20\n  }',
        })
        expect(operation.responseBodies).toEqual([
            {
                format: 'json',
                contentType: 'application/json',
                statusCode: '200',
                label: '200 - Result',
                body: {
                    data: {
                        id: 'cus_123',
                    },
                },
                rawBody: [
                    '{',
                    '  "data": {',
                    '    "id": "cus_123"',
                    '  }',
                    '}',
                ].join('\n'),
            },
        ])
        expect(operation.responseExample).toEqual(operation.responseBodies[0]?.body ?? null)
        expect(operation.responseExampleRaw).toBe(operation.responseBodies[0]?.rawBody ?? null)
    })

    it('normalizes fetch examples that use single quotes and inline object bodies', async () => {
        const html = await readFile(new URL('./fixtures/readme-fetch-object-body-example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)

        expect(operation.requestExampleNormalized).toEqual({
            sourceLabel: 'JavaScript Request',
            method: 'POST',
            url: 'https://api.example.com/customers/search',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            bodyFormat: 'json',
            body: {
                query: 'ada',
                include_inactive: false,
                limit: 10,
            },
            rawBody: [
                '{',
                '    query: \'ada\',',
                '    include_inactive: false,',
                '    limit: 10,',
                '  }',
            ].join('\n'),
        })
    })

    it('keeps plain-text responses as text bodies', async () => {
        const html = await readFile(new URL('./fixtures/readme-text-response-example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)

        expect(operation.responseBodies).toEqual([
            {
                format: 'text',
                contentType: 'text/plain',
                statusCode: '202',
                label: '202 - Accepted',
                body: 'Accepted for processing',
                rawBody: 'Accepted for processing',
            },
        ])
        expect(operation.responseExample).toBe('Accepted for processing')
        expect(operation.responseExampleRaw).toBe('Accepted for processing')
    })

    it('aligns multiple response examples with their matching status labels', async () => {
        const html = await readFile(new URL('./fixtures/readme-multi-response-example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)

        expect(operation.responseSchemas).toEqual([
            {
                statusCode: '200',
                description: 'Successful response',
            },
            {
                statusCode: '400',
                description: 'Validation error',
            },
        ])
        expect(operation.responseBodies).toEqual([
            {
                format: 'json',
                contentType: 'application/json',
                statusCode: '200',
                label: '200 - Result',
                body: {
                    data: {
                        id: 'cus_ok',
                    },
                },
                rawBody: [
                    '{',
                    '  "data": {',
                    '    "id": "cus_ok"',
                    '  }',
                    '}',
                ].join('\n'),
            },
            {
                format: 'json',
                contentType: 'application/json',
                statusCode: '400',
                label: '400 - Validation Error',
                body: {
                    error: {
                        message: 'Invalid customer id',
                    },
                },
                rawBody: [
                    '{',
                    '  "error": {',
                    '    "message": "Invalid customer id"',
                    '  }',
                    '}',
                ].join('\n'),
            },
        ])
    })

    it('resolves absolute crawl URLs from sidebar hrefs', async () => {
        const html = await readFile(new URL('./fixtures/readme-response-example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)

        expect(resolveReadmeSidebarUrls(operation, 'https://docs.example.com/reference/get-customers')).toEqual([
            'https://docs.example.com/reference/get-customers',
        ])
    })

    it('transforms extracted operations into an OpenAPI-like document', async () => {
        const html = await readFile(new URL('./fixtures/example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)
        const document = createOpenApiDocumentFromReadmeOperations([operation], 'Maplerad', '1.0.0')

        expect(document).toEqual({
            openapi: '3.1.0',
            info: {
                title: 'Maplerad',
                version: '1.0.0',
            },
            paths: {
                '/v1/customers': {
                    post: {
                        summary: 'Create a Customer (Tier 0)',
                        description: 'This resource enables the creation of a new customer. A customer ID is returned which can be used for further actions within the Maplerad ecosystem.',
                        operationId: 'postV1Customers',
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            first_name: {
                                                type: 'string',
                                                default: 'John',
                                            },
                                            last_name: {
                                                type: 'string',
                                                default: 'Doe',
                                            },
                                            email: {
                                                type: 'string',
                                                default: 'johndoe@example.com',
                                            },
                                            country: {
                                                type: 'string',
                                                description: 'The country of origin of the customer.',
                                                default: 'NG',
                                            },
                                        },
                                        required: ['first_name', 'last_name', 'email', 'country'],
                                        example: {
                                            first_name: 'John',
                                            last_name: 'Doe',
                                            email: 'johndoe@example.com',
                                            country: 'NG',
                                        },
                                    },
                                    example: {
                                        first_name: 'John',
                                        last_name: 'Doe',
                                        email: 'johndoe@example.com',
                                        country: 'NG',
                                    },
                                },
                            },
                        },
                        responses: {
                            '200': {
                                description: '200',
                            },
                            '400': {
                                description: '400',
                            },
                        },
                    },
                },
            },
        })
    })

    it('builds one OpenAPI-like document from multiple extracted operations', async () => {
        const customerHtml = await readFile(new URL('./fixtures/example.html', import.meta.url), 'utf8')
        const textHtml = await readFile(new URL('./fixtures/readme-text-response-example.html', import.meta.url), 'utf8')
        const document = createOpenApiDocumentFromReadmeOperations([
            extractReadmeOperationFromHtml(customerHtml),
            extractReadmeOperationFromHtml(textHtml),
        ], 'Combined API', '2.0.0')

        expect(document).toEqual({
            openapi: '3.1.0',
            info: {
                title: 'Combined API',
                version: '2.0.0',
            },
            paths: {
                '/v1/customers': {
                    post: {
                        summary: 'Create a Customer (Tier 0)',
                        description: 'This resource enables the creation of a new customer. A customer ID is returned which can be used for further actions within the Maplerad ecosystem.',
                        operationId: 'postV1Customers',
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            first_name: {
                                                type: 'string',
                                                default: 'John',
                                            },
                                            last_name: {
                                                type: 'string',
                                                default: 'Doe',
                                            },
                                            email: {
                                                type: 'string',
                                                default: 'johndoe@example.com',
                                            },
                                            country: {
                                                type: 'string',
                                                description: 'The country of origin of the customer.',
                                                default: 'NG',
                                            },
                                        },
                                        required: ['first_name', 'last_name', 'email', 'country'],
                                        example: {
                                            first_name: 'John',
                                            last_name: 'Doe',
                                            email: 'johndoe@example.com',
                                            country: 'NG',
                                        },
                                    },
                                    example: {
                                        first_name: 'John',
                                        last_name: 'Doe',
                                        email: 'johndoe@example.com',
                                        country: 'NG',
                                    },
                                },
                            },
                        },
                        responses: {
                            '200': {
                                description: '200',
                            },
                            '400': {
                                description: '400',
                            },
                        },
                    },
                },
                '/jobs': {
                    post: {
                        summary: undefined,
                        description: 'Queue a background job.',
                        operationId: 'postJobs',
                        requestBody: undefined,
                        responses: {
                            '202': {
                                description: '202 - Accepted',
                                content: {
                                    'text/plain': {
                                        schema: {
                                            type: 'string',
                                            example: 'Accepted for processing',
                                        },
                                        example: 'Accepted for processing',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
    })
})