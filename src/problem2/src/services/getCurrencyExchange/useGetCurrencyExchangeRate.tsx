import {useMutation} from "react-query";
import getCurrencyExchangeRate from "./getCurrencyExchangeRate";

const useGetCurrencyExchangeRate = () => {
    return useMutation({
        mutationFn: getCurrencyExchangeRate,
    });
};

export default useGetCurrencyExchangeRate;
