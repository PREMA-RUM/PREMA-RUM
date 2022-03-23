import { Box, Card, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";

import moment from 'moment';
import {
    Calendar,
    DateLocalizer,
    momentLocalizer,
    View,
  } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
  

const localizer = momentLocalizer(moment);

export default function ScheduleCalendar() {
    const [dates, setDates] = useState([{
        'title': 'initial State Date',
        'allDay': false,
        'start': new Date(moment.now()),
        'end': new Date(moment.now()),
        'uuid': 0,
    }]);


    return(
        <Box sx={classes.containerBox}> 
            <Calendar
                localizer={localizer}
                startAccessor="start"
                events={dates}
                endAccessor="end"
                view="week"
                defaultDate={new Date(moment.now())}
            />
            {/* <Table>
                <TableRow>
                    <TableCell>Monday</TableCell>
                    <TableCell>Tuesday</TableCell>
                    <TableCell>Wednesday</TableCell>
                </TableRow>
                <TableBody>poggers</TableBody>
                <Card>Title</Card>
            </Table> */}
        </Box>
    )
}

const useStyles = {
    containerBox: {

    }
};
  
const classes = useStyles;