import { Box, Card, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react';
import { grey } from '@mui/material/colors';
import { DataGrid, GridColumns, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

function CustomToolbar() {
    return(
        <Box sx={classes.toolbarBox}>
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        </Box>
    )
}

export default function Catalog() {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 30,
        maxColumns: 6,
    });


    return (
        <>
        <Grid container direction="column">

            <Grid item>
                <Card sx={classes.topCard}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        
                        <Grid item>
                            <Grid container direction="row" alignItems="center">
                                <Typography sx={classes.title}>Course Catalog</Typography>
                                <Divider orientation="vertical" variant='middle' light flexItem sx={classes.dividerItem}/>
                                <TextField size="small" variant="outlined" placeholder="Search Courses..." sx={classes.searchInput}/>
                            </Grid>
                        </Grid>

                    </Grid>
                </Card>
            </Grid>
            

            <Grid item>
                <Card sx={classes.contentCard} >
                    <Paper elevation={0} sx={classes.dataContainer}>
                        <DataGrid
                            autoHeight
                            rows={data.rows}
                            columns={data.columns as GridColumns}
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                        />
                    </Paper>
                </Card>
            </Grid>
          
        </Grid>
        </>
    )
}

const useStyles = {
    toolbarBox: {
        marginTop: 1,
        marginLeft: 1,
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
    addCoursesButton: {
        backgroundColor: 'primary.dark'
    },
    contentCard: {
        backgroundColor: grey[100],
        padding: '15px',
        minHeight: '80vh',
        overflow: 'auto',
    },
    dataContainer: {

    },
  };

const classes = useStyles;