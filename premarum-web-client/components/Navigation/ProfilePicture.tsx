import {useProfilePicture} from "../../utility/hooks/useProfilePicture";
import {useStudent} from "../../utility/hooks/useStudent";
import {Avatar, Box, useMediaQuery} from "@mui/material";
import Image from 'next/image'
import {useState} from "react";
import dynamic from "next/dynamic";
import {useTheme} from "@mui/material/styles";
import {LogoutModal} from "../logoutModal";

const MobilePicDrawer = dynamic(() => import('./MobileProfilePicDrawer'))

export default function ProfilePicture() {
    const {profilePicture} = useProfilePicture()
    const {student} = useStudent()
    const [showDrawer, setShowDrawer] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    // TODO: Change to useIsMobile Once it is merge
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down("sm"), {noSsr:true})
    
    if (profilePicture === null || profilePicture === undefined)  {
        return <>
            {matches && <>
                <MobilePicDrawer open={showDrawer} onClose={()=>{setShowDrawer(false)}} onLogoutRequest={()=>{setShowLogoutModal(true)}}/>
                <LogoutModal openModalState={showLogoutModal} setOpenModalState={setShowLogoutModal} />
            </>}
            <Avatar style={classes.profilePic} >
                {student? student.name![0]: <></>}
            </Avatar>
        </>
    }
    
    return <>
        {matches && <>
                <MobilePicDrawer open={showDrawer} onClose={()=>{setShowDrawer(false)}} onLogoutRequest={()=>{setShowLogoutModal(true)}}/>
                <LogoutModal openModalState={showLogoutModal} setOpenModalState={setShowLogoutModal} />
            </>    
        }
        <Box 
            onClick={() => setShowDrawer(true)}
            style={classes.profilePic}>
            <Image
                src={profilePicture}
                width={40}
                height={40}
                alt={"Profile"}/>
        </Box>
    </>
}

const useStyles = {
    profilePic: {
        borderRadius: 100,
        width:40,
        height:40,
        overflow:'hidden'
    }
}

const classes = useStyles