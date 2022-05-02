import {useProfilePicture} from "../../utility/hooks/useProfilePicture";
import {useStudent} from "../../utility/hooks/useStudent";
import {Avatar, Box, useMediaQuery} from "@mui/material";
import Image from 'next/image'
import {useState} from "react";
import dynamic from "next/dynamic";
import {useTheme} from "@mui/material/styles";
import {LogoutModal} from "../logoutModal";
import useIsMobile from "../../utility/hooks/useIsMobile";

const MobilePicDrawer = dynamic(() => import('./MobileProfilePicDrawer'))

export default function ProfilePicture() {
    const {student} = useStudent()
    const {profilePicture} = useProfilePicture()
    const [showDrawer, setShowDrawer] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const isMobile = useIsMobile()
    
    if (!profilePicture)  {
        return <>
            {isMobile && <>
                <MobilePicDrawer open={showDrawer} onClose={()=>{setShowDrawer(false)}} onLogoutRequest={()=>{setShowLogoutModal(true)}}/>
                <LogoutModal openModalState={showLogoutModal} setOpenModalState={setShowLogoutModal} />
            </>}
            <Avatar style={classes.profilePic} onClick={() => setShowDrawer(true)}>
                {student? student.name![0]: <></>}
            </Avatar>
        </>
    }
    
    return <>
        {isMobile && <>
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