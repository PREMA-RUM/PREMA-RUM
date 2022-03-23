import { IPublicClientApplication } from "@azure/msal-browser";
import axios from "axios";
import { HOST } from "../constants";
import { getAuthToken } from "../helpers";
import PremaRumUserAccount from "../helpers/CustomAccount";


async function getOrCreateUser(instance: IPublicClientApplication) {
    const token = await getAuthToken(instance)
    const response = await axios.get(
        HOST + "/Student", {
            headers: {
                Authorization: "Bearer " + token
            }
        }
    )
    const newAccount:PremaRumUserAccount = {
        ... await instance.getActiveAccount(),
        ... response.data
    }
    await instance.setActiveAccount(newAccount);
    return newAccount
}

export default getOrCreateUser