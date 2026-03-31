import { AttributeQueryNode, AttributedNode, QueryableNode, ReadmeCodeSnippet, ReadmeOperation, ReadmeParameter, ReadmeResponseBody, ReadmeResponseSchema, ReadmeSidebarLink, TextNodeLike } from './types/base'

import type { Element as HappyDomElement } from 'happy-dom'
import { Window } from 'happy-dom'

export const extractReadmeOperationFromHtml = (html: string): ReadmeOperation => {
    const window = new Window()

    window.document.write(html)

    const { document } = window
    const contentRoot = document.querySelector('article#content') ?? document.body
    const requestParamsForm = contentRoot.querySelector('form[name="Parameters"]')
    const requestPlayground = document.querySelector('.rm-PlaygroundRequest')
    const responsePlayground = document.querySelector('.rm-PlaygroundResponse')
    const requestCodeSnippets = extractRequestCodeSnippets(requestPlayground)
    const requestExampleNormalized = normalizeRequestCodeSnippet(requestCodeSnippets[0] ?? null)
    const responseBodies = extractResponseBodies(responsePlayground)

    return {
        method: readText(contentRoot.querySelector('[data-testid="http-method"]'))?.toUpperCase() ?? null,
        url: readText(contentRoot.querySelector('[data-testid="serverurl"]')),
        description: extractOperationDescription(contentRoot),
        sidebarLinks: extractSidebarLinks(document.querySelector('.rm-Sidebar.hub-sidebar-content')),
        requestParams: extractRequestParams(requestParamsForm),
        requestCodeSnippets,
        requestExample: requestCodeSnippets[0]?.body ?? null,
        requestExampleNormalized,
        responseSchemas: extractResponseSchemas(contentRoot),
        responseBodies,
        responseExample: responseBodies[0]?.body ?? null,
        responseExampleRaw: responseBodies[0]?.rawBody ?? null,
    }
}

const extractOperationDescription = (root: QueryableNode): string | null => {
    const header = root.querySelector('header')

    if (!header) {
        return null
    }

    const markdownBlocks = Array.from(header.querySelectorAll('[data-testid="RDMD"]'))

    return readText(markdownBlocks[markdownBlocks.length - 1] ?? null)
}

const extractRequestCodeSnippets = (root: QueryableNode | null): ReadmeCodeSnippet[] => {
    if (!root) {
        return []
    }

    const label = extractRequestSnippetLabel(root)

    return extractCodeSnippets(root).map((body) => ({
        label,
        body,
    }))
}

const extractResponseBodies = (root: QueryableNode | null): ReadmeResponseBody[] => {
    if (!root) {
        return []
    }

    const bodies = extractCodeSnippets(root)
    const contentTypes = extractResponseContentTypes(root)
    const labels = extractResponseLabels(root)

    return bodies.map((body, index) => {
        const label = labels[index] ?? labels[0] ?? null
        const contentType = contentTypes[index] ?? contentTypes[0] ?? null
        const normalized = normalizeResponseBody(body, contentType)

        return {
            format: normalized.format,
            contentType,
            statusCode: label?.match(/\b\d{3}\b/)?.[0] ?? null,
            label,
            body: normalized.body,
            rawBody: body,
        }
    })
}

const extractSidebarLinks = (root: QueryableNode | null): ReadmeSidebarLink[] => {
    if (!root) {
        return []
    }

    return Array.from(root.querySelectorAll('.rm-Sidebar-link')).map((link) => {
        const section = link.closest('.rm-Sidebar-section')
        const method = readText(link.querySelector('[data-testid="http-method"]'))?.toUpperCase() ?? null

        return {
            section: readText(section?.querySelector('.rm-Sidebar-heading') ?? null),
            label: extractSidebarLinkLabel(link, method),
            href: link.getAttribute('href'),
            method,
            active: link.classList.contains('active') || link.getAttribute('aria-current') === 'page',
            subpage: link.classList.contains('subpage'),
        }
    }).filter((link) => link.label.length > 0)
}

