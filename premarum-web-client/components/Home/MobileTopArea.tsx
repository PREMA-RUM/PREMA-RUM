import {ISemesterResponse} from "../../utility/requests/responseTypes";
import {Theme} from "@mui/material/styles";
import {Autocomplete, Divider, Stack, TextField, useTheme} from "@mui/material";
import React, {Dispatch, SetStateAction, useState} from "react";
import {usePreEnrollments} from "../../utility/hooks/usePreEnrollments";
import {AddPreEnrollmentButton} from "./AddPreEnrollmentButton";

type MobileTopAreaProps = {
    semesters: ISemesterResponse[],
    handleModalOpen: () => void,
    filterState: ISemesterResponse | null,
    setFilterState: Dispatch<ISemesterResponse | null>
}

export function MobileTopArea({semesters, handleModalOpen, filterState, setFilterState}: MobileTopAreaProps) {
    const theme = useTheme()
    const classes = useStyles(theme)
    const {preEnrollments} = usePreEnrollments()
    const [inputVal, setInputVal] = useState('')
    
    return <Stack sx={classes.topCardMobile} spacing={1}>
        {
            preEnrollments?.length === 0? <></>:
                <>
                    <Autocomplete
                        sx={classes.semesterSelect}
                        id="tags-outlined"
                        options={semesters}
                        getOptionLabel={(option) => `${option.term}: ${option.year}-${option.year+1}`}
                        onChange={(_: any, newValue: ISemesterResponse | null) => {setFilterState(newValue)}}
                        value={filterState}
                        filterSelectedOptions
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
                    <AddPreEnrollmentButton
                        handleModalOpen={handleModalOpen}
                    />
                    <Divider />
                </>
        }
    </Stack>
}

const useStyles = (theme: Theme) => ({
    topCardMobile: {
        marginBottom: 1,
        flexGrow: 1,
        width: '100%'
    },
    semesterSelect: {
        backgroundColor: 'white',
        width: "100%"
    }
})