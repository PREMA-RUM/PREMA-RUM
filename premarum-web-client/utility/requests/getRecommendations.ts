import {IPublicClientApplication} from "@azure/msal-browser";
import {getAuthToken} from "../helpers";
import axios from "axios";
import {HOST} from "../constants";
import {IPreEnrollmentSelectionResponse} from "./responseTypes";


async function getRecommendations(instance: IPublicClientApplication, preEnrollmentId: number): Promise<IPreEnrollmentSelectionResponse[]> {
    const token = await getAuthToken(instance)
    const response = axios.get(`${HOST}/PreEnrollment/${preEnrollmentId}/Recommendations`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return (await response).data as IPreEnrollmentSelectionResponse[]
}

export default getRecommendations