import type { OpenApiDocumentLike, OpenApiOperationLike, OpenApiParameterLike } from '../types/open-api'
import { SdkMethodNamingStrategy, SdkNamespaceNamingStrategy, SdkOperationManifest, SdkParameterManifest } from './types'

export class NamingSupport {
    static contextualTailSegments = new Set([
        'history',
        'status',
        'detail',
        'details',
    ])

    static irregularSingulars = new Map([
        ['analyses', 'analysis'],
        ['diagnoses', 'diagnosis'],
        ['parentheses', 'parenthesis'],
        ['statuses', 'status'],
        ['synopses', 'synopsis'],
        ['theses', 'thesis'],
    ])

    static invariantSingulars = new Set([
        'analysis',
        'diagnosis',
        'news',
        'series',
        'species',
        'status',
        'synopsis',
        'thesis',
    ])

    static nestedContextSegments = new Set([
        'account',
        'accounts',
        'transaction',
        'transactions',
        'wallet',
        'wallets',
        'virtual-account',
        'virtual-accounts',
        'history',
    ])

    static roleSuffixes = ['Input', 'Query', 'Header', 'Params'] as const

    sanitizeTypeName (value: string): string {
        const normalized = value.replace(/[^A-Za-z0-9]+/g, ' ').trim()

        if (!normalized) {
            return 'GeneratedEntity'
        }

        const pascalCased = normalized
            .split(/\s+/)
            .filter(Boolean)
            .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
            .join('')

        return /^[A-Za-z_$]/.test(pascalCased) ? pascalCased : `Type${pascalCased}`
    }

    isPathParam (segment: string): boolean {
        return (segment.startsWith('{') && segment.endsWith('}'))
            || /^:[A-Za-z0-9_]+$/.test(segment)
    }

    stripPathParam (segment: string): string {
        return segment
            .replace(/^\{/, '')
            .replace(/\}$/, '')
            .replace(/^:/, '')
    }

    singularize (value: string): string {
        const normalized = value.toLowerCase()

        if (NamingSupport.irregularSingulars.has(normalized)) {
            return NamingSupport.irregularSingulars.get(normalized) ?? value
        }

        if (NamingSupport.invariantSingulars.has(normalized)) {
            return value
        }

        if (/ies$/i.test(value)) {
            return `${value.slice(0, -3)}y`
        }

        if (/(sses|shes|ches|xes|zes)$/i.test(value)) {
            return value.slice(0, -2)
        }

        if (/uses$/i.test(value)) {
            return value.slice(0, -2)
        }

        if (value.endsWith('s') && !value.endsWith('ss') && value.length > 1) {
            return value.slice(0, -1)
        }

        return value
    }

    pluralize (value: string): string {
        if (/y$/i.test(value)) {
            return `${value.slice(0, -1)}ies`
        }

        if (/s$/i.test(value)) {
            return value
        }

        return `${value}s`
    }

    toCamelCase (value: string): string {
        const typeName = this.sanitizeTypeName(value)

        return typeName.charAt(0).toLowerCase() + typeName.slice(1)
    }

    deriveOperationNaming (path: string): { baseName: string, collisionSuffix: string } {
        const pathSegments = this.getNormalizedPathSegments(path)
        const staticSegments = pathSegments.filter((segment) => !this.isPathParam(segment)).map((segment) => this.singularize(segment))
        const paramSegments = pathSegments.filter((segment) => this.isPathParam(segment)).map((segment) => this.singularize(this.stripPathParam(segment)))
        const tailSegment = staticSegments[staticSegments.length - 1] ?? 'resource'
        const parentSegment = staticSegments[staticSegments.length - 2] ?? null
        const hasPathParamBeforeTail = pathSegments.slice(0, -1).some((segment) => this.isPathParam(segment))
        const shouldPrefixParent = Boolean(
            parentSegment
            && (
                NamingSupport.contextualTailSegments.has(tailSegment.toLowerCase())
                || (hasPathParamBeforeTail && NamingSupport.nestedContextSegments.has(tailSegment.toLowerCase()))
            )
        )
        const baseName = this.sanitizeTypeName(shouldPrefixParent ? `${parentSegment} ${tailSegment}` : tailSegment)
        const collisionSuffix = paramSegments.length > 0
            ? `By ${paramSegments.map((segment) => this.sanitizeTypeName(segment)).join(' And ')}`
            : parentSegment && !shouldPrefixParent
                ? this.sanitizeTypeName(parentSegment)
                : ''

        return {
            baseName,
            collisionSuffix,
        }
    }

