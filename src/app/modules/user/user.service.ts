import User from "./user.model";

const createStudentIntoDB = async (studentData) => {
   
    const result = await User.create(studentData);
    return result;
}

export const UserService = {
    createStudentIntoDB
}