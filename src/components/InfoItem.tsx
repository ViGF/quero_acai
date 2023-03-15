type InfoItemProps = {
    text: string
}

export function InfoItem({ text }: InfoItemProps) {
    return (
        <div className="rounded-md bg-white py-1 px-6 m-auto">
            <h4 className="text-center text-primary font-light w-48">
                {text}
            </h4>
        </div>
    )
}