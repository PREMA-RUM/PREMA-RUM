import React from "react";
import {usePreEnrollments} from "../../../utility/hooks/usePreEnrollments";
import {CircularProgress, Grid, Typography} from "@mui/material";
import PreEnrollmentCard, {PreEnrollmentCardProps} from "./PreEnrollmentCard";
import {IPreEnrollmentResponse} from "../../../utility/requests/responseTypes";


export default function PreEnrollmentCardSection(): JSX.Element {
    const {preEnrollments, isLoading, isError} = usePreEnrollments();
    console.log(preEnrollments)
    function processPreEnrollments():Map<string, IPreEnrollmentResponse[]> {
        const groups = new Map<string, IPreEnrollmentResponse[]>();
        preEnrollments?.forEach((currVal:IPreEnrollmentResponse) => {
            let {semester} = currVal;
            let currKey = JSON.stringify(semester)
            if (!groups.has(currKey)) {
                groups.set(currKey, [])
            }
            groups.get(currKey)!.push(currVal);
        })
        return groups
    }
    
    function getGroupedPreEnrollmentJsx() {
        let result:PreEnrollmentCardProps[] = [];
        for (let item of Array.from(processPreEnrollments().entries()) as [string, IPreEnrollmentResponse[]][]) {
            result.push({group: item[1], semester: JSON.parse(item[0])})
        }
        result.sort((a, b) => {
            return b.semester.year - a.semester.year
        });
        return <>
            {result.map((currVal:PreEnrollmentCardProps, index:number) => {
                return <PreEnrollmentCard key={index+1000} group={currVal.group} semester={currVal.semester} />
            })}
        </>
    }
    
    if (isLoading) {
        return <CircularProgress/>;
    }
    if (preEnrollments?.length == 0) {
        return <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography>Nothing here yet... :(</Typography>
        </Grid>;
    }
    return getGroupedPreEnrollmentJsx()
}