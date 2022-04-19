import useSWR from "swr";
import getProfilePicture from "../requests/getProfilePicture";
import {pca} from "../constants";
import {useEffect} from "react";

export function useProfilePicture() {
    const {data, error, mutate} = useSWR("GetProfilePicture", async () => {
        return URL.createObjectURL(await getProfilePicture(pca))
    }, {
        revalidateOnFocus: false,
        revalidateOnMount:false,
        revalidateOnReconnect: false,
    })
    
    useEffect(() => {
        if (!data) {
            mutate()
        }
    }, [])
    
    return {
        profilePicture: data as string | undefined,
        isLoading: !error && !data,
        isError: error,
    }
}