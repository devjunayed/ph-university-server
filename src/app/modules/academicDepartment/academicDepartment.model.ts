import { model, Schema } from 'mongoose'
import { TAcademicDepartment } from '../academicDepartment/academicDepartment.interface'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

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
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Department is exist already')
    }
    next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const { _id } = this.getQuery()

    const isDepartmentExist = await AcademicDepartment.findOne({
        _id,
    })

    if (!isDepartmentExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'This Department does not exist already')
    }

    next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
    'academic-department',
    academicDepartmentSchema
)