    fallbackCollisionSuffix (method: string, path: string, baseName: string): string {
        const pathSegments = this.getNormalizedPathSegments(path)
        const staticSegments = pathSegments.filter((segment) => !this.isPathParam(segment))
        const tailSegment = staticSegments[staticSegments.length - 1] ?? ''
        const hasParams = pathSegments.some((segment) => this.isPathParam(segment))

        if (method === 'get' && !hasParams && /s$/i.test(tailSegment)) {
            return 'List'
        }

        if (method === 'post' && !hasParams) {
            return 'Create'
        }

        if ((method === 'put' || method === 'patch') && hasParams) {
            return 'Update'
        }

        if (method === 'delete') {
            return 'Delete'
        }

        return `${this.sanitizeTypeName(method)}${baseName}`
    }

    insertCollisionSuffix (baseName: string, collisionName: string): string {
        if (!collisionName) {
            return baseName
        }

        for (const roleSuffix of NamingSupport.roleSuffixes) {
            if (baseName.endsWith(roleSuffix) && baseName.length > roleSuffix.length) {
                return `${baseName.slice(0, -roleSuffix.length)}${collisionName}${roleSuffix}`
            }
        }

        return `${baseName}${collisionName}`
    }

    deriveSdkGroupNamesBySignature (document: OpenApiDocumentLike, namespaceStrategy: SdkNamespaceNamingStrategy): Map<string, string> {
        const pathBySignature = new Map<string, string>()

        for (const path of Object.keys(document.paths)) {
            const signature = this.getStaticPathSignature(path)

            if (!pathBySignature.has(signature)) {
                pathBySignature.set(signature, path)
            }
        }

        const entries = Array.from(pathBySignature.entries())
            .map(([signature, path]) => ({
                signature,
                staticSegments: signature.split('/').filter(Boolean),
                candidates: this.buildSdkGroupNameCandidates(path, namespaceStrategy),
            }))
            .sort((left, right) => {
                return left.staticSegments.length - right.staticSegments.length
                    || left.signature.localeCompare(right.signature)
            })

        const groupNamesBySignature = new Map<string, string>()
        const usedNames = new Set<string>()

        for (const entry of entries) {
            const className = entry.candidates.find((candidate) => !usedNames.has(candidate))
                ?? this.createUniqueSdkGroupName(entry.candidates[entry.candidates.length - 1] ?? 'Resource', usedNames)

            usedNames.add(className)
            groupNamesBySignature.set(entry.signature, className)
        }

        return groupNamesBySignature
    }

    getStaticPathSegments (path: string): string[] {
        return this.getNormalizedPathSegments(path)
            .filter((segment) => !this.isPathParam(segment))
            .map((segment) => this.singularize(segment))
    }

    getStaticPathSignature (path: string): string {
        return this.getStaticPathSegments(path).join('/')
    }

    getNormalizedPathSegments (path: string): string[] {
        return path
            .split('/')
            .map((segment) => segment.trim())
            .filter(Boolean)
            .filter((segment) => !/^v\d+$/i.test(segment))
    }

    deriveSdkMethodName (
        method: string,
        path: string,
        operation: OpenApiOperationLike,
        methodStrategy: SdkMethodNamingStrategy
    ): string {
        if (methodStrategy === 'operation-id' && operation.operationId) {
            return this.toCamelCase(this.sanitizeTypeName(operation.operationId))
        }

        const hasPathParams = this.getNormalizedPathSegments(path).some((segment) => this.isPathParam(segment))

        if (method === 'get') {
            return this.endsWithPluralStaticSegment(path) ? 'list' : hasPathParams ? 'get' : 'list'
        }

        if (method === 'post') {
            return 'create'
        }

        if (method === 'patch' || method === 'put') {
            return 'update'
        }

        if (method === 'delete') {
            return 'delete'
        }

        return this.toCamelCase(this.sanitizeTypeName(method))
    }

    ensureUniqueSdkMethodNames (operations: SdkOperationManifest[]): SdkOperationManifest[] {
        const counts = new Map<string, number>()

        return operations.map((operation) => {
            const count = counts.get(operation.methodName) ?? 0

            counts.set(operation.methodName, count + 1)

            if (count === 0) {
                return operation
            }

            const suffix = this.sanitizeTypeName(this.fallbackCollisionSuffix(operation.method.toLowerCase(), operation.path, 'Operation'))

            return {
                ...operation,
                methodName: `${operation.methodName}${suffix}`,
            }
        })
    }

