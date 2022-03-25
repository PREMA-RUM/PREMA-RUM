import { Paper } from "@mui/material";
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
        'start': new Date('03-25-2022 13:00'),
        'end': new Date('03-25-2022 15:00'),
        'uuid': 0,
    }]);


    return(
        <Paper elevation={0} sx={classes.containerBox}> 
            <Calendar
                localizer={localizer}
                startAccessor="start"
                events={dates}
                endAccessor="end"
                view="week"
                defaultDate={new Date(moment.now())}
            />
        </Paper>
    )
}

const useStyles = {
    containerBox: {

    }
};
  
const classes = useStyles;