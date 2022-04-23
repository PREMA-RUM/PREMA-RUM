import {IPreEnrollmentSelectionResponse} from "../requests/responseTypes";

export async function GetRows(selections: IPreEnrollmentSelectionResponse[]) {
    let result = []

    for (let i in selections) {
        let professors = []

        for (let k in selections[i].professors) {
            professors.push(selections[i].professors[k].name)
        }

        result.push({
            id: parseInt(i), 
            entryId: selections[i].id, 
            course: JSON.stringify({
                courseCode:selections[i].course.courseCode, 
                courseName: selections[i].course.courseName
            }), 
            section: selections[i].sectionName,
            credits: selections[i].course.courseCredit, 
            classroom: selections[i].classRoom,
            timeslot: JSON.stringify(selections[i].timeSlots),
            professor: professors.join(", "), 
            prerequisites: selections[i].course.coursePrerequisites,
            corequisites: selections[i].course.courseCorequisites,
        })
    }

    return result
}