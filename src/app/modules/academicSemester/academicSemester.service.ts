import { academicSemesterNameCodeMapper } from './academicSemester.constants'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Semester code name error')
    }

    const result = await AcademicSemester.create(payload)
    return result
}
const getAllAcademicSemesterFromDB = async () => {
    const result = await AcademicSemester.find({});
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemesterFromDB
}
