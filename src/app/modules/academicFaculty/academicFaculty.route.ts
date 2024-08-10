import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { AcademicFacultyController } from './academicFaculty.controller'

const router = express.Router()

router.post(
    '/create-academic-faculty',
    validateRequest(AcademicFacultyValidation.createAcademicFacultyValidation),
    AcademicFacultyController.createAcademicFaculty
)

router.get('/', AcademicFacultyController.getAllAcademicFaculty)

router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty)

router.patch(
    '/:facultyId',
    validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidation),
    AcademicFacultyController.updateAcademicFaculty
)

export const AcademicFacultyRoutes = router
