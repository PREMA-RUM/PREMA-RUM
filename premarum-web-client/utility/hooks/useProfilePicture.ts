import useSWR from "swr";
import getProfilePicture from "../requests/getProfilePicture";
import {pca} from "../constants";
import {useEffect} from "react";

export function useProfilePicture() {
    const {data, error, mutate} = useSWR("GetProfilePicture", async () => {
        try {
            return URL.createObjectURL(await getProfilePicture(pca))
        } catch (e) {
            console.error(e)
            return null
        }
    }, {
        revalidateOnFocus: false,
        revalidateOnMount:false,
        revalidateOnReconnect: false,
    })
    
    useEffect(() => {
        if (data === undefined) {
            mutate()
        }
    }, [data])
    
    return {
        profilePicture: data as string | null | undefined,
        isLoading: !error && !data,
        isError: error,
    }
}