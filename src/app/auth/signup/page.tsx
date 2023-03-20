'use client'

import { Button } from "@/components/Button";
import { renderErrors } from "@/utils/function/renderErrors";
import Link from "next/link";
import { useForm } from 'react-hook-form';

export type FormData = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
}

export default function SignUp() {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>()

    function signUp(data: FormData) {
        console.log(data)
    }

    return (
        <main className="flex flex-col h-screen justify-between items-center">
            <h1 className="font-bold text-3xl mt-14">
                Crie a sua conta, é prático!
            </h1>
            {errors && renderErrors(errors)}
            <form
                onSubmit={handleSubmit(signUp)}
                className='flex flex-col font-extralight w-64 caret-primary'
            >
                <label>Nome</label>
                <input
                    type="text"
                    placeholder="ex.: Junior Vieira"
                    {
                        ...register('name',
                            { required: "Um nome é obrigatório!" }
                        )
                    }
                    className='rounded text-primary placeholder:text-primary'
                />
                <label className="mt-3">Email</label>
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
                    {...register('password',
                        { required: "Uma senha é obrigatória!" }
                    )
                    }
                    className='rounded text-primary placeholder:text-primary'
                />
                <label className="mt-3">Confirme a senha</label>
                <input
                    type="password"
                    placeholder="********"
                    {...register("passwordConfirmation", {
                        required: "É necessário confirmar a senha!",
                            validate: {
                                matchesPreviousPassword: (value) => {
                                    const { password } = getValues();
                                    return password === value || "As senhas devem ser iguais!";
                                }
                            }
                        })
                    }
                    className='rounded text-primary placeholder:text-primary'
                />
                <Button type='submit' className="font-normal mt-14">
                    Criar Conta
                </Button>
            </form>
            <p className="mb-5">
                Já possuo uma conta.{' '}
                <Link href='/auth/login' className="underline">
                    Entre agora
                </Link>
            </p>
        </main>
    )
}