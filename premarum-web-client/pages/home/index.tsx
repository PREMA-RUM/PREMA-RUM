import {
    Autocomplete,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Fade,
    Grid,
    Modal, Stack,
    TextField,
    useTheme,
    Theme, useMediaQuery, Box
} from '@mui/material'
import {grey} from '@mui/material/colors';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import getAllSemesters from "../../utility/requests/getAllSemesters";
import {
    IApiProblem,
    IDepartmentResponse,
    IPreEnrollmentResponse,
    ISemesterResponse
} from "../../utility/requests/responseTypes";
import {
    useMutatePreEnrollmentsCache, usePreEnrollments,
} from "../../utility/hooks/usePreEnrollments";
import createPreEnrollment from "../../utility/requests/createPreEnrollment";
import {useMsal} from "@azure/msal-react";
import PreEnrollmentCardSection from "../../components/PreEnrollmentCardSection";
import { StudentDepartmentModal } from '../../components/departmentChoiceModal';
import getAllDepartments from '../../utility/requests/getAllDepartments';
import { useStudent } from '../../utility/hooks/useStudent';
import {MobileTopArea} from "../../components/Home/MobileTopArea";
import {WideScreenCard} from "../../components/Home/WideScreenCard";
import axios from "axios";

type HomeProps = {
    semesters: ISemesterResponse[],
    departments: IDepartmentResponse[],
}

export default function Home(props: HomeProps) {
    const {instance} = useMsal();
    const [open, setOpen] = React.useState(false);
    const [deptOpen, setDeptOpen] = useState(false);
    const [modalLoading, setModalLoading] = React.useState(false);
    const [newPreEnrollmentName, setNewPreEnrollmentName] = useState("");
    const [newPreEnrollmentSemester, setNewPreEnrollmentSemester] = useState<ISemesterResponse | null>(null)
    const mutatePreEnrollmentCache = useMutatePreEnrollmentsCache();
    const {student, isLoading:studentLoading} = useStudent()
    const {preEnrollments} = usePreEnrollments()
    
    const [filterBySemester, setFilterBySemester] = useState<ISemesterResponse | null>(null) 
    
    const theme = useTheme()
    const classes = useStyles(theme)
    const matches = useMediaQuery(theme.breakpoints.down('sm'), {noSsr:true});

    const router = useRouter();

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    const handlePreEnrollmentCreate = async () => {
        setModalLoading(true)
        let result: IPreEnrollmentResponse;
        try {
            result = await createPreEnrollment(instance, {
                semesterId: newPreEnrollmentSemester!.id,
                name: newPreEnrollmentName
            });
        } catch (err) {
            // TODO: Switch with correct backend error message
            if (axios.isAxiosError(err)) {
                const message = (err.response!.data as IApiProblem).detail
                alert(message)
            } else {
                alert("Something went wrong. Try Again.")
            }
            setModalLoading(false);
            return;
        }
        setNewPreEnrollmentName("");
        setNewPreEnrollmentSemester(null);
        await mutatePreEnrollmentCache(result);
        await router.push(`/preenrollment/${result.id}`)
    }

    useEffect(() => {
        if (!studentLoading) {
            setDeptOpen(!student?.departmentId)
        }
    }, [student, studentLoading])

    return (
        <Box  sx={classes.mainBox}>
            <StudentDepartmentModal
                departments={props.departments}
                openModalState={deptOpen}
                allowClose={false}
                setOpenModalState={setDeptOpen}
            />
            
            <Grid container direction="column" sx={classes.mainGrid}>
                <Grid item>
                    {
                        matches? <MobileTopArea 
                            semesters={props.semesters}
                            filterState={filterBySemester}
                            setFilterState={setFilterBySemester}
                            handleModalOpen={handleModalOpen} 
                        />: <WideScreenCard
                            filterState={filterBySemester}
                            setFilterState={setFilterBySemester}
                            semesters={props.semesters} 
                            handleModalOpen={handleModalOpen} 
                        />
                    }
                </Grid>
                <Grid item>
                    {matches?
                        <Box sx={preEnrollments?.length===0?classes.contentCardEmpty:classes.contentCard}>
                            <PreEnrollmentCardSection 
                                filterBySemester={filterBySemester} 
                                handleModalOpen={handleModalOpen}
                            />
                        </Box>:
                        <Card sx={preEnrollments?.length===0?classes.contentCardEmpty:classes.contentCard}>
                            <PreEnrollmentCardSection 
                                filterBySemester={filterBySemester} 
                                handleModalOpen={handleModalOpen}
                            />
                        </Card>
                    }
                </Grid>
            </Grid>

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
                                            value={newPreEnrollmentName}
                                            onChange={event => setNewPreEnrollmentName(event.target.value)}
                                        />

                                        <Autocomplete
                                            id="tags-outlined"
                                            options={props.semesters}
                                            getOptionLabel={(option) => `${option.term}-${option.year}`}
                                            filterSelectedOptions
                                            onChange={(event, newValue) => {
                                                setNewPreEnrollmentSemester(newValue as ISemesterResponse);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Semester Selection"
                                                    placeholder="Select Semester..."
                                                />
                                            )}
                                        />
                                    </>
                                )}
                            </CardContent>

                            <Divider/>

                            <CardActions sx={classes.cardActions}>
                                <Button onClick={handleModalClose}>Cancel</Button>
                                <Button
                                    disabled={modalLoading || !newPreEnrollmentName || !newPreEnrollmentSemester} // disable when modal is loading
                                    onClick={handlePreEnrollmentCreate}>Submit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Fade>
            </Modal>
        </Box>
    )
}

const useStyles = (theme: Theme) => ({
    mainBox: {
        width:'100%'
    },
    mainGrid: {
    },
    contentCard: {
        padding: '25px',
        minHeight: '80vh',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'secondary.light',
        [theme.breakpoints.down("sm")] : {
            backgroundColor: 'transparent',
            padding: 0,
        },
    },
    contentCardEmpty: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        width: '100%',
        [theme.breakpoints.up("sm")] : {
            backgroundColor: 'secondary.light',
        }
    },
    contentText: {
        padding: '2px 10px',
    },
    itemStyle: {
        width: '100%',
    },
    modalGridMain: {
        width: '100%',
        height: '90%',
    },
    modalCard: {
        [theme.breakpoints.down("sm")]: {
            width: "90%"
        },
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
});

export async function getStaticProps() {
    return {
        props: {
            semesters: await getAllSemesters(),
            departments: await getAllDepartments()
        }, // will be passed to the page component as props
        revalidate: 3600*2 // revalidate every 2 hours
    }
}