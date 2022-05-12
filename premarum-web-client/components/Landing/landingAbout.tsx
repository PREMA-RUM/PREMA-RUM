import { Box, Grid, Typography, Grow, useTheme, useMediaQuery } from "@mui/material";
import useIsMobile from "../../utility/hooks/useIsMobile";
import LandingContainer from "./landingContainer";
import Image from "next/image";

export default function LandingAbout() {
    const classes = useStyles();
    //const matches = useMediaQuery(`(max-height: 1000px)`)

    return(
        <LandingContainer>
            <Grid container direction='column' justifyContent='center' alignItems="center" sx={classes.landingAbout}>
                <Box sx={classes.bodyWrapper}>

                    <Box sx={classes.premaIconWrapper}>
                        <Image
                            height={100}
                            width={100}
                            alt="PREMARUM-ICON"
                            src="/prema-icon.png"
                        />
                    </Box>

                    <Typography align="center" sx={classes.landingAboutTitle}>What is PREMARUM?</Typography>

                    <Box sx={classes.videoBox}>
                        <Box sx={classes.videoBoxWrapper2}>
                            <Box sx={classes.videoBoxWrapper}>
                                <Box sx={classes.videoWrapper}>
                                    <Box
                                        sx={classes.videoFrame}
                                        component="iframe"
                                        frameBorder="0"
                                        title="PREMARUM Demo Video"
                                        allowFullScreen
                                        src="https://www.youtube.com/embed/v-1e9KQL0WQ"
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Typography align="center" variant="h5" sx={classes.landingAboutSubtitle}>Designed for UPRM students, by UPRM students.</Typography>

                    <Box sx={classes.rumLogoWrapper}>
                        <Box
                            sx={classes.rumLogo}
                            component="img"
                            alt="UPRM"
                            src="rum-logo-transparent.svg"
                        />
                    </Box>
                </Box>
            </Grid>
        </LandingContainer>
    )
}

const useStyles = () => {
    const theme = useTheme()

    return {
        landingAbout: {
            padding: '0 30px',
            [theme.breakpoints.down("sm")]: {
                minHeight: '70vh'
            },
            minHeight: '100vh'
        },
        bodyWrapper: {
            width: '100%',
            height: '100%',
            padding: '100px 0 0 0',
            [theme.breakpoints.down("sm")]: {
                pt:10
            },
        },
        bodyWrapperMobile: {
            width: '100%',
            height: '100%',
            padding: '100px 0 0 0',
        },
        premaIconWrapper: {
            width: '100%',
            height: '100%',
            textAlign: 'center',
            padding: '0 0 20px 0',

        },
        premaIcon: {
            width: '100%',
            height: '100%',
            maxWidth: '100px',
        },
        mainGrid: {
            height: '100%',
        },
        landingAboutTitle: {
            color: 'white',
            fontWeight: 400,
            fontSize: '3.8rem'
        },
        videoBox: {
            width: '100%',
            textAlign: '-webkit-center',
            padding: '40px 0',
        },
        videoBoxWrapper2: { 
            width: '100%',
            maxWidth: '720px',
            padding: '0 20px',
        },
        videoBoxWrapper: { // 16:9 ratio
            width: '100%',
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
        landingAboutSubtitle: {
            color: 'white',
            padding: '0 0 0 0',
        },
        rumLogoWrapper: {
            width: '100%',
        },
        rumLogo: {
            width: "100%",
            height: "250px",
            [theme.breakpoints.down('sm')]: {
                height: "150px",
            },
            marginTop: 3,
            marginBottom: 3,
        },
}}