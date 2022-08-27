import * as yup from "yup";

export const getAddCharacterSchema = (filters) => {
    return yup.object({
        name: yup
            .string()
            .trim()
            .required("This field is required")
            .min(3, "Minimum 3 symbols")
            .max(20, "Maximum 20 symbols"),
        text: yup
            .string()
            .trim()
            .required("This field is required")
            .min(10, "Minimum 10 symbols")
            .max(128, "Maximum 128 symbols"),
        element: yup
            .string()
            .oneOf(filters, "This field is required")
    }).required();
} 