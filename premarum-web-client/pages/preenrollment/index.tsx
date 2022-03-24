import { Box, Button, Card, Divider, Grid, Tab, Tabs, TextField, Typography } from '@mui/material'
import { AddRounded } from '@mui/icons-material';
import React from 'react';
import CatalogGrid from '../components/catalogGrid';
import { orange } from '@mui/material/colors';
import ScheduleCalendar from '../components/scheduleCalendar';
import ScheduleTable from '../components/scheduleTable';

export default function Preenrollment() {
    const [value, setValue] = React.useState(0);

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

    function AddSelectionButton() {
        return(
            <Button
                startIcon={<AddRounded/>}
                variant="contained"
                sx={classes.addSelectionButton}
                onClick={() => console.log("poggy")}
            >
              Add Selection
          </Button>
        )
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
                            <AddSelectionButton/>
                        </Grid>
                    ):<></>}

                </Grid>
                <TabPanel value={value} index={0}>
                    <ScheduleTable/>
                    <ScheduleCalendar/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CatalogGrid/>
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
    addSelectionButton: {
        backgroundColor: 'primary.dark',
    },
    contentCard: {
        backgroundColor: orange[200],
        padding: '25px',
        minHeight: '80vh',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContent: {
        marginTop: 2,
    },
};

const classes = useStyles;