import {Box, Button, Paper} from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {useSemesterOfferings} from "../utility/hooks/useSemesterOfferings";
import {IPreEnrollmentSelectionResponse} from "../utility/requests/responseTypes";
import {AddRounded} from "@mui/icons-material";
import {usePreEnrollment} from "../utility/hooks/usePreEnrollments";

async function GetRows(selections: IPreEnrollmentSelectionResponse[]) {
    let result = []

    for (let i in selections) {
        let days = []
        let times = []
        let professors = []

        for (let j in selections[i].timeSlots) {
            days.push(selections[i].timeSlots[j].day)
            times.push(selections[i].timeSlots[j].startTime + " - " + selections[i].timeSlots[j].endTime)
        }

        for (let k in selections[i].professors) {
            professors.push(selections[i].professors[k].name)
        }

        result.push({id: parseInt(i), entryId: selections[i].id, course: selections[i].course.courseCode, section: selections[i].sectionName,
            credits: selections[i].course.courseCredit, days: days.join(", "), classroom: selections[i].classRoom,
            timeslot: times.join(", "), professor: professors.join(", ")})
    }

    return result
}

const columns: GridColDef[] = [
    {field: 'course', headerName: 'Course', minWidth: 100, description: ''},
    {field: 'section', headerName: 'Section', minWidth: 100, description: ''},
    {field: 'credits', headerName: 'Credits', minWidth: 100, description: ''},
    {field: 'days', headerName: 'Days', minWidth: 100, flex: 1, description: ''},
    {field: 'classroom', headerName: 'Classroom', minWidth: 100, description: ''},
    {field: 'timeslot', headerName: 'Timeslot', minWidth: 175, flex: 1, description: ''},
    {field: 'professor', headerName: 'Professor', minWidth: 175, flex: 1, description: ''},
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

type CatalogGridProps = {
    semesterId: number,
    exclude: number[],
    selectionsRef: any// Ids to exclude
}

export default function CatalogGrid({semesterId, exclude, selectionsRef}: CatalogGridProps) {
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
        return <>...</>
    }
    
    return(
        <Paper elevation={0} sx={classes.containerBox}>
            <DataGrid
                onSelectionModelChange={async (selectionModel) => {
                    selectionsRef.current = selectionModel.map(
                        sel =>  (rows[sel as number] as any).entryId )
                }}
                checkboxSelection
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
        backgroundColor: 'primary.dark',
    },
};
  
const classes = useStyles;