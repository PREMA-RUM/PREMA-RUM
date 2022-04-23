import {IPublicClientApplication} from "@azure/msal-browser";
import {IDepartmentResponse} from "./responseTypes";
import {getAuthToken} from "../helpers";
import axios from "axios";
import {HOST} from "../constants";

export default async function addStudentDepartment(instance: IPublicClientApplication, departmentId: number): Promise<IDepartmentResponse[]> {
    const token = await getAuthToken(instance)
    return (await axios.put(`${HOST}/Student`, {
        departmentId: departmentId
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data
}