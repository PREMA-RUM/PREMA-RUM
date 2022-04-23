import axios from "axios";
import {HOST} from "../constants";
import {IPublicClientApplication} from "@azure/msal-browser";
import {getAuthToken} from "../helpers";

export default
async function deletePreEnrollment(instance: IPublicClientApplication, preEnrollmentId: number) {
    await axios.delete(`${HOST}/PreEnrollment/${preEnrollmentId}`, {
        headers: {
            Authorization: `Bearer ${await getAuthToken(instance)}`
        }
    })
}