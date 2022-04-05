import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import React, {RefObject, useEffect, useState} from "react";
import {IPreEnrollmentResponse, IPreEnrollmentSelectionResponse} from "../utility/requests/responseTypes";
import {GetRows} from "../utility/helpers/selectionToRow";


const rows = [
    {id: 1, course: 'CIIC3000', section: '010', credits: 3, days: 'LWV', classroom: 'S121', timeslot: '3:30pm - 4:20pm', professor: 'Kejie Lu'},
    {id: 2, course: 'CIIC4000', section: '020H', credits: 4, days: 'LWV', classroom: 'S121', timeslot: '12:30pm - 1:20pm', professor: 'Manuel Rodriguez'},
    {id: 3, course: 'CIIC5000', section: '030', credits: 3, days: 'MJ', classroom: 'S113', timeslot: '2:00pm - 3:15pm', professor: 'Wilson Rivera'},
    {id: 4, course: 'CIIC6000', section: '040', credits: 3, days: 'LWV', classroom: 'S125C', timeslot: '10:30am - 11:20am', professor: 'Bienvenido Velez'},
    {id: 5, course: 'CIIC7000', section: '050H', credits: 4, days: 'MJ', classroom: 'S113', timeslot: '3:30pm - 4:45pm', professor: 'Marko Schutz'},
]

async function totalCredits(selections: IPreEnrollmentSelectionResponse[]) {
    let sum = 0;
    for (let i in selections) {
        sum += selections[i].course.courseCredit
    }
    return sum
}

type ScheduleTableProps = {
    selections: IPreEnrollmentSelectionResponse[],
    selectionRef: any
}

export default function ScheduleTable({selections, selectionRef}: ScheduleTableProps) {
    
    const [creditSum, setCreditSum] = useState(0)
    const [rows, setRows] = useState([])
    const columns: GridColDef[] = [
        {field: 'course', headerName: 'Course', minWidth: 100, description: ''},
        {field: 'section', headerName: 'Section', minWidth: 100, description: ''},
        {field: 'credits', headerName: 'Credits [' + creditSum + ']', minWidth: 100, description: ''},
        {field: 'days', headerName: 'Days', minWidth: 100, description: ''},
        {field: 'classroom', headerName: 'Classroom', minWidth: 100, description: ''},
        {field: 'timeslot', headerName: 'Timeslot', minWidth: 175, description: ''},
        {field: 'professor', headerName: 'Professor', minWidth: 175, description: ''},
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
            />
        </Paper>
    )
}

const useStyles = {
    containerBox: {
        marginBottom: 2,
    }
};
  
const classes = useStyles;