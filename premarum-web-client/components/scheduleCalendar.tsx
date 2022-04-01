import { Paper } from "@mui/material";
import React, { useState } from "react";
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';


const rows = [
    {id: 1, course: 'CIIC3000', section: '010', credits: 3, days: 'LWV', classroom: 'S121', timeslot: '3:30pm - 4:20pm', professor: 'Kejie Lu'},
    {id: 2, course: 'CIIC4000', section: '020H', credits: 4, days: 'LWV', classroom: 'S121', timeslot: '12:30pm - 1:20pm', professor: 'Manuel Rodriguez'},
    {id: 3, course: 'CIIC5000', section: '030', credits: 3, days: 'MJ', classroom: 'S113', timeslot: '2:00pm - 3:15pm', professor: 'Wilson Rivera'},
    {id: 4, course: 'CIIC6000', section: '040', credits: 3, days: 'LWV', classroom: 'S125C', timeslot: '10:30am - 11:20am', professor: 'Bienvenido Velez'},
    {id: 5, course: 'CIIC7000', section: '050H', credits: 4, days: 'MJ', classroom: 'S113', timeslot: '3:30pm - 4:45pm', professor: 'Marko Schutz'},
]

// [Sun: 20, Mon: 21, Tue: 22, Wed: 23, Thu: 24, Fri: 25, Sat: 26]
const days = {Sun: '20', Mon: '21', Tue: '22', Wed: '23', Thu: '24', Fri: '25', Sat: '26'}

function ScheduleDates() {
    let dates = []

    for (let i in rows) {
        let time = rows[i].timeslot.split(" - ")
        let start = time[0]
        let end = time[1]
        let hour = 0

        if (start.slice(-2) == "pm") {
            start = start.slice(0, -2)
            hour = parseInt(start.split(":")[0])
            if (hour !== 12) {hour += 12}
            start = hour + ":" + start.slice(-2)
        } else {
            start = start.slice(0, -2)
        }

        if (end.slice(-2) == "pm") {
            end = end.slice(0, -2)
            hour = parseInt(end.split(":")[0])
            if (hour !== 12) {hour += 12}
            end = hour + ":" + end.slice(-2)
        } else {
            end = end.slice(0, -2)
        }

        if (rows[i].days === "LWV") {
            dates.push({'title': rows[i].course, 'start': new Date('03-' + days.Mon + '-2022 ' + start), 'end': new Date('03-' + days.Mon + '-2022 ' + end)})
            dates.push({'title': rows[i].course, 'start': new Date('03-' + days.Wed + '-2022 ' + start), 'end': new Date('03-' + days.Wed + '-2022 ' + end)})
            dates.push({'title': rows[i].course, 'start': new Date('03-' + days.Fri + '-2022 ' + start), 'end': new Date('03-' + days.Fri + '-2022 ' + end)})
        }
        else if (rows[i].days === "MJ") {
            dates.push({'title': rows[i].course, 'start': new Date('03-' + days.Tue + '-2022 ' + start), 'end': new Date('03-' + days.Tue + '-2022 ' + end)})
            dates.push({'title': rows[i].course, 'start': new Date('03-' + days.Thu + '-2022 ' + start), 'end': new Date('03-' + days.Thu + '-2022 ' + end)})
        }
        else {
            dates.push({'title': rows[i].course, 'start': new Date('03-' + days.Mon + '-2022 ' + start), 'end': new Date('03-' + days.Mon + '-2022 ' + end)})
        }
    }
    return dates
}

const localizer = momentLocalizer(moment);

const formats = {
    dayFormat: "dddd",
    eventTimeRangeFormat: () => { 
        return "";
    },
}

export default function ScheduleCalendar() {
    const [dates, setDates] = useState(ScheduleDates());

    return(
        <Paper elevation={0} sx={classes.containerBox}> 
            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                view="week"
                toolbar={false}
                formats={formats}
                defaultDate={new Date('03-20-2022 00:00')} // default date to make week static on this time
                events={dates}
                eventPropGetter={(event, start, end, isSelected) => ({
                    event,
                    start,
                    end,
                    isSelected,
                    style: {
                        backgroundColor: "rgba(152, 0, 78, 0.8)",
                        border: 'none',
                        padding: '10px 0 10px 10px'
                    },
                    
                })}
            />
        </Paper>
    )
}

const useStyles = {
    containerBox: {

    },
};
  
const classes = useStyles;