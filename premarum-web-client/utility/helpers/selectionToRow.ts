import {IPreEnrollmentSelectionResponse} from "../requests/responseTypes";

export async function GetRows(selections: IPreEnrollmentSelectionResponse[]) {
    let result = []

    for (let i in selections) {
        let days = []
        let times = []
        let professors = []

        for (let j in selections[i].timeSlots) {
            days.push(selections[i].timeSlots[j].day)
            times.push(selections[i].timeSlots[j].startTime + " - " + selections[i].timeSlots[j].endTime)
        }

        for (let k in selections[i].professors) {
            professors.push(selections[i].professors[k].name)
        }

        result.push({id: parseInt(i), entryId: selections[i].id, course: selections[i].course.courseCode, section: selections[i].sectionName,
            credits: selections[i].course.courseCredit, days: days.join(", "), classroom: selections[i].classRoom,
            timeslot: times.join(", "), professor: professors.join(", ")})
    }

    return result
}