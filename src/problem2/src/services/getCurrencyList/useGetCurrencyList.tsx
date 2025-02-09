import {useQuery} from "react-query";
import getCurrencyList from "./getCurrencyList";

const useGetCurrencyList = () => {
    return useQuery({
        queryKey: ["currencyList"],
        queryFn: getCurrencyList,
        staleTime: Infinity,
        select: (data) => {
            return Object.entries(data).map(([value, label]) => {
                return {value, label: `${label} (${value})`};
            });
        },
    });
};

export default useGetCurrencyList;
