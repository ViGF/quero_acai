import { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode
}

export function MainContainer({ children }: ButtonProps) {
    return (
        <div className="lg:shadow-2xl hover:transform lg:hover:scale-110 hover:shadow-neutral-800 rounded-xl max-w-sm px-16 transition-all min-h-full flex flex-col lg:justify-between">
            {children}
        </div>
    )
}