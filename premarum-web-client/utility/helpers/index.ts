import { InteractionRequiredAuthError, IPublicClientApplication } from "@azure/msal-browser";
import { TOKEN_REQUEST } from "../constants";

export async function getAuthToken(instance: IPublicClientApplication) {
    try {
        const token = (await instance.acquireTokenSilent({
            scopes:["api://83c3cbe7-f00e-4ea8-87d8-bf4d75690f17/access_as_user"],
        })).accessToken;
        return token;
    } catch(err) {
        if (err instanceof InteractionRequiredAuthError) {
            return await (await instance.acquireTokenPopup(TOKEN_REQUEST)).accessToken;
        }
        console.error(err);
        throw err;
    }
}