import { getServerSession } from "next-auth/next"

export default async function Store() {
    const session = await getServerSession()   

    return (
        <div>
            {session ? (
                <>
                    <h1>Authenticated</h1>
                    <h2>User: {session.user?.name}</h2>
                </>
            ) : (
                <h1>Usuário não altenticado!</h1>
            )}
        </div>
    )
}