import {
    TAcademicSemesterNameCodeMapper,
    TMonth,
    TSemestercode,
    TSemesterName,
} from './academicSemester.interface'

export const Months: TMonth[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export const SemesterName: TSemesterName[] = ['Autumn', 'Summer', 'Fall']

export const SemesterCode: TSemestercode[] = ['01', '02', '03']


export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn : "01",
    Summer: "02",
    Fall: '03'
}