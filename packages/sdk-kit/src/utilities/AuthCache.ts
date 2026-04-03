import type { AuthConfig } from '../Contracts/Core'
import type { Core } from '../Core'

export interface CachedAuthValue {
    auth: AuthConfig | AuthConfig[]
    expiresAt?: number
}

export interface CachedAccessTokenValue {
    token: string
    tokenType?: string
    expiresAt?: number
    expiresInMs?: number
    expiresInSeconds?: number
}

export type AuthCacheLoader = (core: Core) => Promise<CachedAuthValue>

export type AccessTokenCacheLoader = (core: Core) => Promise<CachedAccessTokenValue>

/**
 * Cache any auth payload returned from a loader until it expires.
 */
export const createAuthCache = (loader: AuthCacheLoader) => {
    let cached: CachedAuthValue | undefined

    return async (core: Core): Promise<AuthConfig | AuthConfig[]> => {
        if (cached && !isExpired(cached.expiresAt)) {
            return cached.auth
        }

        cached = await loader(core)

        return cached.auth
    }
}

/**
 * Cache bearer or oauth-style access tokens returned from a loader until expiry.
 */
export const createAccessTokenCache = (loader: AccessTokenCacheLoader) => {
    return createAuthCache(async (core) => {
        const token = await loader(core)
        const expiresAt = token.expiresAt
            ?? (typeof token.expiresInMs === 'number'
                ? Date.now() + token.expiresInMs
                : typeof token.expiresInSeconds === 'number'
                    ? Date.now() + (token.expiresInSeconds * 1000)
                    : undefined)

        return {
            auth: {
                type: 'oauth2',
                accessToken: token.token,
                tokenType: token.tokenType ?? 'Bearer',
            },
            expiresAt,
        }
    })
}

const isExpired = (expiresAt?: number): boolean => {
    return typeof expiresAt === 'number' && expiresAt <= Date.now()
}