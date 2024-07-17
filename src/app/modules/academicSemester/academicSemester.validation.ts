import { z } from 'zod'
import {
    Months,
    SemesterCode,
    SemesterName,
} from './academicSemester.constants'

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...SemesterName] as [string, ...string[]]),
        code: z.enum([...SemesterCode] as [string, ...string[]]),
        year: z.date(),
        startMonth: z.enum([...Months] as [string, ...string[]]),
        endMonth: z.enum([...Months] as [string, ...string[]]),
    }),
})

export const AcademicSemesterValidation = {
    createAcademicSemesterValidationSchema,
}
