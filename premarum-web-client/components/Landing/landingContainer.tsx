import { Grow } from "@mui/material"
import useIsMobile from "../../utility/hooks/useIsMobile"

export default function LandingContainer({children}:any) {
    const isMobile = useIsMobile()

    if (!isMobile) {
        return (
            <Grow
                in={true}
                {...{ timeout: 1000 }}
            >
                {children}
            </Grow>
        )
    } 
    return <>{children}</>
}