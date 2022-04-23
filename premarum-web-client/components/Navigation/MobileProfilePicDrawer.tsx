import {Drawer} from "@mui/material";

type MobileProfilePicDrawerProps = {
    open: boolean,
    onClose: () => void
}

export default function MobileProfilePicDrawer(props: MobileProfilePicDrawerProps) {
    return <Drawer
        open={props.open}
        onClose={props.onClose}
        anchor={'right'}
    >
        Testing...
    </Drawer>
}