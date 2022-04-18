import useSWR from "swr";
import getRecommendations from "../requests/getRecommendations";
import {pca} from "../constants";
import {IPreEnrollmentSelectionResponse} from "../requests/responseTypes";


export function useRecommendations(preEnrollmentId: number) {
    const {data, error} = useSWR("getRecommendations", async () => {
        return await getRecommendations(pca, preEnrollmentId)
    }, {revalidateIfStale: false})
    
    return  {
        recommendations: data as IPreEnrollmentSelectionResponse[] | undefined,
        isLoading: !error && !data,
        isError: error
    }
}