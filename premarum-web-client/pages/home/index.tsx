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
    Typography,
} from '@mui/material'
import { AddRounded } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import React, {useState} from 'react';
import { useRouter } from 'next/router';
import PreenrollmentCard from '../components/PreenrollmentCard';
import getAllSemesters from "../../utility/requests/getAllSemesters";
import {ISemesterResponse} from "../../utility/requests/responseTypes";
import {
    useMutatePreEnrollmentsCache,
    usePreEnrollments
} from "../../utility/hooks/usePreEnrollments";
import createPreEnrollment from "../../utility/requests/createPreEnrollment";
import {useMsal} from "@azure/msal-react";

type HomeProps = {
    semesters: ISemesterResponse[]
}

export default function Home(props: HomeProps) {
  const {instance} = useMsal();
  const [open, setOpen] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);
  const [newPreEnrollmentName, setNewPreEnrollmentName] = useState("");
  const [newPreEnrollmentSemester, setNewPreEnrollmentSemester] = useState<ISemesterResponse | null>(null)
  const {preEnrollments, isLoading, isError} = usePreEnrollments();
  const mutatePreEnrollmentCache = useMutatePreEnrollmentsCache();
    
  console.log(preEnrollments)
    
  const router = useRouter();

  const handleModalOpen = () => {
      setOpen(true);
  };
  
  const handleModalClose = () => {
      setOpen(false);
  };
  
  const handlePreEnrollmentCreate = async () => {
      setModalLoading(true)
      let result;
      try {
          result = await createPreEnrollment(instance, {
              semesterId: newPreEnrollmentSemester!.id,
              name: newPreEnrollmentName
          });
      } catch(err) {
          // TODO: Switch with correct backend error message
          alert(err)
          setModalLoading(false);
          return;
      }
      await mutatePreEnrollmentCache(result);
      setNewPreEnrollmentName("");
      setNewPreEnrollmentSemester(null);
      setModalLoading(false)
      // mutate useSwr state with new object
      router.push("/preenrollment")
  }

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
  
  function PreEnrollmentsSection() {
      if (isLoading) {
          return <CircularProgress/>;
      }
      if (preEnrollments?.length == 0) {
          return <Grid container direction="column" justifyContent="center" alignItems="center">
              <Typography>Nothing here yet... :(</Typography>
              <AddButton/>
          </Grid>;
      }
      return <>
          {
              preEnrollments?.map((currVal, index) => 
                  <PreenrollmentCard key={index}/>
              )
          }
      </>
  }

  return (
    <>
    <Grid container direction="column" sx={classes.mainGrid}>

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
                            options={props.semesters}
                            getOptionLabel={(option) => `${option.term}-${option.year}`}
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
            {PreEnrollmentsSection()}
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
                      {modalLoading?(
                          <Stack alignItems="center" justifyContent="center">
                            <CircularProgress />
                          </Stack>
                      ):(
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
                                      setNewPreEnrollmentSemester(newValue);
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

                  <CardActions sx={classes.cardActions} >
                      <Button onClick={handleModalClose}>Cancel</Button>
                      <Button
                          disabled={modalLoading || !newPreEnrollmentName || !newPreEnrollmentSemester} // disable when modal is loading
                          onClick={handlePreEnrollmentCreate}>Submit</Button>
                  </CardActions>
              </Card>
          </Grid>
      </Fade>
    </Modal>
    </>
  )
}

const useStyles = {
  mainGrid: {
    width: '100%',
    height: '100%',
  },
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
      backgroundColor: 'primary.dark',
  },
  contentCard: {
      backgroundColor: 'secondary.light',
      padding: '25px',
      minHeight: '80vh',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
  },
  contentText: {
      padding: '2px 10px',
  },
  coursesContainer: {
      minWidth: '100%',
      maxHeight: '80vh',
  },
  itemStyle: {
    width: '100%',
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

export async function getStaticProps() {
    return {
        props: {
            semesters: await getAllSemesters()
        }, // will be passed to the page component as props
    }
}