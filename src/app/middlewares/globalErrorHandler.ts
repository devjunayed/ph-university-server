/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSource } from '../interface/error'
import config from '../config'
import handleZodError from '../errors/handleZodError'
import handleValidationError from '../errors/handleValidationError'
import handleDuplicateError from '../errors/handleDuplicateError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // setting default values
    let statusCode = err.statusCode || 500
    let message = err.message || 'Something went wrong'

    let errorSources: TErrorSource[] = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ]

    // handling zod error
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)

        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources
    }
    // handling mongoose error
    else if (err?.name === 'ValidatorError') {
        const simplifiedError = handleValidationError(err)

        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources
    }
    // cast error
    else if(err?.name === 'CastError'){
        const simplifiedError = handleValidationError(err)

        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources
    }
    // duplicate error
    else if(err?.code === 11000){
        const simplifiedError = handleDuplicateError(err)

        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources
    }

    // returning the error
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.node_env === 'development' ? err?.stack : null,
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
