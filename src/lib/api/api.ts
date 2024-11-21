import useSWR from 'swr';

export const fetcher = <T>(...args: [RequestInfo, RequestInit?]): Promise<T> =>
    fetch(...args).then((res) => {
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }
        return res.json();
    });

type QueryParams = {
    startDate?: string;
    endDate?: string;
    country?: string | string[];
    query_type?: string;
    page?: number;
    limit?: number;
};

const buildURL = (baseURL: string, params: QueryParams): string => {
    const url = new URL(baseURL);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            if (Array.isArray(value)) {
                value.forEach((val) => url.searchParams.append(key, val));
            } else {
                url.searchParams.append(key, String(value));
            }
        }
    });

    return url.toString();
};

export type CountryData = {
    date: string; // The date of the data
    [country: string]: string | number; // Country names as keys with their respective values as numbers
};
export function useTotalCases(query: QueryParams) {
    const baseUrl = 'http://localhost:8000/api/comparison';
    const url = buildURL(baseUrl, query);
    const { data, error, isLoading } = useSWR<CountryData[]>(url, fetcher);

    return {
        data,
        isLoading,
        isError: error,
    };
}
