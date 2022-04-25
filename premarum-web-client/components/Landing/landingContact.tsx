import { Box } from "@mui/material";

export default function LandingContact() {
    return(
        <Box sx={classes.landingContact}>

        </Box>
    )
}

const useStyles = {
    landingContact: {
        width: '100%',
        height: '100vh',
        minHeight: '500px',
        padding: '0 0 0 0',
        background: `linear-gradient(rgba(22,74,65,0.6), rgba(0,0,0,0.6)),
                    url(backgroundImage2.png)`,
        backgroundColor: 'secondary.main',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    },
}
  
const classes = useStyles;