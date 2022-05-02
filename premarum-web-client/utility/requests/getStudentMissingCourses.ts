import {IMissingPreEnrollmentsResponse} from "./responseTypes";
import {getAuthToken} from "../helpers";
import {HOST, pca} from "../constants";
import axios from "axios";

export default async function getStudentMissingCourses(preEnrollmentId: Number): Promise<IMissingPreEnrollmentsResponse> {
    const token = await getAuthToken(pca)
    return (await axios.post(`${HOST}/PreEnrollment/${preEnrollmentId}/Requisites`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }))
}