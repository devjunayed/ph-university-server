import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from '../academicDepartment/academicDepartment.validation'
import { AcademicDepartmentController } from '../academicDepartment/academicDepartment.controller'

const router = express.Router()

router.post(
    '/create-academic-department',
    validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidation),
    AcademicDepartmentController.createAcademicDepartment
)

router.get('/', AcademicDepartmentController.getAllAcademicDepartment)

router.get('/:departmentId', AcademicDepartmentController.getSingleAcademicDepartment)

router.patch(
    '/:departmentId',
    validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidation),
    AcademicDepartmentController.updateAcademicDepartment
)

export const AcademicDepartmentRoutes = router
