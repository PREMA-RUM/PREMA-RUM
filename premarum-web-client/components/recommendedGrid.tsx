import {Box, Button, CircularProgress, Grid, Paper, styled, Tooltip, tooltipClasses, TooltipProps, Typography} from "@mui/material";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {useSemesterOfferings} from "../utility/hooks/useSemesterOfferings";
import {AddRounded} from "@mui/icons-material";
import {usePreEnrollment} from "../utility/hooks/usePreEnrollments";
import {GetRows} from "../utility/helpers/selectionToRow";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 200,
    },
  });

  const columns = [
    {field: 'course', headerName: 'Course', minWidth: 100, description: '',
        renderCell: (params: any) => (
            <CustomTooltip title={params.value} placement="right" arrow>
                <Box>{params.value}</Box>
            </CustomTooltip>
        )
    },
    {field: 'section', headerName: 'Section', minWidth: 100, description: ''},
    {field: 'credits', headerName: `Credits`, minWidth: 100, description: ''},
    {field: 'classroom', headerName: 'Classroom', minWidth: 100, description: ''},
    {field: 'timeslot', headerName: 'Timeslot', minWidth: 150, flex: 1, description: '',
        renderCell: (params: any) => (
            <Box sx={{ whiteSpace: 'normal', overflowY: 'auto', maxHeight: 50}}>
                <Typography sx={{fontSize: '0.875rem'}}>{params.value}</Typography>
            </Box>
        )
    },
    {field: 'professor', headerName: 'Professor', minWidth: 150, flex: 1, description: '',
        renderCell: (params: any) => (
            <Box sx={{ whiteSpace: 'normal', overflowY: 'auto', maxHeight: 50}}>
                <Typography sx={{fontSize: '0.875rem'}}>{params.value}</Typography>
            </Box>
        )
    },
    {field: 'prerequisites', headerName: 'Pre-requisites', minWidth: 150, flex: 1, description: '',
        renderCell: (params: any) => (
            <Box sx={{ whiteSpace: 'normal', overflowY: 'auto', maxHeight: 50}}>
                <Typography sx={{fontSize: '0.875rem'}}>{params.value}</Typography>
            </Box>
        )
    },
    {field: 'corequisites', headerName: 'Co-requisites', minWidth: 150, flex: 1, description: '',
        renderCell: (params: any) => (
            <Box sx={{ whiteSpace: 'normal', overflowY: 'auto', maxHeight: 50}}>
                <Typography sx={{fontSize: '0.875rem'}}>{params.value}</Typography>
            </Box>
        )
    },
]

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

type AddSelectionProps = {
    preEnrollmentId: number,
    changeTab: () => void,
    selectionsRef: any
}

export function AddSelectionButton({preEnrollmentId, selectionsRef, changeTab}: AddSelectionProps) {
    const { addSelectionFn } = usePreEnrollment(preEnrollmentId)
    const [isLoading, setIsLoading] = useState(false)
    
    return(
        <Button
            startIcon={<AddRounded/>}
            variant="contained"
            sx={classes.addSelectionButton}
            onClick={async () => {
                setIsLoading(true)
                if (selectionsRef.current.length === 0) {
                    setIsLoading(false)
                    return
                }
                try {
                    await addSelectionFn(selectionsRef.current)
                } catch (err) {
                    alert(err)
                    selectionsRef.current = []
                    changeTab()
                    return
                }
                selectionsRef.current = []
                changeTab()
            }}
            disabled={isLoading}
        >
            Add Selection
        </Button>
    )
}

type RecommendedGridProps = {
    semesterId: number,
    exclude: number[],
    selectionsRef: any// Ids to exclude
}

export default function RecommendedGrid({semesterId, exclude, selectionsRef}: RecommendedGridProps) {
    const {courseOfferings, isLoading, isError} = useSemesterOfferings(semesterId);
    const [rows, setRows] = useState([])
    
    useEffect(() => {
        if (!isLoading)  {
            console.log(courseOfferings)
            GetRows(courseOfferings.filter(co => !exclude.includes(co.id)))
                .then(res => {setRows(res as any)})   
        }
    }, [courseOfferings])
    
    if (!rows || isLoading) {
        return(
            <Grid container direction="column" justifyContent="center" alignContent="center">
                <CircularProgress />
            </Grid>
        )
    }
    
    return(
        <Paper elevation={0} sx={classes.containerBox}>
            <DataGrid
                onSelectionModelChange={async (selectionModel) => {
                    selectionsRef.current = selectionModel.map(
                        sel =>  (rows[sel as number] as any).entryId )
                }}
                checkboxSelection
                pageSize={25}
                rows={rows}
                columns={columns}
                autoHeight
                components={{
                    Toolbar: CustomToolbar,
                }}
            />
        </Paper>
    )
}

const useStyles = {
    toolbarBox: {
        marginTop: 1,
        marginLeft: 1,
    },
    containerBox: {

    },
    addSelectionButton: {
        backgroundColor: 'secondary.main',
    },
};
  
const classes = useStyles;