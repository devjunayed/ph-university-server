import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
        req.body
    )

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: 'Academic Semester created successfully',
    })
})

const getAllAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: 'All Academic Semester retrieved successfully',
    })
})
const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: 'Academic Semester retrieved successfully',
    })
})

const updateAcademicSemester = catchAsync(async(req, res) => {
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(req.params.id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: 'Academic Semester updated successfully',
    })
})

export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateAcademicSemester
}
