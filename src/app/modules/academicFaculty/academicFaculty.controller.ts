import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async(req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester is create successfully",
        data: result,
    })
})

export const AcademicFacultyController = {
    createAcademicFaculty
}