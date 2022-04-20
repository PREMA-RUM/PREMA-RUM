import {Box, Paper, styled} from "@mui/material";
import React, {useEffect, useState} from "react";
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {IPreEnrollmentSelectionResponse} from "../utility/requests/responseTypes";
import {convertToMilitaryTime} from "../utility/helpers/dateHelpers";

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
                start: new Date(`2022-03-${(days as any)[ts.day] as string}T${realStartTime}`),
                end: new Date(`2022-03-${(days as any)[ts.day] as string}T${realEndTime}`)
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

const StyledOuterBox = styled(Box)(
    ({theme}) => ({
        [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
            overflowX: "scroll",
        }
    })
);
const StyledInnerPaper = styled(Paper)(
    ({theme}) => ({
        [theme.breakpoints.down("sm")]: {
            minWidth: "1000px"
        }
    })
);

type ScheduleCalendarProps = {
    courseOfferings: IPreEnrollmentSelectionResponse[]
}

export default function ScheduleCalendar({courseOfferings: courseOfferings}: ScheduleCalendarProps) {
    const [dates, setDates] = useState([]);
    
    useEffect(() => {
        ScheduleDates(courseOfferings)
            .then(res => setDates(res as never[]))
    }, [courseOfferings])

    return(
        <StyledOuterBox> 
            <StyledInnerPaper>
                <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    view="week"
                    toolbar={false}
                    formats={formats}
                    defaultDate={new Date('2022-03-20T00:00')} // default date to make week static on this time
                    events={dates}
                    eventPropGetter={(event, start, end, isSelected) => ({
                        event,
                        start,
                        end,
                        isSelected,
                        style: {
                            backgroundColor: "rgba(152, 0, 78, 0.7)",
                            border: 'none',
                            padding: '10px 0 10px 10px'
                        },
                    })}
                />  
            </StyledInnerPaper>
        </StyledOuterBox>
    )
}

const useStyles = {
    containerBox: {
        // maxWidth: '100%',  // play with breakpoint
        // overflowX: 'scroll'
    },
    containerBoxInner: {
        // minWidth: '1000px'
    }
};
  
const classes = useStyles;