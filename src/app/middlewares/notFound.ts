/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        success: false,
        message: 'API Not Nound !!',
        error: '',
    })
}
