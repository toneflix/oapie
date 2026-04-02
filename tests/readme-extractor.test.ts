import { describe, expect, it } from 'vitest'
import { extractReadmeOperationFromHtml, normalizeResponseBody } from '../src/ReadmeExtractor'

import { createOpenApiDocumentFromReadmeOperations } from '../src/OpenApiTransform'
import { readFile } from 'node:fs/promises'
import { resolveReadmeSidebarUrls } from '../src/ReadmeCrawler'

describe('normalizeResponseBody', () => {
    it('parses loose JSON response bodies instead of leaving them as strings', () => {
        const rawBody = `{
    "status": true,
    "message": "Successfully fetched transactions",
    "data": [
        {
            "id": "265bg3f2a4e267cc872579ced8c25b39",
            "amount": 4000,
            "currency": "USD",
            "merchant": {
             "name": "Maplerad Technologies Inc.",
              "city": "Delaware",
              "country": "US",
            },
            "created_at": "2022-08-28 18:45:16"
        },
    ],
    "meta": {
        "page": 1,
        "page_size": 1,
        "total": 3
    }
}`

        const normalized = normalizeResponseBody(rawBody, 'application/json')

        expect(normalized.format).toBe('json')
        expect(normalized.body).toEqual({
            status: true,
            message: 'Successfully fetched transactions',
            data: [
                {
                    id: '265bg3f2a4e267cc872579ced8c25b39',
                    amount: 4000,
                    currency: 'USD',
                    merchant: {
                        name: 'Maplerad Technologies Inc.',
                        city: 'Delaware',
                        country: 'US',
                    },
                    created_at: '2022-08-28 18:45:16',
                },
            ],
            meta: {
                page: 1,
                page_size: 1,
                total: 3,
            },
        })
    })

    it('parses JSON response bodies with inline comments', () => {
        const rawBody = `{
  "status": true,
  "message": "successfully",
  "data": {
    "id": "47342baa-9d9c-42fc-9112-56816198539b",
    "payment_rail": ["SWIFT"], // FEDWIRE, SWIFT, null
    "active": false
  }
}`

        const normalized = normalizeResponseBody(rawBody, 'application/json')

        expect(normalized.format).toBe('json')
        expect(normalized.body).toEqual({
            status: true,
            message: 'successfully',
            data: {
                id: '47342baa-9d9c-42fc-9112-56816198539b',
                payment_rail: ['SWIFT'],
                active: false,
            },
        })
    })

    it('parses JSON response bodies with stray tokens before keys', () => {
        const rawBody = `{
  "status": true,
  "message": "Successful",
  "data": { bb
    "reference": "8cdb5a6c-e5c8-494a-b430-47c30ad4988e",
        "account_id": "301977d2-a013-41ad-abe3-809b667e1101",
        "status": "APPROVED",
        "message": [
            "The proof of address submitted does not include the customer's name. Please submit a proof of address with the customer's name, issued within the last 90 days."
        ],
    "currency": "USD",
    "kyc_link": "https://maplerad.com"
  }
}`

        const normalized = normalizeResponseBody(rawBody, 'application/json')

        expect(normalized.format).toBe('json')
        expect(normalized.body).toEqual({
            status: true,
            message: 'Successful',
            data: {
                reference: '8cdb5a6c-e5c8-494a-b430-47c30ad4988e',
                account_id: '301977d2-a013-41ad-abe3-809b667e1101',
                status: 'APPROVED',
                message: [
                    "The proof of address submitted does not include the customer's name. Please submit a proof of address with the customer's name, issued within the last 90 days.",
                ],
                currency: 'USD',
                kyc_link: 'https://maplerad.com',
            },
        })
    })

    it('parses response bodies missing the data array wrapper', () => {
        const rawBody = `{
  "id": "6cff670c-da42-4fad-ba92-e422450caa77",
  "name": "Customer Test"
},
{
  "id": "da24107d-a685-4b60-bc13-7dde10aee274",
  "name": "Customer Test 2"
}
],
"meta": {
  "page": 1,
  "page_size": 10,
  "total": 2
}
}`

        const normalized = normalizeResponseBody(rawBody, 'application/json')

        expect(normalized.format).toBe('json')
        expect(normalized.body).toEqual({
            data: [
                {
                    id: '6cff670c-da42-4fad-ba92-e422450caa77',
                    name: 'Customer Test',
                },
                {
                    id: 'da24107d-a685-4b60-bc13-7dde10aee274',
                    name: 'Customer Test 2',
                },
            ],
            meta: {
                page: 1,
                page_size: 10,
                total: 2,
            },
        })
    })

    it('repairs malformed JSON bodies with stray bareword tokens before object keys', () => {
        const rawBody = `{
  "status": true,
  "message": "Successful",
  "data": { bb
    "reference": "8cdb5a6c-e5c8-494a-b430-47c30ad4988e",
    "account_id": "301977d2-a013-41ad-abe3-809b667e1101",
    "status": "APPROVED",
    "message": [
      "The proof of address submitted does not include the customer's name. Please submit a proof of address with the customer's name, issued within the last 90 days."
    ],
  "currency": "USD",
  "kyc_link": "https://maplerad.com"
  }
}`

        const normalized = normalizeResponseBody(rawBody, 'application/json')

        expect(normalized.format).toBe('json')
        expect(normalized.body).toEqual({
            status: true,
            message: 'Successful',
            data: {
                reference: '8cdb5a6c-e5c8-494a-b430-47c30ad4988e',
                account_id: '301977d2-a013-41ad-abe3-809b667e1101',
                status: 'APPROVED',
                message: [
                    "The proof of address submitted does not include the customer's name. Please submit a proof of address with the customer's name, issued within the last 90 days.",
                ],
                currency: 'USD',
                kyc_link: 'https://maplerad.com',
            },
        })
    })
})

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
                in: 'body',
                path: ['first_name'],
                type: 'string',
                required: true,
                defaultValue: 'John',
                description: null,
            },
            {
                name: 'last_name',
                in: 'body',
                path: ['last_name'],
                type: 'string',
                required: true,
                defaultValue: 'Doe',
                description: null,
            },
            {
                name: 'email',
                in: 'body',
                path: ['email'],
                type: 'string',
                required: true,
                defaultValue: 'johndoe@example.com',
                description: null,
            },
            {
                name: 'country',
                in: 'body',
                path: ['country'],
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

    it('extracts nested body parameter paths', async () => {
        const html = await readFile(new URL('./fixtures/readme-nested-body-example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)

        expect(operation.requestParams).toEqual([
            {
                name: 'first',
                in: 'body',
                path: ['data', 'name', 'first'],
                type: 'string',
                required: true,
                defaultValue: 'Ada',
                description: 'Customer first name.',
            },
            {
                name: 'last',
                in: 'body',
                path: ['data', 'name', 'last'],
                type: 'string',
                required: true,
                defaultValue: 'Lovelace',
                description: 'Customer last name.',
            },
            {
                name: 'email',
                in: 'body',
                path: ['data', 'email'],
                type: 'string',
                required: true,
                defaultValue: 'ada@example.com',
                description: 'Customer email address.',
            },
        ])
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

    it('repairs truncated json response snippets when the response is clearly json-shaped', async () => {
        const html = await readFile(new URL('./fixtures/anchor-example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)

        expect(operation.responseBodies[0]).toEqual(expect.objectContaining({
            format: 'json',
            contentType: null,
            statusCode: '200',
        }))
        expect(operation.responseBodies[0]?.body).toEqual(expect.objectContaining({
            data: expect.objectContaining({
                type: 'IndividualCustomer',
                attributes: expect.objectContaining({
                    fullName: expect.objectContaining({
                        firstName: 'OMOTAYO',
                        lastName: 'BRAHM-OLORUNOJE',
                    }),
                }),
            }),
        }))
    })

    it('repairs dedicated malformed response snippets without relying on Anchor-specific markup', async () => {
        const html = await readFile(new URL('./fixtures/readme-truncated-json-response-example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)
        const document = createOpenApiDocumentFromReadmeOperations([operation], 'Repair API', '1.0.0')

        expect(operation.responseBodies).toEqual([
            {
                format: 'json',
                contentType: null,
                statusCode: '200',
                label: '200 - OK',
                body: {
                    data: {
                        id: 'evt_123',
                        type: 'event',
                        attributes: {
                            status: 'processed',
                        },
                    },
                },
                rawBody: [
                    '{',
                    '  "data": {',
                    '    "id": "evt_123",',
                    '    "type": "event",',
                    '    "attributes": {',
                    '      "status": "processed"',
                ].join('\n'),
            },
        ])
        expect(document.paths['/events']?.get?.responses['200']?.content?.['application/json']?.schema?.properties?.data?.properties?.attributes?.properties?.status?.type).toBe('string')
        expect(document.paths['/events']?.get?.responses['200']?.content?.['text/plain']).toBeUndefined()
    })

    it('falls back to embedded ssr props when the readme dom is sparse', async () => {
        const html = await readFile(new URL('./fixtures/readme-ssr-props-example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)
        const document = createOpenApiDocumentFromReadmeOperations([operation], 'SSR API', '1.0.0')

        expect(operation.method).toBe('POST')
        expect(operation.url).toBe('https://api.example.com/v1/customers')
        expect(operation.description).toBe('Create a customer from embedded page data.')
        expect(operation.requestParams).toEqual([
            {
                name: 'first_name',
                in: 'body',
                path: ['first_name'],
                type: 'string',
                required: true,
                defaultValue: 'Ada',
                description: null,
            },
            {
                name: 'country',
                in: 'body',
                path: ['country'],
                type: 'string',
                required: true,
                defaultValue: 'NG',
                description: 'Customer country.',
            },
        ])
        expect(operation.responseSchemas).toEqual([
            {
                statusCode: '200',
                description: 'Success',
            },
            {
                statusCode: '400',
                description: 'Bad Request',
            },
        ])
        expect(operation.responseBodies[0]).toEqual({
            format: 'json',
            contentType: 'application/json',
            statusCode: '200',
            label: 'Success',
            body: {
                status: true,
                data: {
                    id: 'cus_123',
                },
            },
            rawBody: [
                '{',
                '  "status": true,',
                '  "data": {',
                '    "id": "cus_123"',
                '  }',
                '}',
            ].join('\n'),
        })
        expect(document.paths['/v1/customers']?.post?.requestBody).toEqual({
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            first_name: {
                                type: 'string',
                                default: 'Ada',
                            },
                            country: {
                                type: 'string',
                                description: 'Customer country.',
                                default: 'NG',
                            },
                        },
                        required: ['first_name', 'country'],
                    },
                },
            },
        })
    })

    it('extracts query and header parameters from embedded ssr props', async () => {
        const html = await readFile(new URL('./fixtures/readme-ssr-props-parameters-example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)
        const document = createOpenApiDocumentFromReadmeOperations([operation], 'SSR Params API', '1.0.0')

        expect(operation.method).toBe('GET')
        expect(operation.url).toBe('https://api.example.com/v1/customers')
        expect(operation.requestParams).toEqual([
            {
                name: 'page',
                in: 'query',
                path: ['page'],
                type: 'integer',
                required: false,
                defaultValue: '1',
                description: 'Page number.',
            },
            {
                name: 'X-Trace-Id',
                in: 'header',
                path: ['X-Trace-Id'],
                type: 'string',
                required: false,
                defaultValue: null,
                description: 'Trace identifier.',
            },
        ])
        expect(document.paths['/v1/customers']?.get?.parameters).toEqual([
            {
                name: 'page',
                in: 'query',
                required: false,
                description: 'Page number.',
                schema: {
                    type: 'integer',
                    description: 'Page number.',
                    default: '1',
                },
                example: '1',
            },
            {
                name: 'X-Trace-Id',
                in: 'header',
                required: false,
                description: 'Trace identifier.',
                schema: {
                    type: 'string',
                    description: 'Trace identifier.',
                },
            },
        ])
        expect(document.paths['/v1/customers']?.get?.requestBody).toBeUndefined()
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
                        parameters: undefined,
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
                        parameters: undefined,
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
                        parameters: undefined,
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

    it('builds nested request body schemas from nested body params', async () => {
        const html = await readFile(new URL('./fixtures/readme-nested-body-example.html', import.meta.url), 'utf8')
        const operation = extractReadmeOperationFromHtml(html)
        const document = createOpenApiDocumentFromReadmeOperations([operation], 'Nested API', '1.0.0')

        expect(document.paths['/v1/customers/nested']?.post?.requestBody).toEqual({
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'object',
                                        properties: {
                                            first: {
                                                type: 'string',
                                                description: 'Customer first name.',
                                                default: 'Ada',
                                            },
                                            last: {
                                                type: 'string',
                                                description: 'Customer last name.',
                                                default: 'Lovelace',
                                            },
                                        },
                                        required: ['first', 'last'],
                                    },
                                    email: {
                                        type: 'string',
                                        description: 'Customer email address.',
                                        default: 'ada@example.com',
                                    },
                                },
                                required: ['name', 'email'],
                            },
                        },
                        required: ['data'],
                    },
                },
            },
        })
    })
})