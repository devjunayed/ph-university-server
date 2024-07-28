export type TMonth =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December'

export type TSemestercode = '01' | '02' | '03'
export type TSemesterName = 'Autumn' | 'Summer' | 'Fall'

export type TAcademicSemester = {
    name: TSemesterName
    code: TSemestercode
    year: string
    startMonth: TMonth
    endMonth: TMonth
}

export type TAcademicSemesterNameCodeMapper = {
    [key: string]: string
}
