import { FieldErrors } from "react-hook-form"
import { FormData } from "@/app/auth/signup/page"
import { ErrorForm } from "@/components/ErrorForm"

type FormErrorIndexes = {
    [index: string]: any
}

export function renderErrors(errors: FieldErrors<FormData>) {
    for (const error in errors) {
        const errorsTypedWithIndexes: FormErrorIndexes = errors

        return (
            <ErrorForm message={errorsTypedWithIndexes[error].message} />
        )
    }
}