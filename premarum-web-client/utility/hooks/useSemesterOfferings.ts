import useSWR from "swr";
import getSemesterCourseOfferings from "../requests/getSemesterCourseOfferings";
import {IPreEnrollmentSelectionResponse} from "../requests/responseTypes";

export function useSemesterOfferings(semesterId: number) {
    const {data, error} = useSWR(`semesterOfferingsFetch-${semesterId}`, async () => {
        return await getSemesterCourseOfferings(semesterId);  
    }, {revalidateIfStale:false})

    return {
        courseOfferings: data as IPreEnrollmentSelectionResponse[],
        isLoading: !error && !data,
        isError: error
    }
}