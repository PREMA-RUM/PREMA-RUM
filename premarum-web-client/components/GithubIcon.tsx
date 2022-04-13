import { Button, Tooltip } from "@mui/material";

export default function GithubIcon() {
    return(
        <Tooltip title="Click Me!" placement="left" arrow>
                <Button
                    sx={classes.buttonStyle}
                    href="https://github.com/kenneth-rosario/PREMA-RUM"
                    target="_blank"
                    disableRipple
                >
                    <img src="/GitHub-Icon.png" style={classes.icon}/>
                </Button>
        </Tooltip>
    )
}

const useStyles = {
    buttonStyle: {
        zIndex: 100000,
        width: '32px',
        minWidth: '32px',
        height: '32px',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
    },
    icon: {
        borderRadius: '6px',
        width: '32px',
        height: '32px',
    }
};

const classes = useStyles;
