import {Autocomplete, Card, Divider, Grid, Stack, TextField, Typography} from "@mui/material";
import {ISemesterResponse} from "../../utility/requests/responseTypes";
import React from "react";
import {Property} from "csstype";
import Top = Property.Top;

type TopAreaProps = {
    semesters: ISemesterResponse[],
    currentSemester: ISemesterResponse | null,
    setCurrentSemester: (s: ISemesterResponse | null) => void
}

export function CatalogMobileTopArea({semesters, currentSemester, setCurrentSemester}: TopAreaProps) {
return <Stack sx={{mb: 1}}>
        <Autocomplete
            sx={classes.semesterSelect}
            id="semester-select"
            options={semesters}
            getOptionLabel={(option) => `${option.term}: ${option.year}-${option.year+1}`}
            value={currentSemester}
            filterSelectedOptions
            size="small"
            onChange={(event: any, newValue: ISemesterResponse | null) => {setCurrentSemester(newValue)}}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Select Semester..."
                />
            )}
        />
        <Divider />
    </Stack>
}

export function CatalogWideScreenTopArea({semesters, currentSemester, setCurrentSemester}: TopAreaProps) {
    return <Card sx={classes.topCard}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
                <Grid container direction="row" alignItems="center">
                    <Typography sx={classes.title}>Course Catalog</Typography>
                    <Divider orientation="vertical" variant='middle' light flexItem sx={classes.dividerItem}/>
                    {/* <TextField size="small" variant="outlined" placeholder="Search Courses..." sx={classes.searchInput}/> */}
                    <Autocomplete
                        sx={classes.semesterSelect}
                        id="semester-select"
                        options={semesters}
                        getOptionLabel={(option) => `${option.term}: ${option.year}-${option.year+1}`}
                        filterSelectedOptions
                        value={currentSemester}
                        size="small"
                        onChange={(event: any, newValue: ISemesterResponse | null) => {setCurrentSemester(newValue)}}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Select Semester..."
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Grid>
    </Card>
}


const useStyles = {
    topCard: {
        padding: '5px 25px',
        backgroundColor: 'primary.light',
        marginBottom: 1.5
    },
    semesterSelect: {
        backgroundColor: 'white',
        minWidth: '300px'
    },
    title: {
        padding: '8px 0',
    },
    dividerItem: {
        marginLeft: 2,
        marginRight: 2,
    },
}

const classes = useStyles