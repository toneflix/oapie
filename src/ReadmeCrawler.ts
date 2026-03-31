import type { ReadmeOperation } from './types/base'

export interface ReadmeCrawledOperation extends ReadmeOperation {
    sourceUrl: string
}

export const resolveReadmeSidebarUrls = (
    operation: Pick<ReadmeOperation, 'sidebarLinks'>,
    baseUrl: string
): string[] => {
    const normalizedBaseUrl = new URL(baseUrl)
    const urls = operation.sidebarLinks
        .map((link) => link.href)
        .filter((href): href is string => Boolean(href))
        .map((href) => new URL(href, normalizedBaseUrl).toString())
        .filter((href) => /^https?:\/\//i.test(href))

    return Array.from(new Set(urls))
}