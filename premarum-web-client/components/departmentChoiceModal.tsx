import { CloseRounded } from "@mui/icons-material";
import { Modal, Fade, Grid, Card, CardHeader, Divider, CardContent, Stack, CircularProgress, Autocomplete, TextField, CardActions, Button, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useStudent } from "../utility/hooks/useStudent";
import { IDepartmentResponse } from "../utility/requests/responseTypes";
import {useTheme} from "@mui/material/styles";

type DeptProps = {
    departments: IDepartmentResponse[],
    openModalState: boolean,
    allowClose: boolean,
    setOpenModalState: any,
}

export function StudentDepartmentModal(props: DeptProps) {
    const {student, isLoading:studentLoading, updateStudentDepartment} = useStudent()
    const [modalLoading, setModalLoading] = React.useState(false);
    const [studentDept, setStudentDept] = React.useState(student?.departmentId)
    const classes = useStyles()

    const handleModalClose = () => {
        props.setOpenModalState(false);
    };

    const handleDepartmentChange = (id: any) => {
        setStudentDept(id)
    }

    async function handleUpdateDepartment() {
        setModalLoading(true)
        try {
            await updateStudentDepartment(studentDept!)
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
            disableEscapeKeyDown
        >
            <Fade in={props.openModalState}>
                <Grid container direction="row" justifyContent="center" alignItems="center" sx={classes.modalGridMain}>
                    <Card sx={classes.modalCard}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <CardHeader
                                title="Please Select Your Department"
                            />
                            {props.allowClose?
                                <IconButton
                                    disabled={modalLoading || !studentDept}
                                    onClick={handleModalClose}
                                    sx={classes.closeButton}>
                                    <CloseRounded sx={classes.closeButtonIcon}/>
                                </IconButton>
                            :<></>}
                        </Grid>

                        <Divider/>

                        <CardContent sx={classes.cardContent}>
                            {modalLoading ? (
                                <Stack alignItems="center" justifyContent="center">
                                    <CircularProgress/>
                                </Stack>
                            ) : (
                                <>
                                    <Autocomplete
                                        id="tags-outlined"
                                        options={props.departments}
                                        getOptionLabel={(option) => `${option.departmentName}`}
                                        filterSelectedOptions
                                        defaultValue={props.departments.find(b => b.departmentId === student?.departmentId)}
                                        onChange={(event, newValue) => {handleDepartmentChange(newValue?.departmentId)}}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Department Selection"
                                                placeholder="Select a Department..."
                                            />
                                        )}
                                    />
                                </>
                            )}
                        </CardContent>

                        <Divider/>

                        <CardActions sx={classes.cardActions}>
                            <Button
                                disabled={modalLoading || !studentDept}
                                onClick={handleUpdateDepartment}
                            >
                                    Submit
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Fade>
        </Modal>
    )
}

const useStyles = () => {
    const theme = useTheme()
    
    return {
        modalGridMain: {
            width: '100%',
            height: '100%',
        },
        modalCard: {
            [theme.breakpoints.down("sm")]: {
              width: '90%', minHeight: '40%'  
            },
            width: '60%',
            minHeight: '30%',
            backgroundColor: grey[50],
        },
        closeButton: {
            marginRight: 1,
        },
        closeButtonIcon: {
            [theme.breakpoints.down("sm")]: {
                fontSize: 25
            },
            fontSize: '30px',
        },
        cardContent: {
            [theme.breakpoints.down("sm")]: {
                p: 1, 
                pt:5, 
                pb: 5
            },
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
        }
    }
};
