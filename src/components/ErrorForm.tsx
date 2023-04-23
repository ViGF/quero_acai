export function ErrorForm({ message }: { message: string }) {
    return (
        <span className="font-extralight p-3 border rounded-xl max-w-[80vw]">
            {message}
        </span>
    )
}