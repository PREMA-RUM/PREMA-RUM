import {Box, CircularProgress, Grid, Paper} from "@mui/material";
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import {useSemesterOfferings} from "../utility/hooks/useSemesterOfferings";
import {ICourseResponse, IPreEnrollmentSelectionResponse, IProfessorResponse} from "../utility/requests/responseTypes";


const rows = [
    {id: 1, course: 'CIIC3000', section: '010', credits: 3, days: 'LMV', classroom: 'S121', timeslot: '3:30pm - 4:20pm', professor: 'Kejie Lu'},
    {id: 2, course: 'CIIC4000', section: '020H', credits: 4, days: 'LMV', classroom: 'S121', timeslot: '12:30pm - 1:20pm', professor: 'Manuel Rodriguez'},
    {id: 3, course: 'CIIC5000', section: '030', credits: 3, days: 'MJ', classroom: 'S113', timeslot: '2:00pm - 3:15pm', professor: 'Wilson Rivera'},
    {id: 4, course: 'CIIC6000', section: '040', credits: 3, days: 'LMV', classroom: 'S125C', timeslot: '10:30am - 11:20am', professor: 'Bienvenido Velez'},
    {id: 5, course: 'CIIC7000', section: '050H', credits: 4, days: 'MJ', classroom: 'S113', timeslot: '3:30pm - 4:45pm', professor: 'Marko Schutz'},
]

function GetRows(selections: IPreEnrollmentSelectionResponse[]) {
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

        result.push({id: i, course: selections[i].course.courseCode, section: selections[i].sectionName,
            credits: selections[i].course.courseCredit, days: days.join(", "), classroom: selections[i].classRoom,
            timeslot: times.join(", "), professor: professors.join(", ")})
    }

    return result
}

const columns: GridColDef[] = [
    {field: 'course', headerName: 'Course', minWidth: 100, description: ''},
    {field: 'section', headerName: 'Section', minWidth: 100, description: ''},
    {field: 'credits', headerName: 'Credits', minWidth: 100, description: ''},
    {field: 'days', headerName: 'Days', minWidth: 100, description: ''},
    {field: 'classroom', headerName: 'Classroom', minWidth: 100, description: ''},
    {field: 'timeslot', headerName: 'Timeslot', minWidth: 175, description: ''},
    {field: 'professor', headerName: 'Professor', minWidth: 175, description: ''},
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

type CatalogGridProps = {
    semesterId: number,
    exclude?: number[] // Ids to exclude
}

export default function CatalogGrid({semesterId}: CatalogGridProps) {
    const {courseOfferings, isLoading, isError} = useSemesterOfferings(semesterId);
    console.log(courseOfferings)
    if (isLoading) {
        return <Grid container alignItems="center" justifyContent="center" >
            <CircularProgress />
        </Grid> 
    }
    
    return(
        <Paper elevation={0} sx={classes.containerBox}>
            <DataGrid
                checkboxSelection
                rows={GetRows(courseOfferings)}
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
};
  
const classes = useStyles;