import { Box, Grid, Typography, Grow } from "@mui/material";

export default function LandingAbout() {
    return(
        <Grow
            in={true}
            {...{ timeout: 1000 }}
        >
            <Grid container direction='column' justifyContent='center' alignItems="center" sx={classes.landingAbout}>
                <Box sx={classes.bodyWrapper}>
                    <Typography align="center" variant="h3" sx={classes.landingAboutTitle}>What is PREMARUM?</Typography>

                    <Box sx={classes.videoBox}>
                        <Box sx={classes.videoBoxWrapper2}>
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
        </Grow>
    )
}

const useStyles = {
    landingAbout: {
        padding: '0 30px',
        minHeight: '100vh',
    },
    bodyWrapper: {
        width: '100%',
        height: '100%',
        padding: '74px 0 0 0',
    },
    mainGrid: {
        height: '100%',
    },
    landingAboutTitle: {
        color: 'white',
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
        
    },
    rumLogo: {
        width: "100%",
        height: "250px",
        marginTop: 3,
        marginBottom: 2,
    },
}
  
const classes = useStyles;