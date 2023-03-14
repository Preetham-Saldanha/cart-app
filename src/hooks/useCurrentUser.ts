import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('api/current', fetcher);

    // console.log("useecurrent",data)
    return {
        data: data,
        error: error,
        isLoading: isLoading,
        mutate: mutate
    }
}

export default useCurrentUser;