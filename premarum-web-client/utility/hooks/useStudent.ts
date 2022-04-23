import useSWR from "swr";
import getOrCreateUser from "../requests/getOrCreateUser";
import PremaRumUserAccount from "../helpers/CustomAccount";
import {pca} from "../constants";
import addStudentDepartment from "../requests/addStudentDepartment";
import {useEffect} from "react";


export function useStudent() {
    const { data, error, mutate } = useSWR('useStudent', async () => {
        return await getOrCreateUser(pca)
    }, {revalidateIfStale: false, revalidateOnMount: false, revalidateOnReconnect: false})
    
    useEffect(() => {
        if (!data) {
            mutate()
        }
    }, [data])

    async function updateStudentDepartment(departmentId: number) {
        await mutate(async cachedData => {
            await addStudentDepartment(pca, departmentId)
            return {...cachedData, departmentId: departmentId} as any
        })
    }

    return {
        student: data as PremaRumUserAccount | undefined,
        isLoading: !error && !data,
        isError: error,
        updateStudentDepartment,
    }
}