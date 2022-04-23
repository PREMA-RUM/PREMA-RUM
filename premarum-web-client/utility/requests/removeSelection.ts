import {IPublicClientApplication} from "@azure/msal-browser";
import {IPreEnrollmentResponse, IPreEnrollmentSelectionResponse} from "./responseTypes";
import {getAuthToken} from "../helpers";
import axios from "axios";
import {HOST} from "../constants";

export default async function removeSelections(
    instance: IPublicClientApplication,
    preEnrollment: IPreEnrollmentResponse
    , selections: number[]): Promise<IPreEnrollmentSelectionResponse[]> {
    const token = await getAuthToken(instance)
    return (await axios.delete(`${HOST}/PreEnrollment/${preEnrollment.id}/Selections`, {
        data: {
            courseOfferings: selections
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data as IPreEnrollmentSelectionResponse[]
}