import {Button} from "@mui/material";
import {AddRounded} from "@mui/icons-material";
import React from "react";
import {useTheme, Theme} from "@mui/material/styles";

type AddPreEnrollmentButtonProps = {
    handleModalOpen: () => void
}

export function AddPreEnrollmentButton({handleModalOpen}: AddPreEnrollmentButtonProps) {
    const theme = useTheme()
    const classes = useStyles(theme)
    
    return (
        <Button
            startIcon={<AddRounded/>}
            variant="contained"
            sx={classes.addCoursesButton}
            onClick={handleModalOpen}
        >
            Add Pre-Enrollment
        </Button>
    )
}

const useStyles = (theme: Theme) => ({
    addCoursesButton: {
        backgroundColor: 'primary.dark',
    }
})