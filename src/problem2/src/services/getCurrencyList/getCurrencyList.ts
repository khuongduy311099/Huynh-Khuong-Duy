import {axiosInstance} from "../../config/axios.";

const getCurrencyList = async () => {
    const {data} = await axiosInstance.get(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json"
    );

    return data;
};

export default getCurrencyList;
