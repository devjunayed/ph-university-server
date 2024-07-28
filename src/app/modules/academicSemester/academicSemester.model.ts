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
            type: String,
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

academicSemesterSchema.pre('save', async function (next) {
    const { name, year } = this

    const isSemesterExists = await AcademicSemester.findOne({ name, year })

    if (isSemesterExists) {
        throw new Error('Semester already exists')
    }
    next()
})
academicSemesterSchema.pre('findOneAndUpdate', async function (next) {
    
    const update = this.getUpdate();
    const{name, year} = update;


    const isSemesterExists = await AcademicSemester.findOne({ name, year })

    if (isSemesterExists) {
        throw new Error('Semester already exists')
    }
    next()
})

export const AcademicSemester = model<TAcademicSemester>(
    'AcademicSemester',
    academicSemesterSchema
)
