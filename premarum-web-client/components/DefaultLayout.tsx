import { useIsAuthenticated } from "@azure/msal-react";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function DefaultLayout({children}:any) {
    const isAuthenticated = useIsAuthenticated();
    const router = useRouter();
    
    useEffect(() => {
        if (!isAuthenticated)
            router.push("/");
    }, [isAuthenticated, router])
    
    if (isAuthenticated)
        return <>{children}</>
    
    return <></>
}