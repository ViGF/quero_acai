'use client'

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { Button } from "@/components/Button";
import { renderErrors } from "@/utils/functions/renderErrors";
import { useState } from "react";
import { ErrorForm } from "@/components/ErrorForm";
import { useRouter } from "next/navigation";

type FormData = {
    email: string
    password: string
}

export default function LogIn() {
    const [errorAuth, setErrorAuth] = useState<string | undefined>()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const router = useRouter()

    async function logIn(data: FormData) {
        const authFlow = await signIn('credentials', {
            callbackUrl: '/store',
            redirect: false,
            email: data.email,
            password: data.password
        })
        setErrorAuth(authFlow?.error)
        authFlow?.url ? router.push(authFlow?.url) : null
    }

    return (
        <main className="flex flex-col h-screen pb-14 lg:py-0 justify-between items-center">
            <h1 className="font-bold text-3xl mt-20">
                Entre na sua conta, <br className="md:hidden" />
                é rápido!
            </h1>
            {errors && renderErrors(errors)}
            {errorAuth && (
                <ErrorForm message={errorAuth} />
            )}
            <form
                onSubmit={handleSubmit(logIn)}
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
    )
}