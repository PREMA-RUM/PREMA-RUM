import {Box, Button, Card, CircularProgress, Divider, Grid, Tab, Tabs, TextField, Typography} from '@mui/material'
import { AddRounded } from '@mui/icons-material';
import React, {useEffect, useRef, useState} from 'react';
import CatalogGrid, {AddSelectionButton} from '../../components/catalogGrid';
import { grey } from '@mui/material/colors';
import ScheduleCalendar from '../../components/scheduleCalendar';
import ScheduleTable from '../../components/scheduleTable';
import {useRouter} from "next/router";
import {route} from "next/dist/server/router";
import {usePreEnrollment} from "../../utility/hooks/usePreEnrollments";
import {IPreEnrollmentResponse} from "../../utility/requests/responseTypes";

export default function Preenrollment() {
    const [value, setValue] = React.useState(0);
    const router = useRouter()
    const [preEnrollmentId, setPreEnrollmentId] = React.useState<number | null>(null);
    const {preEnrollment, isLoading, isError} = usePreEnrollment(preEnrollmentId) 
    const selectedAddCoursesRef = useRef([])
    
    useEffect(() => {
        let pId = parseInt(router.query.preEnrollmentId as string)
        if (isNaN(pId)) 
            return
        setPreEnrollmentId(pId)
    }, [router.query])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }
    
    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <Box
                {...other}
            >
                {value === index && (
                    <Box sx={classes.tabContent}>
                        {children}
                    </Box>
                )}
            </Box>
        );
    }

    function RemoveSelectionButton() {
        return(
            <Button
                startIcon={<AddRounded/>}
                variant="contained"
                sx={classes.removeSelection}
            >
              Remove Selection
          </Button>
        )
    }
    
    if(isError) {
        router.push("/home")
        return <></>
    }
    
    if (isLoading || !preEnrollmentId ) {
        return <Grid alignItems="center" justifyContent="center" alignContent="center">
            <CircularProgress />
        </Grid>
    }
    
    return (
        <>
        <Grid container direction="column" sx={classes.mainGrid}>

        <Grid item>
            <Card sx={classes.topCard}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    
                    <Grid item>
                        <Grid container direction="row" alignItems="center">
                            <Typography sx={classes.title}>Course Selection</Typography>
                            <Divider orientation="vertical" variant='middle' light flexItem sx={classes.dividerItem}/>
                            <TextField size="small" variant="outlined" placeholder="Search Courses..." sx={classes.searchInput}/>
                        </Grid>
                    </Grid>

                </Grid>
            </Card>
        </Grid>
        

        <Grid item>
            <Card sx={classes.contentCard}>
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                        >
                            <Tab label='Schedule' />
                            <Tab label='Courses'/>
                        </Tabs>
                    </Grid>

                    {value === 1?(
                        <Grid item>
                            <AddSelectionButton 
                                changeTab = {()=>{setValue(0)}}
                                selectionsRef={selectedAddCoursesRef} 
                                preEnrollmentId={preEnrollmentId}/>
                        </Grid>
                    ):
                        <Grid item>
                            <RemoveSelectionButton/>
                        </Grid>
                    }

                </Grid>
                <TabPanel value={value} index={0}>
                    <ScheduleTable/>
                    <ScheduleCalendar courseOfferings={preEnrollment!.selections}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CatalogGrid selectionsRef={selectedAddCoursesRef} exclude={preEnrollment!.selections.map(sel => sel.id)} semesterId={preEnrollment!.semester.id}/>
                </TabPanel>
            </Card>
        </Grid>
        
        </Grid>

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
    searchInput: {
        backgroundColor: 'white'
    },
    semesterSelect: {
        backgroundColor: 'white',
        minWidth: '300px'
    },
    contentCard: {
        backgroundColor: grey[200],
        padding: '25px',
        minHeight: '80vh',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeSelection: {
        backgroundColor: 'primary.dark',
    },
    tabContent: {
        marginTop: 2,
    },
};

const classes = useStyles;