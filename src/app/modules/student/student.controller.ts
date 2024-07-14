/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { StudentServices } from './student.service'

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params
        const result = await StudentServices.getSingleStudentFromDB(studentId)

        res.status(200).json({
            success: true,
            message: 'Student is data retrieved successfully',
            data: result,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'somethign went wrong',
            error: err,
        })
    }
}

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB()

        res.status(200).json({
            success: true,
            message: 'Students retrived successfully',
            data: result,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'somethign went wrong',
            error: err,
        })
    }
}

const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params
        const result = await StudentServices.deleteStudentFromDB(studentId)

        res.status(200).json({
            success: true,
            message: 'Student is deleted successfully',
            data: result,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'somethign went wrong',
            error: err,
        })
    }
}

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}
