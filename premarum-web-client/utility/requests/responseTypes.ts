export interface ISemesterResponse {
    id: number
    term: string
    year: number
}

export interface ICourseResponse {
    id: number
    courseCode: string,
    courseDescription: string,
    coursePrerequisites: string
    courseCorequisites: string
    courseCredit: number
    courseName: string
}

export interface IDepartmentResponse {
    departmentId: number
    departmentName: string
}

export interface IProfessorResponse {
    id: number
    name: string
}

export interface ITimeSlotResponse {
    startTime: string,
    endTime: string,
    day: string
}

export interface IPreEnrollmentSelectionResponse {
    id: number
    sectionName: string
    capacity: number,
    classRoom: string | null
    course: ICourseResponse
    professors: IProfessorResponse[]
    timeSlots: ITimeSlotResponse[]
}

export interface IPreEnrollmentResponse {
    id: number
    name: string
    studentId: number
    semester: ISemesterResponse
    selections: IPreEnrollmentSelectionResponse[]
}

export interface ICoursesTakenResponse {
    course: ICourseResponse,
    semester: ISemesterResponse | null
}

export interface IApiProblem {
    type: string,
    detail: string,
    title: string,
    status: number,
    traceId: string
}