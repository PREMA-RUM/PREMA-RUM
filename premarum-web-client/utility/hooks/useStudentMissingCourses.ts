import useSWR from "swr";
import {IMissingPreEnrollmentsResponse} from "../requests/responseTypes";
import getStudentMissingCourses from "../requests/getStudentMissingCourses";


export function useStudentMissingCourses(preEnrollmentId: number) {
    const {data, error, mutate} = useSWR(`getStudentMissingCourses-${preEnrollmentId}`,
        async () => {
        return await getStudentMissingCourses(preEnrollmentId)
    }, {revalidateIfStale: false})
    
    return  {
        missingCourses: data as IMissingPreEnrollmentsResponse[] | undefined,
        isLoading: !error && !data,
        isError: error,
        manualRevalidate: mutate
    }
}