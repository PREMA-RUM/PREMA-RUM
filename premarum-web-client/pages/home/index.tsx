import { Autocomplete, Button, Card, CardActions, CardContent, CardHeader, Divider, Fade, Grid, Modal, TextField, Typography } from '@mui/material'
import { AddRounded } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { useRouter } from 'next/router';

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

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

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
          Add Pre-Enrollment
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
                          <Typography sx={classes.title}>Pre-Enrollment</Typography>
                          <Divider orientation="vertical" variant='middle' light flexItem sx={classes.dividerItem}/>
                          <Autocomplete
                            sx={classes.semesterSelect}
                            id="tags-outlined"
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            filterSelectedOptions
                            size="small"
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Semester Selection"
                                placeholder="Select Semester..."
                            />
                            )}
                          />
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

          <Grid container direction="column" alignContent='center' justifyContent="center" sx={classes.coursesContainer}>
            <Typography>Nothing here yet... :(</Typography>
            <AddButton/>
          </Grid>

          <Grid container direction="column" alignContent='center' justifyContent="center" sx={classes.coursesContainer}>
              
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
                      title="Create New Pre-Enrollment"
                  />

                  <Divider/>

                  <CardContent sx={classes.cardContent}>

                    <TextField
                      sx={classes.titleInput}
                      placeholder="Add Pre-Enrollment Title..."
                      variant="outlined"
                      fullWidth
                    />

                    <Autocomplete
                      id="tags-outlined"
                      options={top100Films}
                      getOptionLabel={(option) => option.title}
                      filterSelectedOptions
                      renderInput={(params) => (
                      <TextField
                          {...params}
                          label="Semester Selection"
                          placeholder="Select Semester..."
                      />
                      )}
                    />

                  </CardContent>

                  <Divider/>

                  <CardActions sx={classes.cardActions}>
                      <Button onClick={handleModalClose}>Cancel</Button>
                      <Button onClick={() => {router.push('/preenrollment')}}>Submit</Button>
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
  semesterSelect: {
      backgroundColor: 'white',
      minWidth: '300px'
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