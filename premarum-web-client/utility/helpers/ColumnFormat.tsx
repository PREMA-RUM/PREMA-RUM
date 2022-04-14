import { Box, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from "@mui/material"
import {ICourseResponse, ITimeSlotResponse} from "../requests/responseTypes";
import {GridCellValue, GridColDef} from "@mui/x-data-grid";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 200,
    },
});

export function GetColumnFormat(props: {creditSum: number | null}) {
    const columns:GridColDef[] = [
        {field: 'course', headerName: 'Course', minWidth: 100, description: '',
            renderCell: (params: any) => {
                const val: ICourseResponse = JSON.parse(params.value)
                return <CustomTooltip title={`${val.courseCode} - ${val.courseName}`} placement="right"
                               arrow>
                    <Box>{val.courseCode}</Box>
                </CustomTooltip>
            }
        },
        {field: 'section', headerName: 'Section', minWidth: 100, description: ''},
        {field: 'credits', headerName: props.creditSum? `Credits [${props.creditSum}]`:"Credits", minWidth: 100, description: ''},
        {field: 'classroom', headerName: 'Classroom', minWidth: 100, description: ''},
        {field: 'timeslot', headerName: 'Timeslot', minWidth: 150, flex: 1, description: '',
            renderCell: (params: any) => {
                const tsArray: ITimeSlotResponse[] = JSON.parse(params.value)
                return <Box sx={{whiteSpace: 'normal', overflowY: 'auto', maxHeight: 75, width: '100%'}}>
                    {tsArray.map((val, index) => {
                        return (
                            <Typography
                                sx={{fontSize: '0.875rem'}}>{`${val.day.substring(0, 3)} | ${val.startTime} - ${val.endTime}`}</Typography>
                        )
                    })}
                </Box>
            }
        },
        {field: 'professor', headerName: 'Professor', minWidth: 150, flex: 1, description: '',
            renderCell: (params: any) => (
                <Box sx={{ whiteSpace: 'normal', overflowY: 'auto', maxHeight: 50, width: '100%'}}>
                    <Typography sx={{fontSize: '0.875rem'}}>{params.value}</Typography>
                </Box>
            )
        },
        {field: 'prerequisites', headerName: 'Pre-requisites', minWidth: 150, flex: 1, description: '',
            renderCell: (params: any) => (
                <Box sx={{ whiteSpace: 'normal', overflowY: 'auto', maxHeight: 50, width: '100%'}}>
                    <Typography sx={{fontSize: '0.875rem'}}>{params.value}</Typography>
                </Box>
            )
        },
        {field: 'corequisites', headerName: 'Co-requisites', minWidth: 150, flex: 1, description: '',
            renderCell: (params: any) => (
                <Box sx={{ whiteSpace: 'normal', overflowY: 'auto', maxHeight: 50, width: '100%'}}>
                    <Typography sx={{fontSize: '0.875rem'}}>{params.value}</Typography>
                </Box>
            )
        },
    ]
    return columns
}