const extractRequestParams = (root: QueryableNode | null): ReadmeParameter[] => {
    if (!root) {
        return []
    }

    return Array.from(root.querySelectorAll('label')).map((label) => {
        const name = readText(label)
        const param = findParameterRoot(label, root)
        const input = resolveParameterInput(param, label)

        return {
            name: name ?? '',
            in: inferParameterLocation(param, label, root),
            type: inferParameterType(param, input),
            required: isRequiredParameter(param, input),
            defaultValue: readInputValue(input),
            description: extractParameterDescription(param),
        }
    }).filter((param) => param.name.length > 0)
}

const extractResponseSchemas = (root: QueryableNode): ReadmeResponseSchema[] => {
    const section = root.querySelector('#response-schemas')
    const picker = section?.nextElementSibling

    if (!picker || !picker.classList.contains('rm-APIResponseSchemaPicker')) {
        return []
    }

    return Array.from(picker.querySelectorAll('button')).map((option) => {
        const optionText = readText(option)
        const statusCodeMatch = optionText?.match(/\b\d{3}\b/)
        const markdownBlocks = Array.from(option.querySelectorAll('[data-testid="RDMD"]'))

        return {
            statusCode: statusCodeMatch?.[0] ?? null,
            description: readText(markdownBlocks[0] ?? null) ?? optionText,
        }
    }).filter((schema) => schema.statusCode !== null)
}

const extractCodeSnippets = (root: QueryableNode): string[] => {
    return Array.from(root.querySelectorAll('.CodeSnippet'))
        .map((snippet) => extractCodeMirrorText(snippet))
        .filter((snippet): snippet is string => Boolean(snippet))
}

const extractCodeMirrorText = (root: QueryableNode | null): string | null => {
    if (!root) {
        return null
    }

    const codeMirrorLines = Array.from(root.querySelectorAll('.CodeMirror-code pre.CodeMirror-line'))

    if (codeMirrorLines.length === 0) {
        return null
    }

    return codeMirrorLines
        .map((line) => line.textContent?.replace(/\u00a0/g, ' ') ?? '')
        .join('\n')
        .trimEnd() || null
}

const extractRequestSnippetLabel = (root: QueryableNode): string | null => {
    const header = root.querySelector('header')

    if (!header) {
        return null
    }

    const buttonTexts = Array.from(header.querySelectorAll('button'))
        .map((button) => extractButtonText(button))
        .filter((text): text is string => Boolean(text))

    return buttonTexts.find((text) => text.toLowerCase() !== 'examples') ?? buttonTexts[0] ?? null
}

const readInputValue = (element: AttributedNode | null): string | null => {
    if (!element) {
        return null
    }

    return element.getAttribute('value')?.trim() || null
}

const extractSidebarLinkLabel = (link: QueryableNode, method: string | null): string => {
    const candidates = readTexts(link.querySelectorAll('span'))
        .filter((text) => !method || text.toUpperCase() !== method)
        .sort((left, right) => right.length - left.length)

    return candidates[0] ?? readText(link) ?? ''
}

const extractResponseContentTypes = (root: QueryableNode): string[] => {
    const texts = readTexts(root.querySelectorAll('div'))

    return texts.filter((text) => /^[\w.+-]+\/[\w.+-]+$/i.test(text))
}

const extractResponseLabels = (root: QueryableNode): string[] => {
    const statusElements = Array.from(root.querySelectorAll('button, [role="button"]'))
        .map((element) => extractButtonText(element))
        .filter((text): text is string => Boolean(text))

    return statusElements.filter((text) => /\b\d{3}\b/.test(text))
}

