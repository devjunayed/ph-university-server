import httpStatus from 'http-status'
import config from '../../config'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import User from './user.model'
import { generateStudentId } from './user.utils'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
    // create a user object
    const userData: Partial<TUser> = {}

    // if password is not given, use default password
    userData.password = password || (config.default_password as string)

    // set student role
    userData.role = 'student'

    // get academic semester
    const admissionSemester = await AcademicSemester.findById(
        payload.admissionSemester
    )

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        // set manually generated it
        userData.id = await generateStudentId(
            admissionSemester as TAcademicSemester
        )

        // creating user
        const newUser = await User.create([userData, { session }])

        // create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
        }
        // set id, _id as user
        payload.id = newUser[0].id
        payload.user = newUser[0]._id //reference_id

        const newStudent = await Student.create([payload, { session }])

        if (!newStudent.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to create student'
            )
        }

        await session.commitTransaction()
        await session.endSession()

        return newStudent
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
    }
}

export const UserService = {
    createStudentIntoDB,
}
