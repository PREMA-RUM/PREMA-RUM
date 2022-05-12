import useSWR from "swr";
import getSemesterCourseOfferings from "../requests/getSemesterCourseOfferings";
import {IPreEnrollmentSelectionResponse} from "../requests/responseTypes";

export function useSemesterOfferings(semesterId: number) {
    const {data, error} = useSWR(`semesterOfferingsFetch-${semesterId}`, async () => {
        if (semesterId)
            return await getSemesterCourseOfferings(semesterId);
        return []
    }, {revalidateIfStale:false})

    return {
        courseOfferings: data as IPreEnrollmentSelectionResponse[],
        isLoading: !error && !data,
        isError: error
    }
}