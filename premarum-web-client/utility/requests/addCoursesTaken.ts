import {IPublicClientApplication} from "@azure/msal-browser";
import {ICoursesTakenResponse} from "./responseTypes";
import {getAuthToken} from "../helpers";
import axios from "axios";
import {HOST} from "../constants";

export default async function addCoursesTaken(instance: IPublicClientApplication, courses: number[]): Promise<ICoursesTakenResponse[]> {
    const token = await getAuthToken(instance)
    return (await axios.post(`${HOST}/Student/CoursesTaken`, {
        coursesTaken: courses.map(c => ({courseId: c, semesterId: null}))
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data
}