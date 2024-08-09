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



export const AcademicFacultyRoutes = router;