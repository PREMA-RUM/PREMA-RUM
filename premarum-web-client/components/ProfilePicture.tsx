import {useProfilePicture} from "../utility/hooks/useProfilePicture";
import {useStudent} from "../utility/hooks/useStudent";
import {Avatar} from "@mui/material";

export default function ProfilePicture() {
    const {profilePicture} = useProfilePicture()
    const {student} = useStudent()
    
    if (profilePicture === null || profilePicture === undefined)  {
        return <Avatar style={classes.profilePic} >
            {student? student.name![0]: <></>}
        </Avatar>
    }
    
    return <img src={profilePicture} style={classes.profilePic}  alt={"Profile"}/>
}

const useStyles = {
    profilePic: {
        borderRadius: 100,
        width: 40,
        height: 40,
    }
}

const classes = useStyles