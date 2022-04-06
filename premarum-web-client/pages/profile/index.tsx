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
import { AddRounded, CloseRounded, EditRounded } from '@mui/icons-material'
import React, { useEffect } from 'react';
import { grey } from '@mui/material/colors';
import {getAllCourses} from "../../utility/requests/getAllCourses";
import {ICourseResponse, ICoursesTakenResponse} from "../../utility/requests/responseTypes";
import {useCoursesTaken} from "../../utility/hooks/useCoursesTaken";
import {useStudent} from "../../utility/hooks/useStudent";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 300,
    },
});

type ProfileProps = {
    courses: ICourseResponse[]
}

export default function Profile({courses}: ProfileProps) {
    const [open, setOpen] = React.useState(false);
    const [readOnly, setReadOnly] = React.useState(false);
    const {coursesTaken, isLoading} = useCoursesTaken()
    const {student, isLoading:studentLoading} = useStudent()
    
    const handleModalOpen = () => {
        setOpen(true);
    };
    
    const handleModalClose = () => {
        setOpen(false);
    };

    function AddButton() {
        return(
            <Button
                startIcon={<AddRounded/>}
                variant="contained"
                sx={classes.addCoursesButton}
                onClick={handleModalOpen}
            >
                Add Courses Taken
            </Button>
        )
    }
    
    type CourseCardProps = {
        course: ICourseResponse
    }

    function CourseCard({course}: CourseCardProps) {
        return(
            <CustomTooltip arrow title={`${course.courseCode} - ${course.courseName}`} placement="top">
                <Card sx={classes.courseCard}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={classes.courseCardGrid}>
                        <Grid item>
                            <Typography sx={classes.courseText}>{course.courseCode}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton size="small" sx={classes.courseDeleteIcon}><CloseRounded/></IconButton>
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
                <Card sx={classes.topCard}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        
                        <Grid item>
                            <Grid container direction="row" alignItems="center">
                                <Typography sx={classes.title}>Profile</Typography>
                                <Divider orientation="vertical" variant='middle' light flexItem sx={classes.dividerItem}/>
                                <TextField size="small" variant="outlined" placeholder="Search Courses..." sx={classes.searchInput}/>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <AddButton/>
                        </Grid>

                    </Grid>
                </Card>
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
                            {coursesTaken!.map((ct: ICoursesTakenResponse, index: number) => (
                                <CourseCard key={index} course={ct.course}/>
                            ))}
                        </Grid>
                        
                    </Grid>
                </Card>
            </Grid>
          
        </Grid>

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
                                getOptionLabel={(option) => option.courseCode}
                                filterSelectedOptions
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
                            <Button onClick={handleModalClose}>Cancel</Button>
                            <Button onClick={handleModalClose}>Submit</Button>
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
            courses: await getAllCourses()
        }
    }
}

const useStyles = {
    topCard: {
        padding: '5px 25px',
        backgroundColor: 'primary.light',
        marginBottom: 1.5
    },
    title: {

    },
    dividerItem: {
        marginLeft: 2,
        marginRight: 2,
    },
    searchInput: {
        backgroundColor: 'white'
    },
    addCoursesButton: {
        backgroundColor: 'primary.dark'
    },
    editCoursesButton: {
        backgroundColor: 'secondary.dark',
        marginRight: 1,
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
        width: '60%',
        minHeight: '30%',
        backgroundColor: grey[50],
    },
    cardContent: {
        width: '100%',
        height: '100%',
        padding: '50px 20px',
    },
    cardActions: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
  };

const classes = useStyles;