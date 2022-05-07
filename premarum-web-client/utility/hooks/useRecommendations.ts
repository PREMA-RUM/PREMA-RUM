import useSWR from "swr";
import getRecommendations from "../requests/getRecommendations";
import {pca} from "../constants";
import {IPreEnrollmentSelectionResponse} from "../requests/responseTypes";


export function useRecommendations(preEnrollmentId: number) {
    const {data, error, mutate} = useSWR(`getRecommendations-${preEnrollmentId}`, 
        async () => {
        return await getRecommendations(pca, preEnrollmentId)
    }, {dedupingInterval:50000}) 
    
    return  {
        recommendations: data as IPreEnrollmentSelectionResponse[] | undefined,
        isLoading: !error && !data,
        isError: error,
        manualRevalidate: mutate
    }
}