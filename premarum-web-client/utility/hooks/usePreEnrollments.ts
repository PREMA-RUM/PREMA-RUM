import useSWR, {useSWRConfig} from "swr";
import getStudentPreEnrollments from "../requests/getStudentPreEnrollments";
import {pca} from "../../pages/_app";
import {IPreEnrollmentResponse} from "../requests/responseTypes";

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
    const { data, error } = useSWR('usePreEnrollments', async () => {
        return await getStudentPreEnrollments(pca)
    })

    // noinspection TypeScriptValidateTypes
    const filtered = data?.find( value => value.id === preEnrollmentId )
    
    return {
        preEnrollment: filtered as IPreEnrollmentResponse | undefined,
        isLoading: !error && !data,
        isError: error
    }
}

export function useMutatePreEnrollmentsCache() {
    const { cache, mutate } = useSWRConfig();
    return async (newPreEnrollment: IPreEnrollmentResponse) => {
        const currentCache = cache.get('usePreEnrollments') || []
        await mutate('usePreEnrollments', [...currentCache, newPreEnrollment])
    }
}
