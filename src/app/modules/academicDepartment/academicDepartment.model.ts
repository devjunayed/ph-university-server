import { model, Schema } from 'mongoose'
import { TAcademicDepartment } from '../academicDepartment/academicDepartment.interface'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'academic-faculty',
        },
    },
    {
        timestamps: true,
    }
)

academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDepartment.findOne({
        name: this.name,
    })

    if (isDepartmentExist) {
        throw new Error('Academic Department is exist already')
    }
    next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
    'academic-department',
    academicDepartmentSchema
)
