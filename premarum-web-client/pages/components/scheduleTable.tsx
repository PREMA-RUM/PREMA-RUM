import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

function createData(
    course: string,
    section: string,
    credits: number,
    days: string,
    classroom: string,
    timeslot: string,
    professor: string,
) {
    return { course, section, credits, days, classroom, timeslot, professor };
}

const rows = [
    createData('CIIC3000', '010',   3, 'LMV',   'S121',     '3:30pm - 4:20pm',      'Kejie Lu'),
    createData('CIIC4000', '020H',  4, 'LMV',   'S121',     '12:30pm - 1:20pm',     'Manuel Rodriguez'),
    createData('CIIC5000', '030',   3, 'MJ',    'S113',     '2:00pm - 3:15pm',      'Wilson Rivera'),
    createData('CIIC6000', '040',   3, 'LMV',   'S125C',    '10:30am - 11:20am',    'Bienvenido Velez'),
    createData('CIIC7000', '050H',  4, 'MJ',    'S113',     '3:30pm - 4:45pm',      'Marko Schutz'),
];

export default function ScheduleTable() {
    return(
        <TableContainer component={Paper} sx={classes.containerBox}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Course</TableCell>
                        <TableCell>Section</TableCell>
                        <TableCell>Credits [17]</TableCell>
                        <TableCell>Days</TableCell>
                        <TableCell>Classroom</TableCell>
                        <TableCell>Timeslot</TableCell>
                        <TableCell>Professor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.course}>
                            <TableCell component="th" scope="row">{row.course}</TableCell>
                            <TableCell size="small">{row.section}</TableCell>
                            <TableCell>{row.credits}</TableCell>
                            <TableCell>{row.days}</TableCell>
                            <TableCell>{row.classroom}</TableCell>
                            <TableCell>{row.timeslot}</TableCell>
                            <TableCell>{row.professor}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const useStyles = {
    containerBox: {
        marginBottom: 2,
    }
};
  
const classes = useStyles;