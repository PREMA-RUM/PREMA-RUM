import { PopupRequest } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Button, Box, Grid, Typography, Grow} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { TOKEN_REQUEST } from "../../utility/constants";
import getOrCreateUser from "../../utility/requests/getOrCreateUser";

type ButtonProps = {
    
}

const LoginButton: React.FunctionComponent<ButtonProps> = () => {
    const { instance, inProgress } = useMsal();
    const [loginLoading, setLoginLoading] = useState(false);
    const router = useRouter();
    
    if (inProgress === "login" || loginLoading) {
        return (
            <Button size="large" sx={classes.loginButton} disabled>
                Authentication In Progress...
            </Button>
        )
    }
    
    let loginRequest:PopupRequest = {
        ...TOKEN_REQUEST
    }
    
    async function loginBehavior() {
        setLoginLoading(true)
        try {
            const res = await instance.loginPopup(loginRequest)
            await instance.setActiveAccount(res.account)
        } catch(err: any) {
            alert("Login Failed. Try Again.");
            console.error(err);
            setLoginLoading(false)
            return
        }

        try {
            await getOrCreateUser(instance);
            await router.push("/home");
        } catch(err) {
            alert("Login Failed. Try Again.");
            console.error(err);
            await instance.logoutRedirect({
                onRedirectNavigate: (url) => {
                    return false
                }
            })
            setLoginLoading(false);
        }
    }
    
    return (
        <Button size="large" sx={classes.loginButton} onClick={loginBehavior}>
            Get Started
        </Button>
    )
}

export default function LandingHome() {

    return(
        <Grow
            in={true}
            {...{ timeout: 1000 }}
        >
            <Grid container direction='column' justifyContent='center' alignItems="center" sx={classes.landingHome}>

                <Box
                    sx={classes.premaLogo}
                    component="img"
                    alt="PREMARUM"
                    src="prema-logo-white-up.png"
                />

                <Typography align="center" variant="h4" sx={classes.landingHomeSubtitle1}>
                    The easiest way to prepare yourself for your next semester.
                </Typography>

                <Typography align="center" sx={classes.landingHomeSubtitle2}>
                    The app for creating enrollment logistical plans, storing, and sharing them with the community.
                </Typography>

                <LoginButton/>

            </Grid>
        </Grow>
    )
}

const useStyles = {
    loginButton: {
        color: 'black',
        backgroundColor: 'secondary.main',
        marginTop: 3,
        marginBottom: 4,
        minWidth: '200px',
    },
    landingHome: {
        padding: '0 30px',
        minHeight: '100vh',
    },
    premaLogo: {
        width: '100%',
        height: '100%',
        maxWidth: '700px',
    },
    landingHomeSubtitle1: {
        color: 'white',
        width: '100%',
        padding: '0 20px',
    },
    landingHomeSubtitle2: {
        color: 'white',
        width: '100%',
        padding: '0 20px',
        marginTop: 2.5,
        fontSize: '1.1rem',
        fontWeight: 400,
    },
}
  
const classes = useStyles;