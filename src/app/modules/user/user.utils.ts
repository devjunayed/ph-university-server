import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import User from './user.model'

const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        { role: 'student' },
        { id: 1, _id: 0 }
    )
        .sort({ createdAt: -1 })
        .lean()

    return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
    // first time 0000
    const currentId = await findLastStudentId() || (0).toString().padStart(4, '0')


    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId
}
