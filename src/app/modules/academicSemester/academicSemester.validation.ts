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
        year: z.string(),
        startMonth: z.enum([...Months] as [string, ...string[]]),
        endMonth: z.enum([...Months] as [string, ...string[]]),
    }),
})
const updateAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...SemesterName] as [string, ...string[]]).optional(),
        code: z.enum([...SemesterCode] as [string, ...string[]]).optional(),
        year: z.string().optional(),
        startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
        endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    }),
})

export const AcademicSemesterValidation = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema,
}
