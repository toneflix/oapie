import { ErrorResponse } from '../Contracts/Core'

export class UnauthorizedRequestException extends Error {
    statusCode: number = 401

    type: string = 'UNAUTHORIZED'
    code: string | number = '401'
    data: ErrorResponse

    constructor(data?: ErrorResponse) {
        super(data?.error.message ?? data?.message ?? 'Forbidden request. You do not have permission to access this resource.')

        if (data?.error.code) {
            this.type = data.error.type
        }
        if (data?.error.code) {
            this.code = data.error.code
        }

        this.data = data ?? {
            status: 'failed',
            error: {
                type: this.type,
                code: this.code,
                message: this.message
            }
        }

        this.name = 'UnauthorizedRequestException'
    }
}