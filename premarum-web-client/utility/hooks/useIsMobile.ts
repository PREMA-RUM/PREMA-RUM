import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";


export default function useIsMobile() {
    const theme = useTheme()
    return useMediaQuery(theme.breakpoints.down("sm"))
}