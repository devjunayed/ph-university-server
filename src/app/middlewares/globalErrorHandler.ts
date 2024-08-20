/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // setting default values
    let statusCode = err.statusCode || 500
    let message = err.message || 'Something went wrong'

    type TErrorSource = {
        path: string | number
        message: string
    }

    const errorSources: TErrorSource[] = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ]


    const handleZodError = (err: ZodError) => {
        const statusCode = 400;

        return {
            
        }
    }

    if (err instanceof ZodError) {
        statusCode = 400
        message = 'zod error'
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
    })
}

// patern
/**
 * success
 * message
 * errorSources : [
 *     path: '',
 *     message: ''
 * ],
 * stack
 */

export default globalErrorHandler
