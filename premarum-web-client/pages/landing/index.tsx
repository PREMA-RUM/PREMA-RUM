import {Box, Button, Card, CardContent, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useMsal} from "@azure/msal-react";
import {PopupRequest} from "@azure/msal-browser";
import getOrCreateUser from "../../utility/requests/getOrCreateUser";
import { TOKEN_REQUEST } from "../../utility/constants";
import {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useRef, useState} from "react";
import OverlayIcons from "../../components/OverlayIcons";
import { url } from "inspector";
import { ExpandMoreOutlined } from "@mui/icons-material";

type ButtonProps = {
    
}

const BREAKPOINT_SMALL = 350
const BREAKPOINT_MID = 750

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

export function DemoVideo() {
    const theme = useTheme()
    const matchesS = useMediaQuery(theme.breakpoints.down(BREAKPOINT_SMALL), {noSsr:true});
    const matchesM = useMediaQuery(theme.breakpoints.down(BREAKPOINT_MID), {noSsr:true});
    
    // if(matchesS){
    //     return(
    //         <iframe
    //             width="300"
    //             height="170"
    //             frameBorder="0"
    //             title="PREMARUM Demo Video"
    //             src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    //         />
    //     )
    // } else if(matchesM) {
    //     return(
    //         <iframe
    //             width="480"
    //             height="270"
    //             frameBorder="0"
    //             title="PREMARUM Demo Video"
    //             src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    //         />
    //     )
    // } else {
    //     return(
    //         <iframe
    //             width="720"
    //             height="420"
    //             frameBorder="0"
    //             title="PREMARUM Demo Video"
    //             src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    //         />
    //     )
    // }

    return(
        <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            title="PREMARUM Demo Video"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        />
    )
}

export default function Landing() {
    const titleRef = useRef();

    function handleClick() {
        (titleRef!.current! as any).scrollIntoView({ behavior: "smooth" });
    }

    return(
        <Box sx={classes.fullBox}>
            <OverlayIcons />
            
            <Box sx={classes.topBox}>
                <Grid container direction="column" justifyContent="center" alignItems="center" sx={{height: '100%'}}>
                    <Grid item>
                        <Box
                            sx={classes.premaLogo}
                            component="img"
                            alt="PREMARUM"
                            src="prema-logo-white-up.png"
                        />
                    </Grid>
                    <Grid item>
                        <Typography align="center" variant="h4" sx={classes.topSubtitle1}>
                            The easiest way to prepare yourself for your next semester.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography align="center" sx={classes.topSubtitle2}>
                            The app for creating enrollment logistical plans, storing, and sharing them with the community.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <LoginButton/>
                    </Grid>

                    <Button
                        sx={classes.learnMorebutton}
                        startIcon={<ExpandMoreOutlined/>} 
                        endIcon={<ExpandMoreOutlined/>}
                        onClick={handleClick}
                    >
                        Learn more
                    </Button>

                </Grid>
            </Box>

            <Box sx={classes.bottomBox} ref={titleRef}>
                <Grid container direction="column" justifyContent="space-between" alignItems="center">
                    <Typography align="center" variant="h3" sx={classes.bottomTitle}>What is PREMARUM?</Typography>
                    
                    <Box sx={classes.videoBox}>
                        <Box sx={classes.videoBoxWrapper}>
                            <Box sx={classes.videoWrapper}>
                                <Box
                                    sx={classes.videoFrame}
                                    component="iframe"
                                    frameBorder="0"
                                    title="PREMARUM Demo Video"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                />
                            </Box>
                        </Box>
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
    backImage: {
        position: 'absolute',
        opacity: 0.5,
        zIndex: 0,
        width: '100%',
        height: '100%',
    },
    loginButton: {
        color: 'black',
        backgroundColor: 'secondary.main',
        marginTop: 3,
        marginBottom: 4,
        minWidth: '200px',
    },
    fullBox: {
        width: '100%',
        height: '100%',
    },
    topBox: {
        width: '100%',
        height: '100vh',
        background: `linear-gradient(rgba(22,74,65,0.6), rgba(0,0,0,0.6)),
                    url(backgroundImage2.png)`,
        backgroundColor: 'primary.main',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    },
    premaLogo: {
        width: '100%',
        height: '100%',
        maxWidth: '700px',
    },
    topTitle: {
        padding: '20px 20px 10px 20px',
    },
    topSubtitle1: {
        color: 'white',
        width: '100%',
        padding: '0 20px',
    },
    topSubtitle2: {
        color: 'white',
        width: '100%',
        padding: '0 20px',
        marginTop: 2.5,
        fontSize: '1.1rem',
        fontWeight: 400,
    },
    learnMorebutton: {
        position: 'absolute',
        bottom: 20,
        color: 'white',
    },
    bottomBox: {
        width: '100%',
        height: '100vh',
        minHeight: '500px',
        padding: '0 0 0 0',
        background: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.5)),
                    url(backgroundImage.png)`,
        backgroundColor: 'secondary.main',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    },
    videoBox: { 
        width: '100%',
        maxWidth: '720px',
        height: '100%',
        padding: '0 20px'
    },
    videoBoxWrapper: { // 16:9 ratio
        width: '100%',
        height: 0,
        paddingBottom: '56.25%',
        position: 'relative',
    },
    videoWrapper: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    videoFrame: {
        width: '100%',
        height: '100%',
    },
    bottomTitle: {
        padding: '25px 0',
    },
    bottomSubtitle: {
        padding: '25px 0',
    },
    rumLogoBox: {
        width: "250px",
        height: "250px",
        marginBottom: 3,
    }
};
  
const classes = useStyles;