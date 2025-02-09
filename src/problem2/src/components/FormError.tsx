import {ErrorMessage} from "@hookform/error-message";
import {useFormContext} from "react-hook-form";

type TFormError = {
    name: string;
};
const FormError = ({name}: TFormError) => {
    const {formState} = useFormContext();
    if (!formState?.errors) return null;
    return (
        <ErrorMessage
            name={name}
            errors={formState.errors}
            render={({message}) => <p className="text-red-500">{message}</p>}
        />
    );
};

export default FormError;