const findParameterRoot = (
    label: HappyDomElement,
    root: QueryableNode
): HappyDomElement => {
    const fieldId = label.getAttribute('for')
    let current: HappyDomElement | null = label

    while (current) {
        const fieldInput = fieldId ? current.querySelector(`#${escapeSelector(fieldId)}`) : null
        const fallbackInput = current.querySelector('input, textarea, select')

        if ((fieldInput || fallbackInput) && current !== root) {
            return current
        }

        current = current.parentElement
    }

    return label
}

const resolveParameterInput = (
    param: QueryableNode,
    label: AttributedNode
): AttributeQueryNode | null => {
    const fieldId = label.getAttribute('for')
    const byId = fieldId ? param.querySelector(`#${escapeSelector(fieldId)}`) : null
    const fallback = param.querySelector('input, textarea, select')

    return (byId ?? fallback) as AttributeQueryNode | null
}

const inferParameterLocation = (
    param: HappyDomElement,
    label: AttributedNode,
    root: QueryableNode
): ReadmeParameter['in'] => {
    const fieldId = label.getAttribute('for')?.toLowerCase() ?? ''
    const parentFieldsetId = param.closest('[id]')?.getAttribute('id')?.toLowerCase() ?? ''
    const locationFromId = inferParameterLocationFromText(`${fieldId} ${parentFieldsetId}`)

    if (locationFromId) {
        return locationFromId
    }

    let current: HappyDomElement | null = param

    while (current && current !== root) {
        let sibling: HappyDomElement | null = current.previousElementSibling

        while (sibling) {
            if (sibling.tagName === 'HEADER') {
                const locationFromHeader = inferParameterLocationFromText(readText(sibling) ?? '')

                if (locationFromHeader) {
                    return locationFromHeader
                }
            }

            sibling = sibling.previousElementSibling
        }

        current = current.parentElement
    }

    return null
}

const inferParameterLocationFromText = (value: string): ReadmeParameter['in'] => {
    const normalized = value.trim().toLowerCase()

    if (normalized.includes('query params') || normalized.includes('query-')) {
        return 'query'
    }

    if (normalized.includes('headers') || normalized.includes('header-')) {
        return 'header'
    }

    if (normalized.includes('body params') || normalized.includes('request body') || normalized.includes('body-')) {
        return 'body'
    }

    if (normalized.includes('path params') || normalized.includes('path-')) {
        return 'path'
    }

    if (normalized.includes('cookie') || normalized.includes('cookie-')) {
        return 'cookie'
    }

    return null
}

const inferParameterType = (
    param: QueryableNode,
    input: AttributedNode | null
): string | null => {
    const inputType = input?.getAttribute('type')?.toLowerCase()

    if (inputType === 'text') {
        return 'string'
    }

    if (inputType) {
        return inputType
    }

    const field = Array.from(param.querySelectorAll('[class]')).find((element) => {
        const className = element.getAttribute('class') ?? ''

        return className.split(/\s+/).some((token) => token.startsWith('field-'))
    })

    const fieldClass = field?.getAttribute('class')?.split(/\s+/).find((token) => token.startsWith('field-'))

    if (fieldClass) {
        return fieldClass.replace(/^field-/, '')
    }

    return null
}

const isRequiredParameter = (
    param: QueryableNode,
    input: AttributeQueryNode | null
): boolean => {
    if (input?.hasAttribute('required')) {
        return true
    }

    return readTexts(param.querySelectorAll('*')).some((text) => text.toLowerCase() === 'required')
}

const extractParameterDescription = (param: QueryableNode): string | null => {
    const description = param.querySelector('[id$="__description"]')

    if (description) {
        return readText(description)
    }

    const markdownBlocks = Array.from(param.querySelectorAll('[data-testid="RDMD"]'))

    return readText(markdownBlocks[0] ?? null)
}

