import useSWR, {useSWRConfig} from "swr";
import getStudentPreEnrollments, {getStudentPreEnrollmentById} from "../requests/getStudentPreEnrollments";
import {IPreEnrollmentResponse} from "../requests/responseTypes";
import addNewSelection from "../requests/addNewSelection";
import removeSelections from "../requests/removeSelection";
import {pca} from "../constants";
import deletePreEnrollment from "../requests/deletePreEnrollment";
import updatePreEnrollmentTitle from "../requests/updatePreEnrollmentTitle";

export function usePreEnrollments() {
    const { data, error, mutate } = useSWR('usePreEnrollments', async () => {
        return await getStudentPreEnrollments(pca)
    })
    
    async function removePreEnrollmentFromCache(pId: number) {
        await mutate( async (cachedData:any) => {
            await deletePreEnrollment(pca, pId)
            return cachedData.filter((cd: any) => cd.id !== pId)
        })
    }
    
    return {
        preEnrollments: data,
        isLoading: !error && !data,
        removePreEnrollmentFromCache,
        isError: error
    }
}

export function usePreEnrollment(preEnrollmentId: number | null) {
    const { data, error, mutate } = useSWR(`usePreEnrollment-${preEnrollmentId}`, async () => {
        if (preEnrollmentId != null) {
            return await getStudentPreEnrollmentById(preEnrollmentId, pca)
        }
    }, {revalidateIfStale:false})
    
    async function updateCache(selections: number[]) {
        await mutate(async cachedData => {
            let afterAdd = await addNewSelection(pca, cachedData as IPreEnrollmentResponse, selections)
            return {
                ...cachedData,
                selections: [...cachedData!.selections, ...afterAdd]
            } as any
        })
    }
    
    async function removeFromCache(selections: number[]) {
        await mutate(async cachedData => {
            await removeSelections(pca, cachedData as IPreEnrollmentResponse, selections)
            return {
                ...cachedData,
                selections: [
                    ...cachedData!
                        .selections
                        .filter(sel => 
                            selections
                                .filter(rs => rs === sel.id).length === 0)]
            } as any
        })
    }

    async function updateTitle(title: string) {
        await mutate(async cachedData => {
            await updatePreEnrollmentTitle(pca, title, preEnrollmentId!)
            return {...cachedData, name: title} as any
        })
    }
    
    return {
        preEnrollment: data as IPreEnrollmentResponse | undefined,
        isLoading: !error && !data,
        isError: error,
        addSelectionFn: updateCache,
        removeSelectionsFn: removeFromCache,
        updateTitle
    }
}

export function useMutatePreEnrollmentsCache() {
    const { cache, mutate } = useSWRConfig();
    return async (newPreEnrollment: IPreEnrollmentResponse) => {
        const currentCache = cache.get('usePreEnrollments') || []
        await mutate('usePreEnrollments', [...currentCache, newPreEnrollment])
    }
}
