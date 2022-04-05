import {IPublicClientApplication} from "@azure/msal-browser";
import {IPreEnrollmentResponse, IPreEnrollmentSelectionResponse} from "./responseTypes";
import {getAuthToken} from "../helpers";
import {HOST} from "../constants";
import axios from "axios";

export default async function addNewSelection(
    instance: IPublicClientApplication,
    preEnrollment: IPreEnrollmentResponse
    , selections: number[]): Promise<IPreEnrollmentSelectionResponse[]> {
    const token = await getAuthToken(instance)
    return (await axios.post(`${HOST}/PreEnrollment/${preEnrollment.id}/Selections`, {
        courseOfferings: selections
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data as IPreEnrollmentSelectionResponse[]
}