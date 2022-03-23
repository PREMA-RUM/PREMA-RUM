import axios from "axios";
import {HOST} from "../constants";
import {ISemesterResponse} from "./responseTypes";

export default async function getAllSemesters(): Promise<ISemesterResponse[]> {
    const response = await axios.get(HOST + "/CourseCatalog/Semester");
    return response.data as ISemesterResponse[]
}