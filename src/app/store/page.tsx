'use client'

import { useSession } from '@clerk/nextjs'
import Loading from './loading'

export default function Store() {
    const { isSignedIn, isLoaded, session } = useSession()

    if(!isLoaded) {
        return <Loading />
    }

    return (
        <div>
            {isLoaded ?
                isSignedIn ? (
                    <>
                        <h1>Authenticated</h1>
                        <h2>User: {session.publicUserData.firstName}</h2>
                    </>
                ) : (
                    <h1>Usuário não altenticado!</h1>
                )
            : (<Loading />)}
        </div>
    )
}