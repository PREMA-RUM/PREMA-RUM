import {InteractionRequiredAuthError, IPublicClientApplication} from "@azure/msal-browser";
import {TOKEN_REQUEST} from "../constants";

export async function getAuthToken(instance: IPublicClientApplication) {
    try {
        return (await instance.acquireTokenSilent({
            scopes: TOKEN_REQUEST.scopes,
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
            await instance.acquireTokenRedirect({
                scopes:[
                    "User.Read"
                ],
                redirectUri: "/home"
            })
        }
        console.error(err);
        throw err;
    }
}