import {z} from "zod";

const currencySchema = z.object({
    from: z.string().min(3, {message: "Please specify"}),
    to: z.string().min(3, {message: "Please specify"}),
    amount: z
        .number()
        .min(1, {message: "Amount must be equal or greater than 1"}),
});

export default currencySchema;
