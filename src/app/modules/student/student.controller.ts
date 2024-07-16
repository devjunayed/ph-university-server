/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { StudentServices } from './student.service'
import catchAsync from '../../utils/catchAsync'

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)

    res.status(200).json({
        success: true,
        message: 'Student is data retrieved successfully',
        data: result,
    })
})

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
        success: true,
        message: 'Students retrived successfully',
        data: result,
    })
})

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
    const { studentId } = req.params
    const result = await StudentServices.deleteStudentFromDB(studentId)

    res.status(200).json({
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
