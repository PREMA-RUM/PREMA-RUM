import { Modal, Fade, Grid, Card, CardHeader, Divider, CardContent, Stack, CircularProgress, TextField, CardActions, Button, Theme, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { usePreEnrollment } from "../utility/hooks/usePreEnrollments";

type PreEnrollmentProps = {
    openModalState: boolean,
    setOpenModalState: any,
    preEnrollmentId: number
}

export default function UpdatePreEnrollmentTitleModal(props: PreEnrollmentProps) {
    const {preEnrollment, updateTitle} = usePreEnrollment(props.preEnrollmentId) 
    const theme = useTheme()
    const classes = useStyles(theme)
    const [modalLoading, setModalLoading] = React.useState(false)
    const [preenrollmentTitle, setPreenrollmentTitle] = React.useState(preEnrollment?.name)

    const handleModalClose = () => {
        props.setOpenModalState(false);
    };

    const handleTitleChange = (title: string) => {
        setPreenrollmentTitle(title)
    }

    const handleTitleEdit = async () => {
        setModalLoading(true)
        try {
            await updateTitle(preenrollmentTitle!)
        } catch (err) {
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
        >
            <Fade in={props.openModalState}>
                <Grid container direction="row" justifyContent="center" alignItems="center"
                        sx={classes.modalGridMain}>
                    <Card sx={classes.modalCard}>
                        <CardHeader
                            title="Create New Pre-Enrollment"
                        />

                        <Divider/>

                        <CardContent sx={classes.cardContent}>
                            {modalLoading ? (
                                <Stack alignItems="center" justifyContent="center">
                                    <CircularProgress/>
                                </Stack>
                            ) : (
                                <>
                                    <TextField
                                        sx={classes.titleInput}
                                        placeholder="Add Pre-Enrollment Title..."
                                        variant="outlined"
                                        fullWidth
                                        value={preenrollmentTitle}
                                        onChange={event => handleTitleChange(event.target.value)}
                                    />
                                </>
                            )}
                        </CardContent>

                        <Divider/>

                        <CardActions sx={classes.cardActions}>
                            <Button onClick={handleModalClose}>Cancel</Button>
                            <Button
                                disabled={modalLoading || !preenrollmentTitle} 
                                onClick={handleTitleEdit}>Submit</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Fade>
        </Modal>
    )
}

const useStyles = (theme: Theme) => ({
    modalGridMain: {
        width: '100%',
        height: '100%',
    },
    modalCard: {
        width: '60%',
        minHeight: '30%',
        backgroundColor: grey[50],
    },
    cardContent: {
        width: '100%',
        height: '100%',
        padding: '60px 20px',
    },
    titleInput: {
        marginBottom: 1,
    },
    cardActions: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
});