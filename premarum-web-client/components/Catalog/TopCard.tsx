import {Autocomplete, Card, Divider, Grid, TextField, Typography, Stack} from "@mui/material";
import {ISemesterResponse} from "../../utility/requests/responseTypes";
import React from "react";
import {useTheme} from "@mui/material/styles";

type TopAreaProps = {
    semesters: ISemesterResponse[],
    currentSemester: ISemesterResponse | null,
    setCurrentSemester: (s: ISemesterResponse | null) => void
}

export function CatalogMobileTopArea({semesters, currentSemester, setCurrentSemester}: TopAreaProps) {
    const classes = useStyles();
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
    const classes = useStyles();
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

const useStyles = () => {
    const theme = useTheme()
    return {
        topCard: {
            padding: '5px 25px',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            marginBottom: 1.5
        },
        semesterSelect: {
            backgroundColor: 'white',
            minWidth: '300px',
            [theme.breakpoints.down("sm")]: {
                mb: 1
            }
        },
        title: {
            padding: '8px 0',
        },
        dividerItem: {
            marginLeft: 2,
            marginRight: 2,
        },
    }
}
