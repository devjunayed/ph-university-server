import mongoose from 'mongoose'
import { TErrorSource, TGenericErrorResponse } from '../interface/error'

const handleValidationError = (
    err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
    const errorSources: TErrorSource[] = Object.values(err.errors).map(
        (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: value.path,
                message: value.message,
            }
        }
    )
    const statusCode = 400

    return {
        statusCode,
        message: 'Zod Validation Error',
        errorSources,
    }
}

export default handleValidationError
