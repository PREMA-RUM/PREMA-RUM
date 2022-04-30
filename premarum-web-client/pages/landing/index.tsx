import {Box,Grow,styled, Tab, Tabs, useMediaQuery, useTheme} from "@mui/material";
import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import OverlayIcons from "../../components/OverlayIcons";
import LandingHome from "../../components/Landing/landingHome";
import LandingAbout from "../../components/Landing/landingAbout";
import LandingContact from "../../components/Landing/landingContact";
import Head from "next/head";


export default function Landing() {
    const [value, setValue] = React.useState(0);
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'), {noSsr:true}); // it reloads the iframe everytime it fetches this query (not intended)
    const [animation, setAnimation] = React.useState(false);
    const [tabType, setTabType] = useState<"fullWidth" | "standard">('standard')
    
    useEffect(() => {
        if (matches) {
            setTabType('fullWidth')
        } else {
            setTabType('standard')
        }
    }, [matches, tabType])

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
        position: "static",
        width: "100%",
        top: 0,
        zIndex: 100,
        padding: '10px 20px 20px 20px',
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

    const css = `
        body, html {
            margin: 0;
            height: 100vh;
            width: 100%;
        }
        body {
            background: linear-gradient(rgba(22,74,65,0.6), rgba(0,0,0,0.6)), url(backgroundImage2.png);
            background-color: #9DC88D;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            background-attachment: fixed;
        }
    `

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
            <Head>
                <style>{css}</style>
            </Head>
            <StyledTabs
                value={value}
                onChange={handleChange}
                variant={tabType}
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
    },
    tabBar: {

    },
    contentBox: {

    },
    tabContent: {

    },
};
  
const classes = useStyles;