import * as React from "react";
import {Button} from "@mui/material/";
import {useMsal} from "@azure/msal-react";
import {PopupRequest} from "@azure/msal-browser";

type ButtonProps = {
    
}

const LoginButton: React.FunctionComponent<ButtonProps> = () => {
    const { instance, inProgress } = useMsal();
    
    if (inProgress === "login") {
        return (
            <Button disabled>
                Authentication In Progress...
            </Button>
        )
    }
    
    let loginRequest:PopupRequest = {
        scopes:["api://83c3cbe7-f00e-4ea8-87d8-bf4d75690f17/access_as_user"],
        redirectUri:"/"
    }
    
    function loginBehavior() {
        instance
            .loginPopup(loginRequest)
            .catch(_ => alert("Login Failed. Try Again."))
    }
    
    return (
        <Button onClick={loginBehavior}>
            Get Started
        </Button>
    )
}

export default LoginButton