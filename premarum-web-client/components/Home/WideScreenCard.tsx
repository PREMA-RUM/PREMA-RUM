import {Autocomplete, Card, Divider, Grid, TextField, Typography} from "@mui/material";
import React from "react";
import {ISemesterResponse} from "../../utility/requests/responseTypes";
import {Theme, useTheme} from "@mui/material/styles";
import {AddPreEnrollmentButton} from "./AddPreEnrollmentButton";

type WideScreenProps = {
    semesters: ISemesterResponse[],
    handleModalOpen: () => void
}

export function WideScreenCard({semesters, handleModalOpen}: WideScreenProps) {
    const theme = useTheme()
    const classes = useStyles(theme)
    
    return <Card sx={classes.topCard}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
                <Grid container direction="row" alignItems="center">
                    <Typography sx={classes.title}>Your Pre-Enrollments</Typography>
                    <Divider orientation="vertical" variant='middle' light flexItem
                             sx={classes.dividerItem}/>
                    <Autocomplete
                        sx={classes.semesterSelect}
                        id="tags-outlined"
                        options={semesters}
                        getOptionLabel={(option) => `${option.term} - ${option.year}`}
                        filterSelectedOptions
                        size="small"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Filter By Semester"
                                placeholder="Filter By Semester"
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Grid item>
                <AddPreEnrollmentButton handleModalOpen={handleModalOpen}/>
            </Grid>
        </Grid>
    </Card>
}

const useStyles = (theme: Theme) => ({
    semesterSelect: {
        backgroundColor: 'white',
        minWidth: '300px'
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
    }
})