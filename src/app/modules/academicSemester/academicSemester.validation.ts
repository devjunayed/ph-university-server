import { z } from 'zod'
import { SemesterName } from './academicSemester.constants'

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum(SemesterName),
        code: z.enum(["01", "02", "03"]),
        
    }),
})


export const AcademicSemesterValiation = {
    createAcademicSemesterValidationSchema,
}