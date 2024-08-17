import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { academicSemesterNameCodeMapper } from './academicSemester.constants'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester code name error')
    }

    const result = await AcademicSemester.create(payload)
    return result
}
const getAllAcademicSemesterFromDB = async () => {
    const result = await AcademicSemester.find({})
    return result
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id)
    return result
}

const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademicSemester>
) => {
    if (
        payload.name &&
        payload.code &&
        academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid semester code name')
    }
    const result = await AcademicSemester.findByIdAndUpdate(id, payload)
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB,
}
