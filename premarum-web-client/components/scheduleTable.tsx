import { Box, Button, Paper, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from "@mui/material";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {IPreEnrollmentSelectionResponse} from "../utility/requests/responseTypes";
import {GetRows} from "../utility/helpers/selectionToRow";
import {RemoveRounded} from "@mui/icons-material";
import {usePreEnrollment} from "../utility/hooks/usePreEnrollments";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 200,
    },
});

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

async function totalCredits(selections: IPreEnrollmentSelectionResponse[]) {
    if (selections.length === 0) return 0;
    console.log(selections)
    let sum = 0;
    selections.forEach(val => {
        sum += val.course?.courseCredit
    })
    return sum
}

type AddSelectionProps = {
    preEnrollmentId: number,
    selectionsRef: any
}

export function RemoveSelectionButton({preEnrollmentId, selectionsRef}: AddSelectionProps) {
    
    const {removeSelectionsFn} = usePreEnrollment(preEnrollmentId)
    const [isDisabled, setIsDisabled] = useState(false);
    
    async function removeSelections() {
        setIsDisabled(true)
        try {
            await removeSelectionsFn([...selectionsRef.current])
        } catch (err) {
            alert(err)
            setIsDisabled(false)
        }
        setIsDisabled(false)
    }
    
    return (
        <Button
            startIcon={<RemoveRounded/>}
            variant="contained"
            sx={classes.removeSelection}
            onClick={removeSelections}
            disabled={isDisabled}
        >
            Remove Selection
        </Button>
    )
}

type ScheduleTableProps = {
    selections: IPreEnrollmentSelectionResponse[],
    selectionRef: any
}

export default function ScheduleTable({selections, selectionRef}: ScheduleTableProps) {
    
    const [creditSum, setCreditSum] = useState(0)
    const [rows, setRows] = useState([])

    const columns = [
        {field: 'course', headerName: 'Course', minWidth: 100, description: '',
            renderCell: (params: any) => (
                <CustomTooltip title={params.value} placement="right" arrow>
                    <Box>{params.value}</Box>
                </CustomTooltip>
            )
        },
        {field: 'section', headerName: 'Section', minWidth: 100, description: ''},
        {field: 'credits', headerName: `Credits [${creditSum}]`, minWidth: 100, description: ''},
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
    
    useEffect(() => {
        totalCredits(selections)
            .then(res => setCreditSum(res))
        GetRows(selections)
            .then(res => setRows(res as any))
    }, [selections])
    
    return(
        <Paper elevation={0} sx={classes.containerBox}>
            <DataGrid
                checkboxSelection
                onSelectionModelChange={async (selectionModel) => {
                    selectionRef.current = selectionModel.map(
                        sel =>  (rows[sel as number] as any).entryId )
                    console.log(selectionRef.current)
                }}
                hideFooterPagination
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
        marginBottom: 2,
    },
    removeSelection: {
        backgroundColor: 'secondary.main',
    },
};
  
const classes = useStyles;