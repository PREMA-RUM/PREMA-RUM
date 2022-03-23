import { PopupRequest } from "@azure/msal-browser";

export const HOST = process.env.NEXT_PUBLIC_HOST;

export const TOKEN_REQUEST:PopupRequest = {
    scopes:["api://83c3cbe7-f00e-4ea8-87d8-bf4d75690f17/access_as_user"],
}