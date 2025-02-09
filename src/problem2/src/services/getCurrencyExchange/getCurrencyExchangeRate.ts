import {axiosInstance} from "../../config/axios.";

const getCurrencyExchangeRate = async (base: string) => {
    const {data} = await axiosInstance.get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`
    );

    return data;
};

export default getCurrencyExchangeRate;
