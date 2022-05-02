import {IPublicClientApplication} from "@azure/msal-browser";
import {getAuthToken} from "../helpers";
import axios from "axios";
import {HOST} from "../constants";

export default async function updatePreEnrollmentTitle(instance: IPublicClientApplication, title: string, preEnrollmentId: number): Promise<void> {
    const token = await getAuthToken(instance)
    await axios.put(`${HOST}/PreEnrollment/${preEnrollmentId}`, {
        newName: title
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}