import {useTheme} from "@mui/material/styles";
import {Button, Card, Divider, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import {AddRounded, EditRounded} from "@mui/icons-material";

type AddOrEditButtonProp = {
    onClick: () => void
}

function AddButton({onClick}:AddOrEditButtonProp) {
    const classes = useStyles()
    return(
        <Button
            startIcon={<AddRounded/>}
            variant="contained"
            sx={classes.addCoursesButton}
            onClick={onClick}
        >
            Add Courses Taken
        </Button>
    )
}

function EditDepartmentButton({onClick}:AddOrEditButtonProp) {
    const classes = useStyles()
    return(
        <Button
            startIcon={<EditRounded/>}
            variant="contained"
            sx={classes.editDepartmentButton}
            onClick={onClick}
        >
            Edit Department
        </Button>
    )
}

type MobileTopAreaProps = {
    handleEdit: () => void,
    handleAdd: () => void
}

export function MobileTopArea(props: MobileTopAreaProps) {
    const classes = useStyles()
    return <Stack direction={"column"} spacing={1} sx={{mb:1}}>
        <EditDepartmentButton onClick={props.handleEdit}/>
        <AddButton onClick={props.handleAdd} />
    </Stack>
}

type WideScreenTopAreaProps = {
    handleEdit: () => void,
    handleAdd: () => void
}

export function WideScreenTopArea(props: WideScreenTopAreaProps) {
    const classes = useStyles()
    return <Card sx={classes.topCard}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
                <Grid container direction="row" alignItems="center">
                    <Typography sx={classes.title}>Profile</Typography>
                    <Divider orientation="vertical" variant='middle' light flexItem sx={classes.dividerItem}/>
                    {/* <TextField size="small" variant="outlined" placeholder="Search Courses..." sx={classes.searchInput}/> */}
                </Grid>
            </Grid>

            <Grid item>
                <EditDepartmentButton onClick={props.handleEdit} />
                <AddButton onClick={props.handleAdd}/>
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
            marginBottom: 1.5,
        },
        addCoursesButton: {
            backgroundColor: theme.palette.primary.light,
            [theme.breakpoints.down("sm")]: {
                backgroundColor: theme.palette.primary.main
            }
        },
        editDepartmentButton: {
            backgroundColor: 'secondary.dark',
            marginRight: 1,
            [theme.breakpoints.down("sm")]: {
                mr: 0,
            }
        },
        title: {
            color: 'white'
        },
        dividerItem: {
            marginLeft: 2,
            marginRight: 2,
        },
    }
}