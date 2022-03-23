import {IPublicClientApplication} from "@azure/msal-browser";
import axios from "axios";
import {HOST} from "../constants";
import {getAuthToken} from "../helpers";
import {IPreEnrollmentResponse} from "./responseTypes";

export default 
async function getStudentPreEnrollments(instance: IPublicClientApplication) {
    const token = await getAuthToken(instance);
    const response = await axios.get(`${HOST}/PreEnrollment/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data as IPreEnrollmentResponse[]
}