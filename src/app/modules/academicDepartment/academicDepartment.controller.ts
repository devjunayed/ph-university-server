import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "../academicDepartment/academicDepartment.service";

const createAcademicDepartment = catchAsync(async(req, res) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department is create successfully",
        data: result,
    })
})
const getAllAcademicDepartment = catchAsync(async(req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Academic department is retrieved successfully",
        data: result,
    })
})
const getSingleAcademicDepartment = catchAsync(async(req, res) => {
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(req.params.departmentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic department is retrieved successfully",
        data: result,
    })
})
const updateAcademicDepartment = catchAsync(async(req, res) => {
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(req.params.departmentId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic department is updated successfully",
        data: result,
    })
})

export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}