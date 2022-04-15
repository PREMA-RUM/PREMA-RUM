import {BottomNavigation, BottomNavigationAction, Box, Fab, IconButton, Paper, styled} from "@mui/material";
import {useEffect, useState} from "react";
import {AccountBoxRounded, HomeRounded, ListAltRounded} from "@mui/icons-material";
import * as React from "react";
import {useRouter} from "next/router";
import {useWindowSize} from "../utility/hooks/useWindowSize";
import Navbars from "./navbars";
import OverlayIcons from "./OverlayIcons";


type MobileNavbarProps = {
    children: any
}

export default function MobileNavbar({children}: MobileNavbarProps) {
    
    const {width, height} = useWindowSize()
    const [value, setValue] = useState<number | null>(null);
    const router = useRouter();
    
    useEffect(() => {
        switch(router.pathname) {
            case "/home":
                setValue(0)
                break
            case "/catalog":
                setValue(1)
                break
            case "/profile":
                setValue(2)
                break
            default:
                setValue(null)
        }
    }, [router.pathname])

    if (width! > 500) {
        return <>
            <OverlayIcons />
            <Navbars>{children}</Navbars>
            </>
    }
    
    return (
        <Box sx={{display: 'flex', p:1, pb: 10}}>
            {children}
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        switch (newValue) {
                            case 0:
                                router.push("/home")
                                break
                            case 1:
                                router.push("/catalog")
                                break
                            case 2:
                                router.push("/profile")
                                break
                            default:
                                router.push("/")
                        }
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Home" icon={<HomeRounded/>} />
                    <BottomNavigationAction label="Courses" icon={<ListAltRounded/>} />
                    <BottomNavigationAction label="Profile" icon={<AccountBoxRounded/>} />
                </BottomNavigation>
            </Paper>
        </Box>
    )
}