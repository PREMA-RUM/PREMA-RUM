import useSWR from "swr";
import getProfilePicture from "../requests/getProfilePicture";
import {pca} from "../constants";
import {useEffect} from "react";
import {useStudent} from "./useStudent";

export function useProfilePicture(studentEmail: string | undefined) {
    
    const {data, error, mutate} = useSWR(`GetProfilePicture-${studentEmail}`, async () => {
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
    }, [data, studentEmail])
    
    return {
        profilePicture: data as string | null | undefined,
        isLoading: !error && !data,
        isError: error,
    }
}