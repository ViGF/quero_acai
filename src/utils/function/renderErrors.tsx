import { FieldErrors } from "react-hook-form"
import { FormData } from "@/app/auth/signup/page"

type FormErrorIndexes = {
    [index: string ]: any
}

export function renderErrors(errors: FieldErrors<FormData>) {
    for (const error in errors) {
        const errorsTypedWithIndexes: FormErrorIndexes = errors

        return (
            <span className="font-extralight border p-3 rounded-xl">
                {errorsTypedWithIndexes[error].message}
            </span>
        )
    }
}