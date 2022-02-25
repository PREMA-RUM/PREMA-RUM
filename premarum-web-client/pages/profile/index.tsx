import { Button, Card, Divider, Grid, TextField, Typography } from '@mui/material'
import { AddRounded } from '@mui/icons-material'

function AddButton() {
    return(
        <Button
            startIcon={<AddRounded/>}
            variant="contained"
            sx={classes.addCoursesButton}
        >
            Add Courses Taken
        </Button>
    )
}

export default function Profile() {
    return (
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
                            <Typography sx={classes.contentText}>nombre.apedillo@upr.edu</Typography>
                        </Grid>

                        <Divider/>
                        
                        <Grid container direction="column" alignContent='center' justifyContent="center" sx={classes.coursesContainer}>
                            <Typography>Nothing here yet...</Typography>
                            <AddButton/>
                        </Grid>
                        
                    </Grid>
                </Card>
            </Grid>
          
        </Grid>
    )
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
    contentCard: {
        backgroundColor: 'secondary.light',
        padding: '15px',
        height: '100%',
        minHeight: 450
    },
    contentText: {
        padding: '2px 10px',
    },
    coursesContainer: {
        marginTop: 10
    }
  };

const classes = useStyles;