    createSdkParameterManifest (
        parameters: OpenApiParameterLike[] | undefined,
        location: 'query' | 'header' | 'path',
        path?: string
    ): SdkParameterManifest[] {
        return [
            ...(parameters ?? [])
                .filter((parameter) => parameter.in === location)
                .sort((left, right) => left.name.localeCompare(right.name)),
            ...this.getInferredPathParameters(path, location, (parameters ?? []).filter((parameter) => parameter.in === location)),
        ]
            .sort((left, right) => left.name.localeCompare(right.name))
            .map((parameter) => ({
                name: parameter.name,
                accessor: this.toParameterAccessor(parameter.name),
                in: location,
                required: parameter.required ?? false,
                description: parameter.description,
            }))
    }

    getInferredPathParameters (
        path: string | undefined,
        location: OpenApiParameterLike['in'],
        existingParameters: OpenApiParameterLike[]
    ): OpenApiParameterLike[] {
        if (location !== 'path' || !path) {
            return []
        }

        const existingNames = new Set(existingParameters.map((parameter) => parameter.name))

        return this.getNormalizedPathSegments(path)
            .filter((segment) => this.isPathParam(segment))
            .map((segment) => this.stripPathParam(segment))
            .filter((name) => !existingNames.has(name))
            .map((name) => ({
                name,
                in: 'path',
                required: true,
                schema: { type: 'string' },
            }))
    }

    private buildSdkGroupNameCandidates (path: string, namespaceStrategy: SdkNamespaceNamingStrategy): string[] {
        const normalizedSegments = this.getNormalizedPathSegments(path)
        const rawStaticSegments = normalizedSegments.filter((segment) => !this.isPathParam(segment))
        const staticSegments = rawStaticSegments.map((segment) => this.singularize(segment))
        const defaultName = this.deriveOperationNaming(path).baseName
        const preferredName = this.getPreferredSdkGroupName(normalizedSegments, rawStaticSegments, staticSegments)
        const contextualNames = staticSegments
            .map((_, index, segments) => this.sanitizeTypeName(segments.slice(index).join(' ')))
            .reverse()

        if (namespaceStrategy === 'scoped') {
            return Array.from(new Set([
                preferredName ?? '',
                this.sanitizeTypeName(staticSegments.join(' ')),
                ...contextualNames,
                defaultName,
            ].filter(Boolean)))
        }

        return Array.from(new Set([
            preferredName ?? '',
            defaultName, ...contextualNames
        ].filter(Boolean)))
    }

    private getPreferredSdkGroupName (
        normalizedSegments: string[],
        rawStaticSegments: string[],
        staticSegments: string[]
    ): string | null {
        const tailSegment = rawStaticSegments[rawStaticSegments.length - 1]
        const tailBaseSegment = staticSegments[staticSegments.length - 1]
        const parentSegment = staticSegments[staticSegments.length - 2]
        const hasPathParams = normalizedSegments.some((segment) => this.isPathParam(segment))
        const hasPathParamBeforeTail = normalizedSegments.slice(0, -1).some((segment) => this.isPathParam(segment))

        if (!tailSegment || !tailBaseSegment || !parentSegment) {
            return null
        }

        if (rawStaticSegments.length === 2 && !hasPathParams) {
            return this.sanitizeTypeName(`${tailBaseSegment} ${parentSegment}`)
        }

        if (!hasPathParamBeforeTail) {
            return null
        }

        if (this.singularize(tailSegment) !== tailSegment) {
            return this.sanitizeTypeName(`${parentSegment} ${tailBaseSegment}`)
        }

        return this.sanitizeTypeName(`${tailBaseSegment} ${parentSegment}`)
    }

    private createUniqueSdkGroupName (baseName: string, usedNames: Set<string>): string {
        let suffix = 2
        let candidate = baseName

        while (usedNames.has(candidate)) {
            candidate = `${baseName}${suffix}`
            suffix += 1
        }

        return candidate
    }

    private endsWithPluralStaticSegment (path: string): boolean {
        const tailSegment = this.getNormalizedPathSegments(path).at(-1)

        if (!tailSegment || this.isPathParam(tailSegment)) {
            return false
        }

        return this.singularize(tailSegment) !== tailSegment
    }

    private toParameterAccessor (value: string): string {
        const normalized = value
            .replace(/[^A-Za-z0-9]+/g, ' ')
            .trim()

        if (!normalized) {
            return 'value'
        }

        const [first, ...rest] = normalized
            .split(/\s+/)
            .filter(Boolean)

        const camelValue = [
            first.toLowerCase(),
            ...rest.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()),
        ].join('')

        return /^[A-Za-z_$]/.test(camelValue) ? camelValue : `value${camelValue}`
    }
}