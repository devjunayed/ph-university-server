import { Request, Response } from 'express'
import { UserService } from './user.service'

const createStudent = async (req: Request, res: Response) => {
    try {
        const { password, student: studentData } = req.body

        const result = await UserService.createStudentIntoDB(
            password,
            studentData
        )

        res.status(200).json({
            success: true,
            message: 'Student created successfully',
            data: result,
        })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const UserController = {
    createStudent,
}