const normalizeResponseBody = (
    body: string,
    contentType: string | null
): Pick<ReadmeResponseBody, 'format' | 'body'> => {
    const trimmed = body.trim()

    if (contentType?.toLowerCase().includes('json') || /^(?:\{|\[)/.test(trimmed)) {
        try {
            return {
                format: 'json',
                body: JSON.parse(trimmed),
            }
        } catch {
            return {
                format: 'text',
                body,
            }
        }
    }

    return {
        format: 'text',
        body,
    }
}

const normalizeRequestCodeSnippet = (
    snippet: ReadmeCodeSnippet | null
): ReadmeOperation['requestExampleNormalized'] => {
    if (!snippet) {
        return null
    }

    return normalizeCurlSnippet(snippet) ?? normalizeFetchSnippet(snippet) ?? {
        sourceLabel: snippet.label,
        method: null,
        url: null,
        headers: {},
        bodyFormat: null,
        body: null,
        rawBody: null,
    }
}

const normalizeCurlSnippet = (snippet: ReadmeCodeSnippet): ReadmeOperation['requestExampleNormalized'] => {
    if (!snippet.body.startsWith('curl ')) {
        return null
    }

    const method = snippet.body.match(/--request\s+([A-Z]+)/)?.[1] ?? null
    const url = snippet.body.match(/--url\s+(\S+)/)?.[1] ?? null
    const headers = Object.fromEntries(Array.from(snippet.body.matchAll(/--header\s+'([^:]+):\s*([^']+)'/g)).map((match) => [
        match[1].trim(),
        match[2].trim(),
    ]))
    const rawBodyMatch = snippet.body.match(/--data\s+'([\s\S]*)'$/)
    const rawBody = rawBodyMatch?.[1]?.trim() ?? null
    const normalizedBody = rawBody ? normalizeResponseBody(rawBody, headers['content-type'] ?? headers['Content-Type'] ?? null) : null

    return {
        sourceLabel: snippet.label,
        method,
        url,
        headers,
        bodyFormat: normalizedBody?.format ?? null,
        body: normalizedBody?.body ?? null,
        rawBody,
    }
}

