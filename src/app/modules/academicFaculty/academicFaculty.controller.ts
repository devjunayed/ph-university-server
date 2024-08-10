import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async(req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty is create successfully",
        data: result,
    })
})
const getAllAcademicFaculty = catchAsync(async(req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Academic faculty is retrieved successfully",
        data: result,
    })
})
const getSingleAcademicFaculty = catchAsync(async(req, res) => {
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(req.params.facultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty is retrieved successfully",
        data: result,
    })
})
const updateAcademicFaculty = catchAsync(async(req, res) => {
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(req.params.facultyId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty is updated successfully",
        data: result,
    })
})

export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}