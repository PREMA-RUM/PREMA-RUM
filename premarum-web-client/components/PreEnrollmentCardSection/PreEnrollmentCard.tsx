import {DeleteRounded} from "@mui/icons-material";
import {Card, CardHeader, Divider, Avatar, Button, ButtonGroup} from "@mui/material";
import { useRouter } from "next/router";
import {
    IPreEnrollmentResponse,
    IPreEnrollmentSelectionResponse,
    ISemesterResponse
} from "../../utility/requests/responseTypes";
import {usePreEnrollments} from "../../utility/hooks/usePreEnrollments";
import {useEffect, useState} from "react";

export type OptionsButtonProps = {
    preEnrollment: IPreEnrollmentResponse
}

function OptionsButton({preEnrollment}: OptionsButtonProps) {
    const router = useRouter();
    const {removePreEnrollmentFromCache} = usePreEnrollments()
    
    async function handleDelete() {
        if (confirm(`Are your sure you want to delete pre enrollment ${preEnrollment.name}?`)) {
            await removePreEnrollmentFromCache(preEnrollment.id)
        }
    }

    return(
        <ButtonGroup variant="contained" disableElevation sx={classes.buttonGroup}>
            <Button onClick={() => {router.push(`/preenrollment/${preEnrollment.id}`)}}>Edit</Button>
            <Button size="small">
                <DeleteRounded onClick={handleDelete} />
            </Button>
        </ButtonGroup>
    )
}

export type PreEnrollmentCardItemProps = {
    preEnrollment: IPreEnrollmentResponse
}

function PreEnrollmentCardItem({preEnrollment}: PreEnrollmentCardItemProps) {
    
    const [totalCredits, setTotalCredits] = useState(0)
    const [courseStringList, setCourseStringList] = useState("")
    
    async function getTotalCredits(): Promise<number> {
        return preEnrollment
            .selections
            .reduce((currCredits: number, currentVal: IPreEnrollmentSelectionResponse) => {
                return currCredits + currentVal.course.courseCredit
            }, 0);
    }
    
    async function getCourseStringList(): Promise<string> {
        let finalString = ""
        if (preEnrollment.selections.length === 0) {
            return finalString
        }
        for (let i = 0; i < 3; i++) {
            if (i === preEnrollment.selections.length - 1) {
                finalString += `${preEnrollment.selections[i].course.courseCode}`
            } else if (i < preEnrollment.selections.length) {
                finalString += `${preEnrollment.selections[i].course.courseCode}, `
            }
        }
        if (preEnrollment.selections.length > 3) {
            finalString += "..."
        }
        return finalString;
    }
    
    useEffect(() => {
        getTotalCredits()
            .then(res => setTotalCredits(res))
        getCourseStringList()
            .then(res => setCourseStringList(res))
    })

    return (
        <>
            <Card elevation={0} square sx={classes.itemCard}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: 'secondary.dark'}} aria-label={`${preEnrollment.name}`}>
                            {preEnrollment.name[0]}
                        </Avatar>
                    }
                    action={
                        <OptionsButton preEnrollment={preEnrollment}/>
                    }
                    title={`${preEnrollment.name} - ${totalCredits} Credits`}
                    subheader={courseStringList}
                />
            </Card>
            <Divider/>
        </>
    )
}

export type PreEnrollmentCardProps = {
    group: IPreEnrollmentResponse[],
    semester: ISemesterResponse
}

export default function PreEnrollmentCard({group, semester}: PreEnrollmentCardProps) {
    return (
        <Card sx={classes.containerCard}>
            <CardHeader
                sx={classes.mainHeader}
                title={`Semester - ${semester.term} - ${semester.year}`}
            />
            <Divider/>
            {group.map((currVal: IPreEnrollmentResponse, index: number) => {
                return <PreEnrollmentCardItem preEnrollment={currVal} key={index + 8888}/>
            })}
        </Card>
    )
}

const useStyles = {
    containerCard: {
        marginBottom: 1.5
    },
    mainHeader: {},
    mainContent: {
        width: '100%',
    },
    buttonGroup: {
        marginLeft: 5,
        marginTop: 0.8,
        paddingRight: '10px'
    },
    itemGrid: {
        width: '100%',
    },
    itemCard: {
        width: '100%'
    }
};

const classes = useStyles;