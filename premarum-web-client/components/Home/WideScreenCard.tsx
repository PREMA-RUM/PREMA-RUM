import {Autocomplete, Card, Divider, Grid, TextField, Typography} from "@mui/material";
import React, {Dispatch, useState} from "react";
import {ISemesterResponse} from "../../utility/requests/responseTypes";
import {Theme, useTheme} from "@mui/material/styles";
import {AddPreEnrollmentButton} from "./AddPreEnrollmentButton";
import {usePreEnrollments} from "../../utility/hooks/usePreEnrollments";

type WideScreenProps = {
    semesters: ISemesterResponse[],
    handleModalOpen: () => void,
    filterState: ISemesterResponse | null,
    setFilterState: Dispatch<ISemesterResponse | null>
}

export function WideScreenCard({semesters, handleModalOpen, filterState, setFilterState}: WideScreenProps) {
    const theme = useTheme()
    const classes = useStyles(theme)

    const {preEnrollments} = usePreEnrollments()
    const semesterIdList = preEnrollments? new Set(preEnrollments.map(pe=>pe.semester.id)): new Set([])
    const [inputVal, setInputVal] = useState('')
    
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
                        options={semesters.filter(s => semesterIdList.has(s.id))}
                        getOptionLabel={(option) => `${option.term}: ${option.year}-${option.year+1}`}
                        filterSelectedOptions
                        onChange={(event: any, newValue: ISemesterResponse | null) => {setFilterState(newValue)}}
                        value={filterState}
                        inputValue={inputVal}
                        onInputChange={(_: any, newVal: string) => {setInputVal(newVal)}}
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
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        marginBottom: 1.5
    },
    title: {
        
    },
    dividerItem: {
        marginLeft: 2,
        marginRight: 2,
    }
})