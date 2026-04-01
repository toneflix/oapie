import { ErrorResponse } from '../Contracts/Core'

export class ForbiddenRequestException extends Error {
    statusCode: number = 403

    type: string = 'FORBIDDEN'
    code: string | number = '403'
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

        this.name = 'ForbiddenRequestException'
    }
}