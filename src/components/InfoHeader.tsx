type InfoHeaderProps = {
    text: string
}


export function InfoHeader({ text }: InfoHeaderProps) {
    return (
        <h2 className="uppercase font-medium border py-6px px-3 rounded-3xl text-lg text-center max-w-min my-6 leading-6 tracking-wider whitespace-nowrap m-auto">
            {text}
        </h2>
    )
}