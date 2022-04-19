import {IPublicClientApplication} from "@azure/msal-browser";
import {getGraphAuthToken} from "../helpers";
import {graphConfig} from "../constants";
import axios from "axios";

async function getProfilePicture(instance: IPublicClientApplication) {
    const token = await getGraphAuthToken(instance)
    return (await axios.get(graphConfig.graphMePhotoEndpoint, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
    })).data
}

export default getProfilePicture