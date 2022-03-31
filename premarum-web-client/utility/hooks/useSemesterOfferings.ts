import useSWR from "swr";

export function useSemesterOfferings(semesterId: number) {
    const {data, error} = useSWR(`semesterOfferingsFetch-${semesterId}`, async () => {
        
    })

    return {
        courseOfferings: data,
        isLoading: !error && !data,
        isError: error
    }
}