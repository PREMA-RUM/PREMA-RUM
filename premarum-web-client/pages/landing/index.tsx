import {Box, Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {useMsal} from "@azure/msal-react";
import {PopupRequest} from "@azure/msal-browser";
import getOrCreateUser from "../../utility/requests/getOrCreateUser";
import { TOKEN_REQUEST } from "../../utility/constants";
import {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useState} from "react";

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
    return(
        // <Grid container direction="column" justifyContent="center" alignItems="center">
        <>
        
        <Card elevation={0} square sx={classes.topCard}>
            <CardContent>
                <Grid container direction="column" justifyContent="space-around" alignItems="center">
                    <Typography variant="h1" sx={classes.topTitle}>PREMA-RUM</Typography>
                    <Typography variant="h5" sx={classes.topSubtitle}>The easiest way to prepare yourself for your next semester.</Typography>
                    <Typography variant='h5' sx={classes.topSubtitle}>The app for creating enrollment logistical plans, storing, and sharing them with the community.</Typography>
                    <LoginButton/>
                </Grid>
            </CardContent>
        </Card>

        <Card elevation={0} square sx={classes.bottomCard}>
            <CardContent>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Typography variant="h3" sx={classes.bottomTitle}>What is PREMA-RUM?</Typography>
                    <Box>
                        <iframe
                            width="720"
                            height="420"
                            frameBorder="0"
                            title="PREMA-RUM Demo Video"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        />
                    </Box>
                    <Typography variant="h5" sx={classes.bottomSubtitle}>Designed for UPRM students, by UPRM students.</Typography>
                    <Box
                        sx={classes.boxSize}
                        component="img"
                        alt="UPRM"
                        src="https://www.uprm.edu/wdt/resources/seal-rum-uprm.svg"
                    />
                </Grid>
            </CardContent>
        </Card>

        </>
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
        marginTop: 5,
    },
    fullContainer: {
        width: '100%',
        height: '100%',
    },
    topCard: {
        backgroundColor: 'primary.main',
        width: '100%',
        minHeight: '350px',
    },
    topTitle: {
        padding: '20px 0 10px 0',
    },
    topSubtitle: {
        
    },
    bottomCard: {
        backgroundColor: 'info.light',
        width: '100%',
        minHeight: '500px',
    },
    bottomTitle: {
        padding: '20px 0 20px 0',
    },
    bottomSubtitle: {
        padding: '20px 0 20px 0',
    },
    boxSize: {
        width: "250px",
        height: "250px",
    }
};
  
const classes = useStyles;