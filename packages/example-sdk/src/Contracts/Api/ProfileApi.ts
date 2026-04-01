export interface ProfileApiResponse {
    id: string
    displayName: string
    email: string
    status: 'active' | 'disabled'
}

export interface UpdateProfileInput {
    displayName?: string
    status?: 'active' | 'disabled'
}