import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper, Stack,
    Toolbar, Typography,
    useMediaQuery
} from "@mui/material";
import {useEffect, useState} from "react";
import {AccountBoxRounded, HomeRounded, ListAltRounded} from "@mui/icons-material";
import * as React from "react";
import {useRouter} from "next/router";
import Navbars from "./navbars";
import OverlayIcons from "./OverlayIcons";
import {Theme, useTheme} from "@mui/material/styles";


type MobileNavbarProps = {
    children: any
}

export default function MobileNavbar({children}: MobileNavbarProps) {
    
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'), {noSsr:true});
    const router = useRouter();
    const classes = useStyles(theme)
    const [value, setValue] = useState<number | null>(null);
    const [title, setTitle] = useState("")
    
    useEffect(() => {
        switch(router.pathname) {
            case "/home":
                setValue(0)
                setTitle("Pre-Enrollment List")
                break
            case "/catalog":
                setValue(1)
                setTitle("Course Catalog")
                break
            case "/profile":
                setValue(2)
                setTitle("Profile")
                break
            default:
                router.pathname.startsWith("/preenrollment")?setTitle("Edit Pre-Enrollment"):null
                setValue(null)
        }
    }, [router.pathname])

    if (!matches) {
        return <>
            <OverlayIcons />
            <Navbars>{children}</Navbars>
            </>
    }
    
    return (
        <Box sx={classes.mainBox}>
            <AppBar position="fixed">
                <Toolbar>
                    <Stack onClick={() => {router.push('/home')}} style={{color: 'white', marginLeft: -8}}>
                        <Typography variant="h6" noWrap component="div">
                            PREMARUM
                        </Typography>
                        <Typography sx={classes.subTitle} variant={"subtitle2"}>
                            {title}
                        </Typography>
                    </Stack>
                </Toolbar>
            </AppBar>
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

const useStyles = (theme: Theme) => ({
    subTitle: {
        marginTop: -1
    },
    mainBox: {
        display: 'flex', 
        p:1, 
        pb: 10, 
        pt:8
    }
})