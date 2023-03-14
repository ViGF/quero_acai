type ButtonProps = {
    text: string
}

export function Button({ text }: ButtonProps) {
    return (
        <button type="button" className="py-1 px-10 bg-white text-primary rounded uppercase">
            {text}
        </button>
    )
}