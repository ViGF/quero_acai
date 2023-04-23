import { Loading as Spin } from '@/icons'

export default function Loading() {
    return (
        <div className="h-screen w-screen flex items-center justify-center absolute bg-primary">
            <Spin />
        </div>
    )
}