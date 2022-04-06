import {IPublicClientApplication} from "@azure/msal-browser";
import {getAuthToken} from "../helpers";
import {pca} from "../../pages/_app";
import {HOST} from "../constants";
import axios from "axios";


export async function getCoursesTaken(instance: IPublicClientApplication) {
    const authToken = await getAuthToken(pca);
    return await axios.get(`${HOST}/Student/CoursesTaken`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
}