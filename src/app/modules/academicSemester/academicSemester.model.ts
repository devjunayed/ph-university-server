import { model, Schema } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
    Months,
    SemesterCode,
    SemesterName,
} from './academicSemester.constants'

const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            enum: SemesterName,
        },
        code: {
            type: String,
            enum: SemesterCode,
            required: [true, 'Code is required'],
        },
        year: {
            type: Date,
            required: [true, 'Year is required'],
        },
        startMonth: {
            type: String,
            enum: Months,
            required: [true, 'Start Month is required'],
        },
        endMonth: {
            type: String,
            enum: Months,
            required: [true, 'End Month is required'],
        },
    },
    {
        timestamps: true,
    }
)

export const AcademicSemester = model<TAcademicSemester>(
    'AcademicSemester',
    academicSemesterSchema
)
