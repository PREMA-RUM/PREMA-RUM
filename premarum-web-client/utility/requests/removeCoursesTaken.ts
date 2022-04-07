import {IPublicClientApplication} from "@azure/msal-browser";
import axios from "axios";
import {HOST} from "../constants";
import {getAuthToken} from "../helpers";
import {ICoursesTakenResponse} from "./responseTypes";


export default async function removeCourseTaken(instance: IPublicClientApplication, courseIds: number[]): Promise<ICoursesTakenResponse[]> {
    return (await axios.delete(`${HOST}/Student/CoursesTaken`, {
        data: {
            coursesIds: courseIds
        },
        headers: {
            Authorization: `Bearer ${await getAuthToken(instance)}`
        }
    })).data as ICoursesTakenResponse[]
}