import mongoose from 'mongoose'
import { Student } from './student.model'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import User from '../user/user.model'
import { TStudent } from './student.interface'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
    
    const queryObj = {...query};

    const studentSearchableField = ['email', 'name.firstName', 'presentAddress']
    let searchTerm = ''

    if (query.searchTerm) {
        searchTerm = query.searchTerm as string
    }

    const searchQuery = Student.find({
        $or: studentSearchableField.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
        })),
    })

    const excludeFields = ['searchTerm', 'sort', 'limit'];
    excludeFields.forEach((field) => delete queryObj[field]);

    const filterQuery = searchQuery
        .find(queryObj)
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        })

    let sort = 'createdAt';

    if(query.sort){
        sort = query.sort as string;
    }

    const sortQuery =  filterQuery.sort(sort);

    let limit = 1;

    if(query.limit){
        limit = query.limit as number;
    }

    const result = await sortQuery.limit(limit);

    return result
}

const getSingleStudentFromDB = async (id: string) => {
    // const result = await Student.aggregate([{ $match: { id } }])
    const result = await Student.findOne({ id })
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        })
    return result
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    }

    /*
      guardain: {
        fatherOccupation:"Teacher"
      }
  
      guardian.fatherOccupation = Teacher
  
      name.firstName = 'Mezba'
      name.lastName = 'Abedin'
    */

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value
        }
    }

    const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
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
    updateStudentIntoDB,
}
