import useSWR from "swr";
import getOrCreateUser from "../requests/getOrCreateUser";
import {pca} from "../../pages/_app";
import PremaRumUserAccount from "../helpers/CustomAccount";


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