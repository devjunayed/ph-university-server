import config from '../../config'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import User from './user.model'
import { generateStudentId } from './user.utils'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
    // create a user object
    const userData: Partial<TUser> = {}

    // if password is not given, use default password
    userData.password = password || (config.default_password as string)

    // set student role
    userData.role = 'student'  

    // get academic semester
    const academicSemester = await AcademicSemester.findById(payload.admissionSemester);
    // set manually generated it
    userData.id = await generateStudentId(academicSemester as TAcademicSemester);

    // creating user
    const newUser = await User.create(userData)

    // create a student
    if(Object.keys(newUser).length){
        // set id, _id as user
        payload.id = newUser.id;
        payload.user = newUser._id; //reference_id

        const newStudent = await Student.create(payload);
        return newStudent;
    }
    return newUser
}

export const UserService = {
    createStudentIntoDB,
}
