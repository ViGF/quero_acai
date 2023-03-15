import { ReactElement } from "react"

type ButtonProps = {
    children: ReactElement
}

export function Button({ children }: ButtonProps) {
    return (
        <button type="button" className="py-1 px-10 bg-white text-primary rounded uppercase hover:bg-opacity-80">
            {children}
        </button>
    )
}