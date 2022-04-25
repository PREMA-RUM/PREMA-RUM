import {useEffect} from "react";
import {useRouter} from "next/router";
import * as gtag from '../gtag'

export function useGoogleAnalytics() {
    const router = useRouter()
    useEffect(() => {
        function handleRouteChange(url:string) {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        router.events.on('hashChangeComplete', handleRouteChange)

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
            router.events.off('hashChangeComplete', handleRouteChange)
        }
    }, [router.events])
}