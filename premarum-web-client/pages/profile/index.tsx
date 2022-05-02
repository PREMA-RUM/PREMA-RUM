import {
    Autocomplete,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Fade,
    Grid,
    Modal,
    TextField,
    Typography,
    IconButton,
    Tooltip,
    styled,
    tooltipClasses,
    TooltipProps,
    CircularProgress
} from '@mui/material'
import {CloseRounded} from '@mui/icons-material'
import React, {useState} from 'react';
import { grey } from '@mui/material/colors';
import {getAllCourses} from "../../utility/requests/getAllCourses";
import {ICourseResponse, ICoursesTakenResponse, IDepartmentResponse} from "../../utility/requests/responseTypes";
import {useCoursesTaken} from "../../utility/hooks/useCoursesTaken";
import {useStudent} from "../../utility/hooks/useStudent";
import axios, {AxiosError} from "axios";
import { StudentDepartmentModal } from '../../components/departmentChoiceModal';
import getAllDepartments from '../../utility/requests/getAllDepartments';
import useIsMobile from "../../utility/hooks/useIsMobile";
import {MobileTopArea, WideScreenTopArea} from "../../components/Profile/TopCard";
import {useTheme} from "@mui/material/styles";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 300,
    },
});

type ProfileProps = {
    courses: ICourseResponse[],
    departments: IDepartmentResponse[],
}

export default function Profile({courses, departments}: ProfileProps) {
    const [open, setOpen] = React.useState(false);
    const {coursesTaken, isLoading, addCoursesTakenToCache, removeCoursesTakenFromCache} = useCoursesTaken()
    const [deptOpen, setDeptOpen] = useState(false);
    const {student, isLoading:studentLoading} = useStudent()
    const [selectedCourses, setSelectedCourses] = useState([])
    const [coursesAdditionInProgress, setCoursesAdditionInProgress] = useState(false)
    const [coursesLoading, setCoursesLoading] = useState(false);
    const isMobile = useIsMobile()
    const classes = useStyles()

    
    const handleModalOpen = () => {
        setOpen(true);
    };
    
    const handleModalClose = () => {
        setOpen(false);
        setSelectedCourses([])
    };

    const handleDeptOpen = () => {
        setDeptOpen(true);
    };
    
    async function handleSubmit() {
        setCoursesAdditionInProgress(true)
        try {
            await addCoursesTakenToCache(
                selectedCourses.map(sc => (sc as ICourseResponse).id)
            )
        } catch(err) {
            alert(err)
            setCoursesAdditionInProgress(false)
            return
        }
        handleModalClose()
        setCoursesAdditionInProgress(false)
    }
    
    type CourseCardProps = {
        course: ICourseResponse
    }

    function CourseCard({course}: CourseCardProps) {
        
        async function handleDelete() {
            setCoursesLoading(true)
            try {
                await removeCoursesTakenFromCache([course.id])
            } catch (err) {
                if (axios.isAxiosError(err)){
                    console.log((err as AxiosError).response)
                }
                alert(err)
            } finally {
                setCoursesLoading(false)
            }
        }
        
        return(
            <CustomTooltip arrow title={`${course.courseCode} - ${course.courseName}`} placement="top">
                <Card sx={classes.courseCard}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={classes.courseCardGrid}>
                        <Grid item>
                            <Typography sx={classes.courseText}>{course.courseCode}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleDelete} size="small" sx={classes.courseDeleteIcon}><CloseRounded/></IconButton>
                        </Grid>
                    </Grid>
                </Card>
            </CustomTooltip>
        )
    }
    
    if (isLoading || studentLoading) {
        return <>
            <CircularProgress />
        </>
    }

    return (
        <> 
        <Grid container direction="column">

            <Grid item>
                {isMobile?
                    <MobileTopArea handleEdit={handleDeptOpen} handleAdd={handleModalOpen}/>:
                    <WideScreenTopArea handleEdit={handleDeptOpen} handleAdd={handleModalOpen}/>}
            </Grid>

            <Grid item>
                <Card sx={classes.contentCard}>
                    <Grid container direction='column'>

                        <Grid container direction="row" justifyContent="space-between">
                            <Typography sx={classes.contentText}>Courses Taken</Typography>
                            <Typography sx={classes.contentText}>{student!.email}</Typography>
                        </Grid>

                        <Divider/>
                        
                        <Grid container direction="row" alignContent='center' justifyContent="center" sx={classes.coursesContainer}>
                            {coursesLoading?
                                <CircularProgress />
                            :
                                <>
                                {coursesTaken!.map((ct: ICoursesTakenResponse, index: number) => (
                                    <CourseCard key={index} course={ct.course}/>
                                ))}
                                </>
                            }
                        </Grid>
                        
                    </Grid>
                </Card>
            </Grid>
          
        </Grid>

        <StudentDepartmentModal
            departments={departments}
            openModalState={deptOpen}
            allowClose={true}
            setOpenModalState={setDeptOpen}
        />   

        <Modal
            open={open}
            onClose={handleModalClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Grid container direction="row" justifyContent="center" alignItems="center" sx={classes.modalGridMain}>
                    <Card sx={classes.modalCard}>
                        <CardHeader
                            title="Add Courses Taken"
                        />

                        <Divider/>

                        <CardContent sx={classes.cardContent}>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={courses.filter(
                                    c => coursesTaken!
                                        .filter(ct => 
                                            ct.course.courseCode === c.courseCode).length === 0)
                                }
                                getOptionLabel={(option) => `${option.courseCode} - ${option.courseName}`}
                                filterSelectedOptions
                                onChange={(event:any, newValue:any) => {
                                    setSelectedCourses(newValue)
                                }}
                                value={selectedCourses}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Course Selection"
                                    placeholder="Add Courses..."
                                />
                                )}
                            />
                        </CardContent>

                        <Divider/>

                        <CardActions sx={classes.cardActions}>
                            <Button disabled={coursesAdditionInProgress} onClick={handleModalClose}>Cancel</Button>
                            <Button disabled={coursesAdditionInProgress || selectedCourses.length === 0} onClick={handleSubmit}>Submit</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Fade>
        </Modal>
        </>
    )
}

// Get courses
export async function getStaticProps() {
    return {
        props: {
            courses: await getAllCourses(),
            departments: await getAllDepartments()
        }
    }
}

const useStyles = () => {
    const theme = useTheme()
    
    return {
        searchInput: {
            backgroundColor: 'white'
        },
        courseCard: {
            minWidth: '175px',
            height: '45px',
            margin: 0.5,
            backgroundColor: grey[200],
        },
        courseCardGrid: {
            height: '100%',
            padding: '0 5px 0 10px'
        },
        courseText: {
    
        },
        courseDeleteIcon: {
            marginLeft: 0.5,
        },
        contentCard: {
            backgroundColor: 'secondary.light',
            padding: '15px',
            minHeight: '80vh',
        },
        contentText: {
            padding: '2px 10px',
        },
        takenBox: {
    
        },
        coursesContainer: {
            marginTop: 1.5,
        },
        modalGridMain: {
            width: '100%',
            height: '90%',
        },
        modalCard: {
            [theme.breakpoints.down("sm")]: {
                width: '90%',
                minHeight: '40%'
            },
            width: '60%',
            minHeight: '30%',
            backgroundColor: grey[50],
        },
        cardContent: {
            [theme.breakpoints.down("sm")]: {
                p: 1,
                pt:5,
                pb:5
            },
            width: '100%',
            height: '100%',
            padding: '50px 20px',
        },
        cardActions: {
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
    }
}
