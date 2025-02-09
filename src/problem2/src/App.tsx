import {Controller, FormProvider, useForm} from "react-hook-form";
import CurrencySelect from "./components/CurrencySelect";
import {TCurrencyForm} from "./config/type";
import useGetCurrencyExchangeRate from "./services/getCurrencyExchange/useGetCurrencyExchangeRate";
import {Bounce, toast, ToastContainer} from "react-toastify";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import currencySchema from "./schema/currencyFormSchema";
import FormError from "./components/FormError";
import LoadingOverlay from "./components/LoadingOverlay";

function App() {
    const form = useForm<TCurrencyForm>({
        defaultValues: {
            from: "",
            to: "",
            amount: 1,
        },
        resolver: zodResolver(currencySchema),
    });
    const {control, reset, handleSubmit} = form;
    const [result, setResult] = useState("");
    const {mutate, isLoading} = useGetCurrencyExchangeRate();

    const onSubmit = (form: TCurrencyForm) => {
        mutate(form.from, {
            onSuccess: (data) => {
                const toValue = data[form.from][form.to];
                const result = toValue * form.amount;
                setResult(`${result.toFixed(2)} ${form.to}`);
                toast.success("success");
            },
        });
    };

    return (
        <LoadingOverlay isLoading={isLoading}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[40vw] flex flex-col gap-8 border rounded-md p-4"
            >
                <FormProvider {...form}>
                    <h2 className="text-center text-3xl font-semibold">
                        Currency Swap form
                    </h2>
                    <Controller
                        name="from"
                        control={control}
                        render={({field}) => (
                            <div>
                                <div className="flex w-full gap-4 items-center">
                                    <label className="basis-1/12">From:</label>

                                    <CurrencySelect {...field} />
                                </div>
                                <FormError name="to" />
                            </div>
                        )}
                    />

                    <Controller
                        name="to"
                        control={control}
                        render={({field}) => (
                            <div>
                                <div className="flex w-full gap-4 items-center">
                                    <label className="basis-1/12">To:</label>
                                    <CurrencySelect {...field} />
                                </div>
                                <FormError name="to" />
                            </div>
                        )}
                    />
                    <div className="flex w-full gap-4 items-center">
                        <label className="basis-1/12">Amount:</label>
                        <Controller
                            name="amount"
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <div>
                                    <input
                                        type="number"
                                        className="border rounded-md p-2"
                                        onChange={(e) =>
                                            onChange(
                                                parseInt(e.currentTarget.value)
                                            )
                                        }
                                        value={value}
                                    />
                                    <FormError name="amount" />
                                </div>
                            )}
                        />

                        <label>Result: {result}</label>
                    </div>
                    <div className="flex gap-4 justify-end">
                        <button
                            className="border p-2 rounded-md bg-blue-500 hover:bg-blue-700"
                            type="submit"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => reset()}
                            className="border p-2 rounded-md bg-slate-400 text-white hover:bg-slate-600 transition-all"
                            type="button"
                        >
                            Reset
                        </button>
                    </div>
                </FormProvider>
            </form>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </LoadingOverlay>
    );
}

export default App;
