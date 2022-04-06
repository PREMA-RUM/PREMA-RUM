import useSWR from "swr";
import getOrCreateUser from "../requests/getOrCreateUser";
import PremaRumUserAccount from "../helpers/CustomAccount";
import {pca} from "../constants";


export function useStudent() {
    const { data, error } = useSWR('useStudent', async () => {
        return await getOrCreateUser(pca)
    })

    return {
        student: data as PremaRumUserAccount | undefined,
        isLoading: !error && !data,
        isError: error
    }
}