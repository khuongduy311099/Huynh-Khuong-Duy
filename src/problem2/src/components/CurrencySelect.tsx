import Select from "react-select";
import useGetCurrencyList from "../services/getCurrencyList/useGetCurrencyList";

type TCurrencySelect = {
    onChange: (value?: string) => void;
    value: string;
};

const CurrencySelect = ({onChange, value}: TCurrencySelect) => {
    const {data = []} = useGetCurrencyList();
    const selectValue = data.find((o) => o.value === value);
    return (
        <Select
            isSearchable
            className="w-full"
            options={data}
            value={selectValue}
            onChange={(e) => onChange(e?.value)}
        />
    );
};

export default CurrencySelect;
