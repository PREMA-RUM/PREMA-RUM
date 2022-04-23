import {Autocomplete, Card, Divider, Grid, TextField, Typography, Stack} from "@mui/material";
import {ISemesterResponse} from "../../utility/requests/responseTypes";
import React from "react";
import {useTheme} from "@mui/material/styles";

type TopAreaProps = {
    semesters: ISemesterResponse[],
    handleSelect: (sId:number) => void
}

export function CatalogMobileTopArea({semesters, handleSelect}: TopAreaProps) {
    const classes = useStyles();
    return <Stack sx={{mb: 1}}>
        <Autocomplete
            sx={classes.semesterSelect}
            id="semester-select"
            options={semesters}
            getOptionLabel={(option) => `${option.term}: ${option.year}-${option.year+1}`}
            filterSelectedOptions
            size="small"
            onChange={(event: any, newValue: ISemesterResponse | null) => {handleSelect(newValue? newValue.id : 0)}}
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

export function CatalogWideScreenTopArea({semesters, handleSelect}: TopAreaProps) {
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
                        size="small"
                        onChange={(event: any, newValue: ISemesterResponse | null) => {handleSelect(newValue? newValue.id : 0)}}
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
            backgroundColor: 'primary.light',
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
