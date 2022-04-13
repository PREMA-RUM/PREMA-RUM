import { useMsal } from "@azure/msal-react";
import { CloseRounded } from "@mui/icons-material";
import { Modal, Fade, Grid, Card, CardHeader, IconButton, Divider, CardContent, Stack, CircularProgress, Typography, CardActions, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import React from "react";

type ModalProps = {
    openModalState: boolean,
    setOpenModalState: any,
}

export function LogoutModal(props: ModalProps) {
    const [open, setOpen] = React.useState(false);
    const [modalLoading, setModalLoading] = React.useState(false);

    const router = useRouter();
    const { instance } = useMsal();

    const handleLogoutClose = () => {
        props.setOpenModalState(false)
    };


    async function handleLogout() {
        setModalLoading(true)
        try {
            console.log(instance.getActiveAccount())
            await router.push('/')
            await instance.logoutPopup({
                account: instance.getActiveAccount()
            })
        }
        catch(err) {
            alert(err)
            setModalLoading(false);
            return;
        }
        handleLogoutClose()
        setModalLoading(false);
    }

    return(
        <Modal
            open={props.openModalState}
            onClose={handleLogoutClose}
            closeAfterTransition
        >
            <Fade in={props.openModalState}>
                <Grid container direction="row" justifyContent="center" alignItems="center" sx={classes.modalGridMain}>
                    <Card sx={classes.modalCard}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <CardHeader
                                title="Log Out"
                            />
                            <IconButton
                                disabled={modalLoading}
                                onClick={handleLogoutClose}
                                sx={classes.closeButton}>
                                <CloseRounded sx={classes.closeButtonIcon}/>
                            </IconButton>
                        </Grid>

                        <Divider/>

                        <CardContent sx={classes.cardContent}>
                            {modalLoading ? (
                                <Stack alignItems="center" justifyContent="center">
                                    <CircularProgress/>
                                </Stack>
                            ) : (
                                <Stack alignItems="center" justifyContent="center">
                                    <Typography>Are you sure you want to log out?</Typography>
                                </Stack>
                            )}
                        </CardContent>

                        <Divider/>

                        <CardActions sx={classes.cardActions}>
                            <Button
                                disabled={modalLoading}
                                onClick={handleLogout}
                            >
                                    Log Out
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Fade>
        </Modal>
    )
}

const useStyles = {
    modalGridMain: {
        width: '100%',
        height: '100%',
    },
    modalCard: {
        minWidth: '350px',
        width: '30%',
        backgroundColor: grey[50],
    },
    closeButton: {
        marginRight: 1,
    },
    closeButtonIcon: {
        fontSize: '30px',
    },
    cardContent: {
        width: '100%',
        height: '100%',
        padding: '40px 20px',
    },
    titleInput: {
        marginBottom: 1,
    },
    cardActions: {
        justifyContent: 'flex-end',
    },
};

const classes = useStyles;