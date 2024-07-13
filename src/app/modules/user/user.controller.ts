import { Request, Response } from "express";
import { UserValidation } from "./user.validation";
import { UserService } from "./user.service";

const createStudent = async(req: Request, res: Response) => {
    try {
        const {student: studentData} = req.body;
        const zodParsedData = UserValidation.userValidationSchema.parse(studentData);

        const result = await UserService.createStudentIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: "Student created successfully",
            data: result,
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

export const UserController = {
    createStudent
}