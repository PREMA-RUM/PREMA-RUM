import React, {useEffect, useState} from "react";
import {usePreEnrollments} from "../../utility/hooks/usePreEnrollments";
import {CircularProgress, Grid, Typography} from "@mui/material";
import PreEnrollmentCard, {PreEnrollmentCardProps} from "./PreEnrollmentCard";
import _ from 'lodash';


export default function PreEnrollmentCardSection(): JSX.Element {
    const {preEnrollments, isLoading, isError} = usePreEnrollments();
    const [group, setGroup] = useState<PreEnrollmentCardProps[]>([])
    
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
        result.sort((a, b) => a.semester.id - b.semester.id)
        return result
    }
    
    if (isLoading) {
        return <CircularProgress/>;
    }
    if (preEnrollments?.length === 0) {
        return <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography>Nothing here yet... :(</Typography>
        </Grid>;
    }
    
    return <>
        {group.map((currVal:any, index:number) => {
            return <PreEnrollmentCard key={index+1000} group={currVal.group} semester={currVal.semester} />
        })}
    </>
}