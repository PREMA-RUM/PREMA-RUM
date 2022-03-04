import { DeleteRounded } from "@mui/icons-material";
import { Grid, Card, CardHeader, Divider, CardContent, Avatar, Button, ButtonGroup } from "@mui/material";

function OptionsButton() {
    return(
        <ButtonGroup variant="contained" disableElevation sx={classes.buttonGroup}>
            <Button>Edit</Button>
            <Button size="small">
                <DeleteRounded/>
            </Button>
        </ButtonGroup>
    )
}

function PreenrollmentCardItem() {
    return(
        <>
        <Card elevation={0} square sx={classes.itemCard}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.dark' }} aria-label="Pre-Enrollment Name">
                        P
                    </Avatar>
                }
                action={
                    <OptionsButton/>
                }
                title="Pre-Enrollment Name - 21 Credits"
                subheader="CIIC4020, CIIC4050, PSIC3001, ..."
            />
        </Card>
        <Divider/>
        </>
    )
}

export default function PreenrollmentCard() {
    return(
        <Card sx={classes.containerCard}>
            <CardHeader
                sx={classes.mainHeader}
                title="Semester - Fall 2022"
            />
            <Divider/>
            
                <PreenrollmentCardItem/>
                <PreenrollmentCardItem/>
            
        </Card>
    )
}

const useStyles = {
    containerCard: {
        marginBottom: 1.5
    },
    mainHeader: {
        
    },
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