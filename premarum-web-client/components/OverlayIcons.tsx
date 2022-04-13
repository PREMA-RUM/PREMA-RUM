import { Button, Tooltip } from "@mui/material";

export function GithubIcon() {
    return(
        <Tooltip title="Click Me!" placement="left" arrow>
                <Button
                    sx={classes.githubButton}
                    href="https://github.com/kenneth-rosario/PREMA-RUM"
                    target="_blank"
                    disableRipple
                >
                    <img src="/GitHub-Icon.png" style={classes.icon}/>
                </Button>
        </Tooltip>
    )
}

export function PaypalIcon() {
    return(
        <Tooltip title="Please Donate!" placement="left" arrow>
                <Button
                    sx={classes.paypalButton}
                    href=""
                    target="_blank"
                    disableRipple
                >
                    <img src="/PayPal-Icon.png" style={classes.icon}/>
                </Button>
        </Tooltip>
    )
}

export default function OverlayIcons() {
    return(
        <>
        <GithubIcon/>
        <PaypalIcon/>
        </>
    )
}

const useStyles = {
    githubButton: {
        zIndex: 100,
        width: '32px',
        minWidth: '32px',
        height: '32px',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
    },
    paypalButton: {
        zIndex: 100,
        width: '32px',
        minWidth: '32px',
        height: '32px',
        position: 'fixed',
        bottom: '60px',
        right: '20px',
    },
    icon: {
        borderRadius: '6px',
        width: '32px',
        height: '32px',
    }
};

const classes = useStyles;
