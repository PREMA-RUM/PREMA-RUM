import * as React from "react";
import {Box, Button, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useMsal} from "@azure/msal-react";
import {PopupRequest} from "@azure/msal-browser";

type ButtonProps = {
    
}

const LoginButton: React.FunctionComponent<ButtonProps> = () => {
    const { instance, inProgress } = useMsal();
    
    if (inProgress === "login") {
        return (
            <Button size="large" sx={classes.loginButton} disabled>
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
                            src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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