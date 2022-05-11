import {Box, Paper, styled} from "@mui/material";
import React, {useEffect, useState} from "react";
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {IPreEnrollmentSelectionResponse, ITimeSlotResponse} from "../utility/requests/responseTypes";
import {convertToMilitaryTime} from "../utility/helpers/dateHelpers";

// [Sun: 20, Mon: 21, Tue: 22, Wed: 23, Thu: 24, Fri: 25, Sat: 26]
const days = {Sunday: '20', Monday: '21', Tuesday: '22', Wednesday: '23', Thursday: '24', Friday: '25', Saturday: '26'}
const colors = [
    'rgba(51, 82, 84, 0.8)',
    'rgba(97, 16, 20, 0.8)',
    'rgba(0, 0, 0, 0.8)',
    'rgba(219, 68, 61, 0.8)',
    'rgba(223, 150, 54, 0.8)',
    'rgba(118, 3, 85, 0.8)',
    'rgba(1, 122, 111, 0.8)',
    'rgba(180, 17, 61, 0.8)',
    'rgba(111, 152, 189, 0.8)',
    'rgba(9, 4, 55, 0.8)',
] // 10 colors

async function ScheduleDates(courseOfferings: IPreEnrollmentSelectionResponse[]) {
    return courseOfferings.flatMap((val: IPreEnrollmentSelectionResponse, index) => {
        let timeSlots = val.timeSlots
        return timeSlots.map((ts: ITimeSlotResponse) => {
            let realStartTime = convertToMilitaryTime(ts.startTime)
            let realEndTime = convertToMilitaryTime(ts.endTime)
            return {
                title: `${val.course.courseCode} - ${val.sectionName}`,
                start: new Date(`2022-03-${(days as any)[ts.day] as string}T${realStartTime}`),
                end: new Date(`2022-03-${(days as any)[ts.day] as string}T${realEndTime}`),
                color: colors[index % colors.length]
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
                    eventPropGetter={event => {
                        return {
                            style: {
                                backgroundColor: (event as any).color,
                                borderStyle: 'solid',
                                borderColor: 'black',
                                padding: '10px 10px 10px 10px'
                            },
                        }
                    }}
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