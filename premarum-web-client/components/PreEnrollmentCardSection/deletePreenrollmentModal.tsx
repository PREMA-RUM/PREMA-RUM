import { CloseRounded } from "@mui/icons-material";
import { Modal, Fade, Grid, Card, CardHeader, IconButton, Divider, CardContent, Stack, CircularProgress, Typography, CardActions, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { usePreEnrollments } from "../../utility/hooks/usePreEnrollments";
import { IPreEnrollmentResponse } from "../../utility/requests/responseTypes";

type ModalProps = {
    openModalState: boolean,
    setOpenModalState: any,
    preEnrollment: IPreEnrollmentResponse
}

export default function DeletePreenrollmentModal(props: ModalProps) {
    const [modalLoading, setModalLoading] = React.useState(false);
    const {removePreEnrollmentFromCache} = usePreEnrollments()

    const handleModalClose = () => {
        props.setOpenModalState(false)
    };

    async function handlePreenrollmentDelete() {
        setModalLoading(true)
        try {
            await removePreEnrollmentFromCache(props.preEnrollment.id)
        }
        catch(err) {
            alert(err)
            setModalLoading(false);
            return;
        }
        handleModalClose()
        setModalLoading(false);
    }

    return(
        <Modal
            open={props.openModalState}
            onClose={handleModalClose}
            closeAfterTransition
            onClick={(event) => {event.stopPropagation()}}
        >
            <Fade in={props.openModalState}>
                <Grid container direction="row" justifyContent="center" alignItems="center" sx={classes.modalGridMain}>
                    <Card sx={classes.modalCard}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <CardHeader
                                title={`Deleting Pre-Enrollment: ${props.preEnrollment.name}`}
                            />
                        </Grid>

                        <Divider/>

                        <CardContent sx={classes.cardContent}>
                            {modalLoading ? (
                                <Stack alignItems="center" justifyContent="center">
                                    <CircularProgress/>
                                </Stack>
                            ) : (
                                <Stack alignItems="center" justifyContent="center">
                                    <Typography>Are you sure you want to delete preenrollment {props.preEnrollment.name}?</Typography>
                                    <Typography>This action is irreversible and the data will be lost.</Typography>
                                </Stack>
                            )}
                        </CardContent>

                        <Divider/>

                        <CardActions sx={classes.cardActions}>
                            <Button
                                disabled={modalLoading}
                                onClick={handleModalClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={modalLoading}
                                onClick={handlePreenrollmentDelete}
                            >
                                Delete
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