import { CheckRounded } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Grow, IconButton, Snackbar, TextField, Typography, useMediaQuery} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import useIsMobile from "../../utility/hooks/useIsMobile";
import LandingContainer from "./landingContainer";

export default function LandingContact() {
    const [open, setOpen] = React.useState(false);
    const [successful, setSuccessful] = React.useState(true);
    const isMobile = useIsMobile()
    const matches = useMediaQuery(`(max-height: 1000px)`)

    const handleSubmit = () => {
        try {
            //
            //
            // add functionality, swap successful to false if wrong
            //
            //
            setSuccessful(true)
        } catch(err) {
            setSuccessful(false)
        } finally {
            setOpen(true);
        } 
    };

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <>
        <LandingContainer>
            <Grid container direction='column' justifyContent='center' alignItems="center" sx={classes.landingContact}>
                <Box sx={matches? classes.bodyWrapperMobile : classes.bodyWrapper}>
                    <Card sx={classes.cardContainer}>

                        <CardHeader title='Contact Us!' sx={classes.cardHeader}/>

                        <Divider/>

                        <CardContent sx={classes.cardContent}>
                            <Grid container rowSpacing={2} columnSpacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="First Name" variant="outlined" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Last Name" variant="outlined" fullWidth/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Email" variant="outlined" fullWidth/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Message" variant="outlined" fullWidth multiline rows={3}/>
                                </Grid>
                            </Grid>
                        </CardContent>

                        <Divider/>

                        <CardActions sx={classes.cardActions}>
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <Button fullWidth sx={classes.submitButton} onClick={handleSubmit}>Submit</Button>
                            </Grid>
                        </CardActions>
                        
                    </Card>
                </Box>

                <Grid container direction="row" justifyContent="space-around" alignItems="center" sx={classes.devContainer}>

                    <Grid item sx={classes.devItem}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <IconButton
                                disableRipple
                                href="https://github.com/joseriveramorales"
                                target="_blank"
                            >
                                <Box
                                    sx={classes.devIcon}
                                    component="img"
                                    alt="Developer"
                                    src="dev-jose-profile.jfif"
                                />
                            </IconButton>
                            <Typography variant="h4" sx={classes.devName}>José Rivera</Typography>
                            <Typography variant="h6" sx={classes.devName}>Backend Dev</Typography>
                        </Grid>
                    </Grid>

                    <Grid item sx={classes.devItem}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <IconButton
                                disableRipple
                                href="https://github.com/kenneth-rosario"
                                target="_blank"
                            >
                                <Box
                                    sx={classes.devIcon}
                                    component="img"
                                    alt="Developer"
                                    src="dev-kenneth-profile.jfif"
                                />
                            </IconButton>
                            <Typography variant="h4" sx={classes.devName}>Kenneth Rosario</Typography>
                            <Typography variant="h6" sx={classes.devName}>Backend Dev</Typography>
                        </Grid>
                    </Grid>

                    <Grid item sx={classes.devItem}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <IconButton
                                disableRipple
                                href="https://github.com/YMari"
                                target="_blank"
                            >
                                <Box
                                    sx={classes.devIcon}
                                    component="img"
                                    alt="Developer"
                                    src="dev-yavier-profile.jfif"
                                />
                            </IconButton>
                            <Typography variant="h4" sx={classes.devName}>Yavier Mari</Typography>
                            <Typography variant="h6" sx={classes.devName}>Frontend Dev</Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </LandingContainer>

        <Snackbar
            open={open}
            autoHideDuration={6000} 
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={isMobile? ({ children}) => children : Grow}
            sx={classes.snackbar}
        >
            {successful?
                <Alert
                    sx={classes.alert}
                    onClose={handleClose}
                    icon={<CheckRounded fontSize="inherit" />}
                    severity="success"
                    variant='filled'
                >
                    Success — Your message has been sent.
                </Alert>
            :
                <Alert
                    sx={classes.alert}
                    onClose={handleClose}
                    icon={<CheckRounded fontSize="inherit" />}
                    severity="error"
                    variant='filled'
                >
                    Error — Your message could not be sent. Please try again later.
                </Alert>
            }    
        </Snackbar>

        </>
    )
}

const useStyles = {
    landingContact: {
        padding: '0 30px',
        minHeight: '100vh',
    },
    bodyWrapper: {
        
    },
    bodyWrapperMobile: {
        padding: '100px 0 20px 0', 
    },
    cardContainer: {
        maxWidth: '700px',
        borderRadius: '20px'
    },
    cardHeader: {
        textAlign: 'center',
    },
    cardContent: {
        
    },
    cardActions: {

    },
    submitButton: {
        color: 'primary.main'
    },
    snackbar: {
        
    },
    alert: {
        width: '100%',
    },
    devContainer: {
        maxWidth: '1200px',
        padding: '20px 0',
    },
    devItem: {
        padding: '0 20px',
        transition: '0.5s all ease',
        opacity: '0.8',
        textShadow: '0',
        '&:hover': {
            transition: '0.5s all ease',
            opacity: '1',
            textShadow: ' 0 0 3px #fff',
        },
    },
    devIcon: {
        transition: '0.5s all ease',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
    },
    devName: {
        color: 'white',
    },
}
  
const classes = useStyles;