import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'

const createAcademicSemester = catchAsync(async (req, res) => {
    const data = {}

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data,
        message: 'Academic Semester created successfully',
    })
})


export const AcademicSemesterController = {
    createAcademicSemester
}
