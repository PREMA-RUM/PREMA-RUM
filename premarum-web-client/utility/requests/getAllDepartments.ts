import {IDepartmentResponse} from "./responseTypes";
import axios from "axios";
import {HOST} from "../constants";

export default async function getAllDepartments(): Promise<IDepartmentResponse[]> {
    const response = await axios.get(HOST + "/CourseCatalog/Department");
    return response.data as IDepartmentResponse[]
}