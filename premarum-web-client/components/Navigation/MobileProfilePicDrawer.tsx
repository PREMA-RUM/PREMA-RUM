import {Button, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {AccountBoxRounded, LogoutRounded} from "@mui/icons-material";
import * as React from "react";
import {useRouter} from "next/router";
import Image from "next/image"

type MobileProfilePicDrawerProps = {
    open: boolean,
    onClose: () => void,
    onLogoutRequest: () => void
}

export default function MobileProfilePicDrawer(props: MobileProfilePicDrawerProps) {
    const router = useRouter()
    const classes = useStyles()
    
    return <Drawer
        open={props.open}
        onClose={props.onClose}
        anchor={'right'}
    >
        <List>
            <ListItemButton onClick={() => {router.push('/profile'); props.onClose()}}>
                <ListItemIcon>
                    <AccountBoxRounded/>
                </ListItemIcon>
                <ListItemText primary="Profile"/>
            </ListItemButton>
            
            <ListItemButton>
                <ListItemIcon>
                    <Image src={"/PayPal-Icon.png"} height={20} width={20}/>
                </ListItemIcon>
                <ListItemText primary="Donate"/>
            </ListItemButton>
            
            <ListItemButton onClick={() => {
                window?.open('https://github.com/kenneth-rosario/PREMA-RUM', '_blank'); 
                props.onClose()
            }}>
                <ListItemIcon>
                    <Image src={"/GitHub-Icon.png"} height={20} width={20} />
                </ListItemIcon>
                <ListItemText primary="Github Repository"/>
            </ListItemButton>
            
            <Divider />
            
            <ListItemButton onClick={props.onLogoutRequest}>
                <ListItemIcon>
                    <LogoutRounded/>
                </ListItemIcon>
                <ListItemText primary="Log Out"/>
            </ListItemButton>
        </List>

        <Button sx={classes.logoComponent} onClick={() => router.push('/')}>
            <Image
                height={45}
                width={45}
                alt="UPRM"
                src="/rum-logo.png"
            />
        </Button>
    </Drawer>
}

const useStyles = () => {
    return {
        logoComponent: {
            position: "absolute",
            bottom: 0,
            marginBottom: 0,
            height: "100px",
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
        },
    }
}