/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { StudentServices } from './student.service'
import catchAsync from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students data retrieved successfully',
        data: result,
    })
})

const getAllStudents = catchAsync(async (req: Request, res: Response) => {

    const result = await StudentServices.getAllStudentsFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is retrieved successfully',
        data: result,
    })
})

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
    const { studentId } = req.params
    const result = await StudentServices.deleteStudentFromDB(studentId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is deleted successfully',
        data: result,
    })
})

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}
