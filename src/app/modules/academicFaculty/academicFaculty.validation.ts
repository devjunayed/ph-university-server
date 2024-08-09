import {z} from 'zod';

const createAcademicFacultyValidation = z.object({
    name: z.string({
        invalid_type_error: "Academic faculty must be string",
    })
})
const updateAcademicFacultyValidation = z.object({
    name: z.string({
        invalid_type_error: "Academic faculty must be string",
    })
})


export const AcademicFacultyValidation = {
    createAcademicFacultyValidation,
    updateAcademicFacultyValidation
}