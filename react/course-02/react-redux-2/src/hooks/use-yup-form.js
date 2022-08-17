import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useYupForm = (yupSchema) => {
    return useForm({ resolver: yupResolver(yupSchema), mode: "onTouched"})
}