'use client'

import { Button } from "@/components/Button";
import { renderErrors } from "@/utils/function/renderErrors";
import Link from "next/link";
import { useForm } from 'react-hook-form';

type FormData = {
    email: string
    password: string
}

export default function LogIn() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    function logIn(data: FormData) {
        console.log(data)
    }

    return (
        <main className="flex flex-col h-screen justify-between items-center">
            <h1 className="font-bold text-3xl mt-20">
                Entre na sua conta, <br className="md:hidden" />
                é rápido!
            </h1>
            {errors && renderErrors(errors)}
            <form
                onSubmit={handleSubmit(logIn)}
                className='flex flex-col font-extralight w-64 caret-primary'
            >
                <label>Email</label>
                <input
                    type="text"
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