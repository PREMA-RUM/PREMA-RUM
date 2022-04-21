import {InteractionRequiredAuthError, IPublicClientApplication} from "@azure/msal-browser";
import {TOKEN_REQUEST} from "../constants";

export async function getAuthToken(instance: IPublicClientApplication) {
    try {
        return (await instance.acquireTokenSilent({
            scopes: [
                "api://83c3cbe7-f00e-4ea8-87d8-bf4d75690f17/access_as_user",
                "api://83c3cbe7-f00e-4ea8-87d8-bf4d75690f17/User.Read"
            ],
        })).accessToken;
    } catch(err) {
        if (err instanceof InteractionRequiredAuthError) {
            return (await instance.acquireTokenPopup(TOKEN_REQUEST)).accessToken;
        }
        console.error(err);
        throw err;
    }
}
 
export async function getGraphAuthToken(instance: IPublicClientApplication) {
    try {
        return (await instance.acquireTokenSilent({
            scopes: [
                "User.Read"
            ],
        })).accessToken;
    } catch(err) {
        if (err instanceof InteractionRequiredAuthError) {
            return (await instance.acquireTokenSilent({
                scopes:[
                    "User.Read"
                ]
            })).accessToken;
        }
        console.error(err);
        throw err;
    }
}