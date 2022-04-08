import { Modal, Fade, Grid, Card, CardHeader, Divider, CardContent, Stack, CircularProgress, Autocomplete, TextField, CardActions, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useStudent } from "../utility/hooks/useStudent";
import getAllDepartments from "../utility/requests/getAllDepartments";
import { IDepartmentResponse } from "../utility/requests/responseTypes";

type DeptProps = {
    departments: IDepartmentResponse[],
    openModal: boolean,
}

export function StudentDepartmentModal(props: DeptProps) {
    const [open, setOpen] = React.useState(props.openModal);
    const {student, isLoading:studentLoading} = useStudent()
    const [modalLoading, setModalLoading] = React.useState(false);
    const [studentDept, setStudentDept] = React.useState(student?.departmentId)

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    const handleDepartmentChange = (id: any) => {
        setStudentDept(id)
    }

    return(
        <Modal
            open={open}
            onClose={handleModalClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Grid container direction="row" justifyContent="center" alignItems="center"
                    sx={classes.modalGridMain}>
                    <Card sx={classes.modalCard}>
                        <CardHeader
                            title="Please Select Your Department"
                        />

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
                                onClick={handleModalClose}
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

const useStyles = {
    modalGridMain: {
        width: '100%',
        height: '90%',
    },
    modalCard: {
        width: '60%',
        minHeight: '30%',
        backgroundColor: grey[50],
    },
    cardContent: {
        width: '100%',
        height: '100%',
        padding: '20px',
    },
    titleInput: {
        marginBottom: 1,
    },
    cardActions: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
};

const classes = useStyles;

export async function getStaticProps() {
    return {
        props: {
            departments: await getAllDepartments()
        }, // will be passed to the page component as props
    }
}