import React, {useEffect, useState} from "react";
import {usePreEnrollments} from "../../utility/hooks/usePreEnrollments";
import {Button, CircularProgress, Stack, Typography} from "@mui/material";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import _ from 'lodash';
import PreEnrollmentCard, {PreEnrollmentCardProps} from "./PreEnrollmentCard";
import {AddRounded} from "@mui/icons-material";

type PreEnrollmentCardSection = {
    handleModalOpen: () => void
}

export default function PreEnrollmentCardSection({handleModalOpen}: PreEnrollmentCardSection): JSX.Element {
    const {preEnrollments, isLoading, isError} = usePreEnrollments();
    const [group, setGroup] = useState<PreEnrollmentCardProps[]>([])
    const classes = useStyle()
    
    useEffect(() => {
        getGroupedPreEnrollment()
            .then(res => setGroup(res))
    }, [preEnrollments])
    
    async function processPreEnrollments(): Promise<any> {
        return _.groupBy(preEnrollments, p => p.semester.id)
    }
    
    async function getGroupedPreEnrollment(): Promise<PreEnrollmentCardProps[]> {
        let result: PreEnrollmentCardProps[] = []
        let groupedPreEnrollments = await processPreEnrollments();
        for (let i in groupedPreEnrollments) {
            result.push({
                group:groupedPreEnrollments[i], 
                semester:groupedPreEnrollments[i][0].semester
            })
        }
        result.sort((a, b) => b.semester.id - a.semester.id)
        return result
    }
    
    if (isLoading) {
        return <CircularProgress/>;
    }
    if (preEnrollments?.length === 0) {
        return <Stack justifyContent="center" alignItems="center" >
                <EventBusyIcon sx={{width:100, height:100}} />
                <Typography variant={"h5"}>Nothing here yet...</Typography>
                <Button
                    variant="contained"
                    sx={classes.addCoursesButton}
                    onClick={handleModalOpen}
                >
                    Get Started
                </Button>
        </Stack>;
    }
    
    return <>
        {group.map((currVal:any, index:number) => {
            return <PreEnrollmentCard key={index+1000} group={currVal.group} semester={currVal.semester} />
        })}
    </>
}

const useStyle = () => ({
    addCoursesButton: {
        marginTop:2,
        backgroundColor: 'primary.dark'
    }
})