"use client"

import React from "react";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { useAuth, useSignIn } from '@clerk/nextjs'
import { Button } from "../../../components/Button";
import Loading from "../loading";
import { renderErrors } from "../../../utils/functions/renderErrors";

type FormData = {
    email: string
    password: string
}

export default function LogIn() {
    const [errorAuth, setErrorAuth] = useState<string[]>()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const { signIn, isLoaded } = useSignIn()
    const router = useRouter()
    const { isSignedIn } = useAuth()

    if (isSignedIn) {
        router.push('/store')
    }

    async function onSignInPress(data: FormData) {
        await signIn?.create({
            identifier: data.email,
            strategy: 'password',
            password: data.password
        }).then((result) => {
            router.replace('/store')
            router.forward()
        }).catch((err) => {
            setErrorAuth(err.errors)
        })
    }

    return (
        <>
            {!isLoaded && <Loading />}
            <main className="flex flex-col h-screen pb-14 lg:py-0 justify-between items-center">
                <h1 className="font-bold text-3xl mt-20">
                    Entre na sua conta, <br className="md:hidden" />
                    é rápido!
                </h1>
                {errors && renderErrors(errors)}
                {errorAuth && renderErrors(errorAuth)}
                <form
                    onSubmit={handleSubmit(onSignInPress)}
                    className='flex flex-col font-extralight w-64 caret-primary'
                >
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="ex.: junior@email.com"
                        {
                        ...register('email',
                            { required: "Um email é obrigatório!" }
                        )
                        }
                        className='rounded text-primary placeholder:text-primary'
                    />
                    <label className="mt-3">Senha</label>
                    <input
                        type="password"
                        placeholder="********"
                        {
                        ...register('password',
                            { required: "Uma senha é obrigatória!" }
                        )
                        }
                        className='rounded text-primary placeholder:text-primary'
                    />
                    <Button type='submit' className="font-normal mt-20">
                        Entrar
                    </Button>
                </form>
                <p className="mb-5">
                    Não tenho conta.{' '}
                    <Link href='/auth/signup' className="underline">Criar agora</Link>
                </p>
            </main>
        </>
    )
}