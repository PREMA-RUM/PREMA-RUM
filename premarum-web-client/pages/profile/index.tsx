import { Autocomplete, Button, Card, CardActions, CardContent, CardHeader, Divider, Fade, Grid, Modal, TextField, Typography } from '@mui/material'
import { AddRounded } from '@mui/icons-material'
import React from 'react';
import { grey } from '@mui/material/colors';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
]

export default function Profile() {
    const [open, setOpen] = React.useState(false);

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
                            <Typography sx={classes.contentText}>nombre.apedillo@upr.edu</Typography>
                        </Grid>

                        <Divider/>
                        
                        <Grid container direction="column" alignContent='center' justifyContent="center" sx={classes.coursesContainer}>
                            <Typography>Nothing here yet... :(</Typography>
                            <AddButton/>
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
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
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
        minHeight: '80vh',
    },
    contentText: {
        padding: '2px 10px',
    },
    coursesContainer: {
        marginTop: 10
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