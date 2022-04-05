import useSWR, {useSWRConfig} from "swr";
import getStudentPreEnrollments, {getStudentPreEnrollmentById} from "../requests/getStudentPreEnrollments";
import {pca} from "../../pages/_app";
import {IPreEnrollmentResponse} from "../requests/responseTypes";
import addNewSelection from "../requests/addNewSelection";

export function usePreEnrollments() {
    const { data, error } = useSWR('usePreEnrollments', async () => {
        return await getStudentPreEnrollments(pca)
    })
    
    return {
        preEnrollments: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function usePreEnrollment(preEnrollmentId: number | null) {
    const { data, error, mutate } = useSWR(`usePreEnrollment-${preEnrollmentId}`, async () => {
        if (preEnrollmentId != null) {
            return await getStudentPreEnrollmentById(preEnrollmentId, pca)
        }
    })
    
    async function updateCache(selections: number[]) {
        await mutate(async cachedData => {
            let afterAdd = await addNewSelection(pca, cachedData as IPreEnrollmentResponse, selections)
            return {
                ...cachedData,
                selections: [...cachedData!.selections, ...afterAdd]
            } as any
        })
    }
    
    return {
        preEnrollment: data as IPreEnrollmentResponse | undefined,
        isLoading: !error && !data,
        isError: error,
        addSelectionFn: updateCache
    }
}

export function useMutatePreEnrollmentsCache() {
    const { cache, mutate } = useSWRConfig();
    return async (newPreEnrollment: IPreEnrollmentResponse) => {
        const currentCache = cache.get('usePreEnrollments') || []
        await mutate('usePreEnrollments', [...currentCache, newPreEnrollment])
    }
}
