import {IPublicClientApplication} from "@azure/msal-browser";
import {getAuthToken} from "../helpers";
import axios from "axios";
import {HOST} from "../constants";
import {IPreEnrollmentResponse} from "./responseTypes";

export interface INewPreEnrollment {
    semesterId: number
    name: string
}

export default async function createPreEnrollment(instance: IPublicClientApplication, preEnrollment: INewPreEnrollment): Promise<IPreEnrollmentResponse> {
    const token = await getAuthToken(instance);
    const response = await axios.post(`${HOST}/PreEnrollment/`, preEnrollment, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return await response.data;
}