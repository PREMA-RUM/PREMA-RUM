import {ICourseResponse} from "./responseTypes";
import axios from "axios";
import {HOST} from "../constants";


export async function getAllCourses(): Promise<ICourseResponse> {
    return (await axios.get(`${HOST}/CourseCatalog/Course`)).data
}