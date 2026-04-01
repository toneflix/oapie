import { ValidationErrorResponse } from '../Contracts/Core'

export class BadRequestException extends Error {
    statusCode: number = 400

    type: string = 'INVALID_REQUEST'
    code: string | number = '400'
    data: ValidationErrorResponse

    constructor(data?: ValidationErrorResponse) {
        super(
            data?.error.message ??
            data?.message ??
            'Bad request. The server could not understand the request due to invalid syntax.'
        )

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
                message: this.message,
                validation_errors: []
            }
        }

        this.name = 'BadRequestException'
    }
}