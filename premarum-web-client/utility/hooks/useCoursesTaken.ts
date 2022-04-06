import useSWR from "swr";
import {pca} from "../../pages/_app";
import {getCoursesTaken} from "../requests/getCoursesTaken";
import {ICoursesTakenResponse} from "../requests/responseTypes";

export function useCoursesTaken() {
    const { data, error } = useSWR('CoursesTaken', async () => {
        return (await getCoursesTaken(pca)).data
    })

    return {
        coursesTaken: data as ICoursesTakenResponse[] | undefined,
        isLoading: !error && !data,
        isError: error
    }
}