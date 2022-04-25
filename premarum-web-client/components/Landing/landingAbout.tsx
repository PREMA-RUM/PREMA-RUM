import { Box, Grid, Typography } from "@mui/material";

export default function LandingAbout() {
    return(
        <Box sx={classes.landingAbout}>

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
        
            <Box
                sx={classes.rumLogo}
                component="img"
                alt="UPRM"
                src="rum-logo-transparent.svg"
            />
              
        </Box>
    )
}

const useStyles = {
    landingAbout: {
        height: '100%',
        minHeight: '100vh',
        padding: '0 0 0 0',
        direction: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",

        background: `linear-gradient(rgba(22,74,65,0.6), rgba(0,0,0,0.6)),
                    url(backgroundImage2.png)`,
        backgroundColor: 'secondary.main',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    },
    mainGrid: {
        height: '100%',
    },
    landingAboutTitle: {
        color: 'white',
        padding: '80px 0 0 0',
    },
    videoBox: {
        width: '100%',
        textAlign: '-webkit-center',
        padding: '40px 0',
    },
    videoBoxWrapper2: { 
        width: '100%',
        maxWidth: '950px',
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
    rumLogo: {
        width: "100%",
        height: "250px",
        marginTop: 3,
        marginBottom: 3,
    },
}
  
const classes = useStyles;