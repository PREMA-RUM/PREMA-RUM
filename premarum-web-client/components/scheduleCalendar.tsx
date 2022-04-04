import { Paper } from "@mui/material";
import React, {useEffect, useState} from "react";
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {IPreEnrollmentSelectionResponse} from "../utility/requests/responseTypes";
import {convertToMilitaryTime} from "../utility/helpers/dateHelpers";


const rows = [
    {id: 1, course: 'CIIC3000', section: '010', credits: 3, days: 'LWV', classroom: 'S121', timeslot: '3:30pm - 4:20pm', professor: 'Kejie Lu'},
    {id: 2, course: 'CIIC4000', section: '020H', credits: 4, days: 'LWV', classroom: 'S121', timeslot: '12:30pm - 1:20pm', professor: 'Manuel Rodriguez'},
    {id: 3, course: 'CIIC5000', section: '030', credits: 3, days: 'MJ', classroom: 'S113', timeslot: '2:00pm - 3:15pm', professor: 'Wilson Rivera'},
    {id: 4, course: 'CIIC6000', section: '040', credits: 3, days: 'LWV', classroom: 'S125C', timeslot: '10:30am - 11:20am', professor: 'Bienvenido Velez'},
    {id: 5, course: 'CIIC7000', section: '050H', credits: 4, days: 'MJ', classroom: 'S113', timeslot: '3:30pm - 4:45pm', professor: 'Marko Schutz'},
]

// [Sun: 20, Mon: 21, Tue: 22, Wed: 23, Thu: 24, Fri: 25, Sat: 26]
const days = {Sunday: '20', Monday: '21', Tuesday: '22', Wednesday: '23', Thursday: '24', Friday: '25', Saturday: '26'}

async function ScheduleDates(courseOfferings: IPreEnrollmentSelectionResponse[]) {
    return courseOfferings.flatMap((val, index) => {
        let timeSlots = val.timeSlots
        return timeSlots.map((ts, index) => {
            let realStartTime = convertToMilitaryTime(ts.startTime)
            let realEndTime = convertToMilitaryTime(ts.endTime)
            return {
                title: val.course.courseCode,
                start: new Date(`03-${days[ts.day]}-2022 ${realStartTime}`),
                end: new Date(`03-${days[ts.day]}-2022 ${realEndTime}`)
            }
        })
    })
}

const localizer = momentLocalizer(moment);

const formats = {
    dayFormat: "dddd",
    eventTimeRangeFormat: () => { 
        return "";
    },
}

type ScheduleCalendarProps = {
    courseOfferings: IPreEnrollmentSelectionResponse[]
}

export default function ScheduleCalendar({courseOfferings: courseOfferings}: ScheduleCalendarProps) {
    const [dates, setDates] = useState([]);
    
    useEffect(() => {
        console.log(courseOfferings)
        ScheduleDates(courseOfferings)
            .then(res => setDates(res))
    }, [courseOfferings])

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