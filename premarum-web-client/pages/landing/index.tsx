import {Box, Button, Card, CardContent, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useMsal} from "@azure/msal-react";
import {PopupRequest} from "@azure/msal-browser";
import getOrCreateUser from "../../utility/requests/getOrCreateUser";
import { TOKEN_REQUEST } from "../../utility/constants";
import {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useState} from "react";
import OverlayIcons from "../../components/OverlayIcons";

type ButtonProps = {
    
}

const BREAKPOINT_WIDTH = 750

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

export default function Landing() {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down(BREAKPOINT_WIDTH), {noSsr:true});

    return(
        // <Grid container direction="column" justifyContent="center" alignItems="center">
        <Box sx={classes.fullBox}>
            <OverlayIcons />

            <Box sx={classes.topBox}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    {/* <Typography align="center" variant="h1" sx={classes.topTitle}>PREMA-RUM</Typography> */}
                    <Box
                        sx={classes.premaLogo}
                        component="img"
                        alt="PREMARUM"
                        src="prema-logo-white.png"
                    />
                    <Typography align="center" variant="h5" sx={classes.topSubtitle}>
                        The easiest way to prepare yourself for your next semester.<br/>
                        The app for creating enrollment logistical plans, storing, and sharing them with the community.
                    </Typography>
                    <LoginButton/>
                </Grid>
            </Box>

            <Box sx={classes.bottomBox}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Typography align="center" variant="h3" sx={classes.bottomTitle}>What is PREMARUM?</Typography>
                    <Box>
                        {matches?
                            <iframe
                                width="500"
                                height="280"
                                frameBorder="0"
                                title="PREMA-RUM Demo Video"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            />
                        :
                            <iframe
                                width="720"
                                height="420"
                                frameBorder="0"
                                title="PREMARUM Demo Video"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            />
                        }
                    </Box>
                    <Typography align="center" variant="h5" sx={classes.bottomSubtitle}>Designed for UPRM students, by UPRM students.</Typography>
                    <Box
                        sx={classes.rumLogoBox}
                        component="img"
                        alt="UPRM"
                        src="rum-logo-transparent.svg"
                    />
                </Grid>
            </Box>
        
        </Box>
    )
}

Landing.getLayout = function getLayout(page: NextPage) {
    return (
        page
    )
}


const useStyles = {
    loginButton: {
        color: 'black',
        backgroundColor: 'secondary.light',
        marginTop: 3,
        marginBottom: 4,
    },
    fullBox: {
        width: '100%',
        height: '100%',
    },
    topBox: {
        backgroundColor: 'primary.main',
        width: '100%',
        minHeight: '250px',
    },
    premaLogo: {
        maxWidth: '700px',
        height: '100%',
    },
    topTitle: {
        padding: '20px 20px 10px 20px',
    },
    topSubtitle: {
        width: '100%',
        padding: '0 20px',
    },
    bottomBox: {
        backgroundColor: 'secondary.main',
        width: '100%',
        minHeight: '500px',
    },
    bottomTitle: {
        padding: '20px',
    },
    bottomSubtitle: {
        padding: '20px',
    },
    rumLogoBox: {
        width: "250px",
        height: "250px",
        marginBottom: 3
    }
};
  
const classes = useStyles;