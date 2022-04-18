import {ISemesterResponse} from "../../utility/requests/responseTypes";
import {Theme} from "@mui/material/styles";
import {Autocomplete, Divider, Stack, TextField, useTheme} from "@mui/material";
import React from "react";
import {usePreEnrollments} from "../../utility/hooks/usePreEnrollments";
import {AddPreEnrollmentButton} from "./AddPreEnrollmentButton";

type MobileTopAreaProps = {
    semesters: ISemesterResponse[],
    handleModalOpen: () => void
}

export function MobileTopArea({semesters, handleModalOpen}: MobileTopAreaProps) {
    const theme = useTheme()
    const classes = useStyles(theme)
    const {preEnrollments} = usePreEnrollments()
    
    return <Stack sx={classes.topCardMobile} spacing={1}>
        {
            preEnrollments?.length === 0? <></>:
                <>
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
        marginBottom: 1
    },
    semesterSelect: {
        backgroundColor: 'white',
        minWidth: '300px'
    }
})