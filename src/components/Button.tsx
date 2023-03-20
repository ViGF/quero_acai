import { ButtonHTMLAttributes, ReactElement } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactElement | string
}

export function Button({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            type="button"
            className={`py-2 px-10 bg-white text-primary rounded uppercase hover:bg-opacity-80 cursor-pointer ${className}`}
            {...rest}
        >
            {children}
        </button>
    )
}