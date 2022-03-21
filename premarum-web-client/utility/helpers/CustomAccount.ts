import { AccountInfo } from "@azure/msal-browser";

export default interface PremaRumUserAccount extends AccountInfo {
    email: string
    departmentId: number,
    id: number
}