import { Box, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from "@mui/material"
import { ITimeSlotResponse } from "../requests/responseTypes";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 200,
    },
});

export function GetColumnFormat(props: {creditSum: number | null}) {
    const columns = [
        {field: 'course', headerName: 'Course', minWidth: 100, description: '',
            renderCell: (params: any) => (
                <CustomTooltip title={params.value} placement="right" arrow>
                    <Box>{params.value}</Box>
                </CustomTooltip>
            )
        },
        {field: 'section', headerName: 'Section', minWidth: 100, description: ''},
        {field: 'credits', headerName: props.creditSum? `Credits [${props.creditSum}]`:"Credits", minWidth: 100, description: ''},
        {field: 'classroom', headerName: 'Classroom', minWidth: 100, description: ''},
        {field: 'timeslot', headerName: 'Timeslot', minWidth: 150, flex: 1, description: '',
            renderCell: (params: any) => (
                <Box sx={{ whiteSpace: 'normal', overflowY: 'auto', maxHeight: 75, width: '100%'}}>
                    {((params.value) as ITimeSlotResponse[]).map((val, index) => {
                        return(
                            <Typography sx={{fontSize: '0.875rem'}}>{`${val.day.substring(0, 3)} | ${val.startTime} - ${val.endTime}`}</Typography>
                        )
                    })}
                </Box>
            )
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