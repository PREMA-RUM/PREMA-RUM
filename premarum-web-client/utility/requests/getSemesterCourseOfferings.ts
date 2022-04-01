import axios from "axios";
import {HOST} from "../constants";
import {IPreEnrollmentSelectionResponse} from "./responseTypes";

export default 
async function getSemesterCourseOfferings(semesterId: number): Promise<IPreEnrollmentSelectionResponse[]> {
    return (await axios
        .get(`${HOST}/CourseCatalog?semesterId=${semesterId}`))
        .data
}