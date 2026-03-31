import type { Element as HappyDomElement } from 'happy-dom'

export interface QueryableNode extends TextNodeLike {
    querySelector (selector: string): HappyDomElement | null
    querySelectorAll (selector: string): Iterable<HappyDomElement>
}

export interface AttributedNode {
    getAttribute (name: string): string | null
}

export interface AttributeQueryNode extends QueryableNode, AttributedNode {
    hasAttribute (name: string): boolean
}

export interface TextNodeLike {
    textContent: string | null
}

export interface ReadmeParameter {
    name: string
    type: string | null
    required: boolean
    defaultValue: string | null
    description: string | null
}

export interface ReadmeResponseSchema {
    statusCode: string | null
    description: string | null
}

export interface ReadmeCodeSnippet {
    label: string | null
    body: string
}

export interface ReadmeNormalizedRequestExample {
    sourceLabel: string | null
    method: string | null
    url: string | null
    headers: Record<string, string>
    bodyFormat: 'json' | 'text' | null
    body: unknown | null
    rawBody: string | null
}

export interface ReadmeResponseBody {
    format: 'json' | 'text'
    contentType: string | null
    statusCode: string | null
    label: string | null
    body: unknown
    rawBody: string
}

export interface ReadmeSidebarLink {
    section: string | null
    label: string
    href: string | null
    method: string | null
    active: boolean
    subpage: boolean
}

export interface ReadmeOperation {
    method: string | null
    url: string | null
    description: string | null
    sidebarLinks: ReadmeSidebarLink[]
    requestParams: ReadmeParameter[]
    requestCodeSnippets: ReadmeCodeSnippet[]
    requestExample: string | null
    requestExampleNormalized: ReadmeNormalizedRequestExample | null
    responseSchemas: ReadmeResponseSchema[]
    responseBodies: ReadmeResponseBody[]
    responseExample: unknown | null
    responseExampleRaw: string | null
}