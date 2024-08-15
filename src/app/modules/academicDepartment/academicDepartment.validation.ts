import { z } from 'zod'

const createAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic department must be string',
            required_error: "Academic department Name is required"
        }),
        academicFaculty: z.string({
            invalid_type_error: 'Academic department must be string',
            required_error: "Academic department acdemic faculty id is required"
        }),
    }),
})
const updateAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic department must be string',
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: 'Academic department must be string',
        }).optional(),
    }),
})

export const AcademicDepartmentValidation = {
    createAcademicDepartmentValidation,
    updateAcademicDepartmentValidation,
}
