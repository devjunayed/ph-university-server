import mongoose from 'mongoose'
import { Student } from './student.model'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import User from '../user/user.model'

const getAllStudentsFromDB = async () => {
    const result = await Student.find()
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        })
    return result
}

const getSingleStudentFromDB = async (id: string) => {
    // const result = await Student.aggregate([{ $match: { id } }])
    const result = await Student.findOne({id})
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        })
    return result
}

const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession()
    try {
        const deletedStudent = await Student.findOneAndUpdate([
            { id },
            { isDeleted: true },
            { new: true, session },
        ])

        if (!deletedStudent) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to delete student'
            )
        }

        const deletedUser = await User.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        )

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
        }

        await session.commitTransaction()
        await session.endSession()

        return deletedStudent
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
    }
}

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
}
