import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'
import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { password, student: studentData } = req.body

        const result = await UserService.createStudentIntoDB(
            password,
            studentData
        )

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student created successfully",
            data: result
        })
    } catch (err) {
        next(err)
    }
}

export const UserController = {
    createStudent,
}
