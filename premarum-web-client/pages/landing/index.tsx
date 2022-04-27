import {Box, Button, Card, CardContent, Grid, styled, Tab, Tabs, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useMsal} from "@azure/msal-react";
import {PopupRequest} from "@azure/msal-browser";
import getOrCreateUser from "../../utility/requests/getOrCreateUser";
import { TOKEN_REQUEST } from "../../utility/constants";
import {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useRef, useState} from "react";
import OverlayIcons from "../../components/OverlayIcons";
import { url } from "inspector";
import { ExpandMoreOutlined } from "@mui/icons-material";
import LandingHome from "../../components/Landing/landingHome";
import LandingAbout from "../../components/Landing/landingAbout";
import LandingContact from "../../components/Landing/landingContact";


export default function Landing() {
    const [value, setValue] = React.useState(0);
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'), {noSsr:true});

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    interface StyledTabsProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    interface StyledTabProps {
        label: string;
    }

    const StyledTabs = styled(Tabs)({
        backgroundColor: "transparent",
        '& .MuiTabs-indicator': {
            backgroundColor: 'white',
            '&.Mui-selected': {
                color: 'white',
            },
            '&.Mui-focusVisible': {
                backgroundColor: 'white',
            },
        },
    });

    const StyledTab = styled((props: StyledTabProps) => <Tab wrapped disableRipple {...props} />)(
        ({ theme }) => ({
            color: 'rgba(255, 255, 255, 0.6)',
            '&:hover': {
                color: 'white',
                opacity: 1,
            },
            '&.Mui-selected': {
                color: 'white',
            },
            '&.Mui-focusVisible': {
                backgroundColor: 'rgba(100, 95, 228, 0.32)',
            },
        })
    )

    function TabPanel(props: StyledTabsProps) {
        const { children, value, index, ...other } = props;

        return (
            <Box
                {...other}
            >
                {value === index && (
                    <Box sx={classes.tabContent}>
                        {children}
                    </Box>
                )}
            </Box>
        );
    }

    return(
        <Box sx={classes.fullBox}>
            <OverlayIcons />
            <StyledTabs
                value={value}
                onChange={handleChange}
                sx={matches? {padding: '0 0 20px 0'}: {padding: '10px 20px 20px 20px'}}
                variant={matches? 'fullWidth':'standard'}
                aria-label="tab bar landing page"
            >
                <StyledTab label='Home' />
                <StyledTab label='About' />
                <StyledTab label='Contact Us' />
            </StyledTabs>

            <TabPanel value={value} index={0}>
                <LandingHome/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <LandingAbout/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <LandingContact/>
            </TabPanel>
            </Box>

    )
}

Landing.getLayout = function getLayout(page: NextPage) {
    return (
        page
    )
}


const useStyles = {
    fullBox: {
        width: '100%',
        height: '100%',
        background: `linear-gradient(rgba(22,74,65,0.6), rgba(0,0,0,0.6)),
        url(backgroundImage2.png)`,
        backgroundColor: 'secondary.main',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    },
    tabBar: {

    },
    contentBox: {

    },
    tabContent: {

    },
};
  
const classes = useStyles;