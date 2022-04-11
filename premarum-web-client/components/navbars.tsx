import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Box, CssBaseline, Divider, IconButton, ListItemIcon, ListItemText, Toolbar, Typography, List, ListItemButton, Grid, Avatar, Button, Tooltip } from '@mui/material/'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import {Menu, ChevronLeft, ChevronRight, AccountBoxRounded, HomeRounded, ListAltRounded, AccountCircle, ManageAccountsRounded, SchoolRounded, LogoutRounded} from '@mui/icons-material'
import { useRouter } from 'next/router';
import {useMsal} from "@azure/msal-react";
import { LogoutModal } from './logoutModal';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7.5)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7.5)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const useStyles = {
  logoComponent: {
    position: "absolute",
    bottom: 0,
    marginBottom: 0,
    height: "100px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  boxSize: {
    width: "45px",
    height: "45px",
  }
};

export default function Navbars({children}:any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openLogout, setOpenLogout] = React.useState(false);
  const router = useRouter();
  const classes = useStyles;

  const { instance } = useMsal();

  const handleLogoutOpen = () => {
    setOpenLogout(true);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
                }}
            >
                <Menu />
            </IconButton>
            <Button disableRipple onClick={() => {router.push('/home')}} style={{color: 'white', marginLeft: -8}}>
              <Typography variant="h6" noWrap component="div">
                PREMARUM
              </Typography>
            </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />

          <List>
              <Tooltip title="Home" placement="right">
                <ListItemButton key="Home" onClick={() => {router.push('/home')}}>
                    <ListItemIcon>
                        <HomeRounded/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItemButton>
              </Tooltip>

              <Tooltip title="Course Catalog" placement="right">  
                <ListItemButton key="Course Catalog" onClick={() => {router.push('/catalog')}}>
                    <ListItemIcon>
                        <ListAltRounded/>
                    </ListItemIcon>
                    <ListItemText primary="Course Catalog"/>
                </ListItemButton>
              </Tooltip>
              
              <Tooltip title="Profile" placement="right">
                <ListItemButton key="Profile" onClick={() => {router.push('/profile')}}>
                    <ListItemIcon>
                        <AccountBoxRounded/>
                    </ListItemIcon> 
                    <ListItemText primary="Profile"/>
                </ListItemButton>
              </Tooltip>  

              <Divider />

              <Tooltip title="Log Out" placement="right">
                <ListItemButton key="Log Out" onClick={handleLogoutOpen}>
                    <ListItemIcon>
                        <LogoutRounded/>
                    </ListItemIcon> 
                    <ListItemText primary="Log Out"/>
                </ListItemButton>
              </Tooltip>
          </List>
          
          <Tooltip title="UPRM" placement="right">
            <Button sx={classes.logoComponent} onClick={() => router.push('/')}>
                <Box
                  sx={classes.boxSize}
                  component="img"
                  alt="UPRM"
                  src="https://www.uprm.edu/wdt/resources/seal-rum-uprm.svg"
                />
            </Button>
          </Tooltip>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {children}

      </Box>
    </Box>
    <LogoutModal openModalState={openLogout} setOpenModalState={setOpenLogout} />
    </>
  );
}
