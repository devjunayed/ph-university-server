import { Router } from 'express'
import { AcademicSemesterController } from './academicSemester.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'

const router = Router()

router.post(
    '/create-academic-semester',
    validateRequest(
        AcademicSemesterValidation.createAcademicSemesterValidationSchema
    ),
    AcademicSemesterController.createAcademicSemester
)
router.get(
    '/',
    AcademicSemesterController.getAllAcademicSemester
)
router.get(
    '/:id',
    AcademicSemesterController.getSingleAcademicSemester
)
router.patch(
    '/:id',
    validateRequest(
        AcademicSemesterValidation.updateAcademicSemesterValidationSchema
    ),
    AcademicSemesterController.updateAcademicSemester
)

export const AcademicSemesterRoutes = router