const normalizeFetchSnippet = (snippet: ReadmeCodeSnippet): ReadmeOperation['requestExampleNormalized'] => {
    const fetchMatch = snippet.body.match(/fetch\(\s*(["'])(.*?)\1\s*,\s*\{([\s\S]*)\}\s*\)/)

    if (!fetchMatch) {
        return null
    }

    const [, , url, optionsBody] = fetchMatch
    const method = extractObjectPropertyValue(optionsBody, 'method')?.toUpperCase() ?? null
    const headers = extractFetchHeaders(optionsBody)
    const rawBody = extractFetchBody(optionsBody)
    const contentType = headers['content-type'] ?? headers['Content-Type'] ?? null
    const normalizedBody = rawBody ? normalizeStructuredRequestBody(rawBody, contentType) : null

    return {
        sourceLabel: snippet.label,
        method,
        url,
        headers,
        bodyFormat: normalizedBody?.format ?? null,
        body: normalizedBody?.body ?? null,
        rawBody,
    }
}

const extractFetchHeaders = (optionsBody: string): Record<string, string> => {
    const headersBlock = extractObjectPropertyValue(optionsBody, 'headers')

    if (!headersBlock) {
        return {}
    }

    const parsedHeaders = parseLooseStructuredValue(headersBlock)

    if (!isRecord(parsedHeaders)) {
        return {}
    }

    return Object.fromEntries(Object.entries(parsedHeaders).map(([key, value]) => [
        key,
        String(value),
    ]))
}

const extractFetchBody = (optionsBody: string): string | null => {
    return extractObjectPropertyValue(optionsBody, 'body')
}

const normalizeStructuredRequestBody = (
    body: string,
    contentType: string | null
): Pick<ReadmeResponseBody, 'format' | 'body'> => {
    const parsedBody = parseLooseStructuredValue(body)

    if (parsedBody !== null && (contentType?.toLowerCase().includes('json') || /^[[{]/.test(body.trim()))) {
        return {
            format: 'json',
            body: parsedBody,
        }
    }

    return normalizeResponseBody(body, contentType)
}

const extractObjectPropertyValue = (source: string, propertyName: string): string | null => {
    const propertyMatch = source.match(new RegExp(`\\b${propertyName}\\s*:`, 'm'))

    if (!propertyMatch || propertyMatch.index === undefined) {
        return null
    }

    let cursor = propertyMatch.index + propertyMatch[0].length

    while (/\s/.test(source[cursor] ?? '')) {
        cursor += 1
    }

    if (source.startsWith('JSON.stringify', cursor)) {
        const openParenIndex = source.indexOf('(', cursor)

        if (openParenIndex === -1) {
            return null
        }

        const wrappedArgument = extractBalancedSegment(source, openParenIndex, '(', ')')

        return wrappedArgument?.slice(1, -1).trim() ?? null
    }

    if (source[cursor] === '{' || source[cursor] === '[') {
        const closingChar = source[cursor] === '{' ? '}' : ']'

        return extractBalancedSegment(source, cursor, source[cursor], closingChar)?.trim() ?? null
    }

    if (source[cursor] === '"' || source[cursor] === '\'') {
        return extractStringLiteralValue(source, cursor)
    }

    const bareValue = source.slice(cursor).match(/^([^,\n]+)/)?.[1]

    return bareValue?.trim() ?? null
}

const extractBalancedSegment = (
    source: string,
    startIndex: number,
    openChar: string,
    closeChar: string
): string | null => {
    let depth = 0
    let quoteChar: '"' | '\'' | null = null
    let isEscaped = false

    for (let index = startIndex; index < source.length; index += 1) {
        const character = source[index]

        if (quoteChar) {
            if (isEscaped) {
                isEscaped = false
                continue
            }

            if (character === '\\') {
                isEscaped = true
                continue
            }

            if (character === quoteChar) {
                quoteChar = null
            }

            continue
        }

        if (character === '"' || character === '\'') {
            quoteChar = character
            continue
        }

        if (character === openChar) {
            depth += 1
            continue
        }

        if (character === closeChar) {
            depth -= 1

            if (depth === 0) {
                return source.slice(startIndex, index + 1)
            }
        }
    }

    return null
}

const extractStringLiteralValue = (source: string, startIndex: number): string | null => {
    const quoteChar = source[startIndex]
    let value = ''
    let isEscaped = false

    for (let index = startIndex + 1; index < source.length; index += 1) {
        const character = source[index]

        if (isEscaped) {
            value += character
            isEscaped = false
            continue
        }

        if (character === '\\') {
            isEscaped = true
            continue
        }

        if (character === quoteChar) {
            return value
        }

        value += character
    }

    return null
}

const parseLooseStructuredValue = (value: string): unknown | null => {
    const trimmed = value.trim()

    if (!/^[[{]/.test(trimmed)) {
        return null
    }

    const normalized = trimmed
        .replace(/([{,]\s*)([A-Za-z_$][\w$-]*)(\s*:)/g, '$1"$2"$3')
        .replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, (_match, inner: string) => JSON.stringify(inner.replace(/\\'/g, '\'')))
        .replace(/,\s*([}\]])/g, '$1')

    try {
        return JSON.parse(normalized)
    } catch {
        return null
    }
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const escapeSelector = (value: string): string => {
    return value.replace(/([#.:[\],=])/g, '\\$1')
}

const readText = (element: TextNodeLike | null): string | null => {
    const value = element?.textContent?.replace(/\s+/g, ' ').trim()

    return value ? value : null
}

const readTexts = (elements: Iterable<TextNodeLike>): string[] => {
    return Array.from(elements)
        .map((element) => readText(element))
        .filter((value): value is string => Boolean(value))
}

const extractButtonText = (element: QueryableNode): string | null => {
    const texts = readTexts(element.querySelectorAll('span, div, code'))
        .filter((text) => text.trim().length > 0)

    return texts.sort((left, right) => right.length - left.length)[0] ?? readText(element)
}