import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from 'bcrypt'
import prisma from "@/lib/prisma";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Entre na sua conta, é rápido!",
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {},
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const { email, password, name } = credentials as {
                    email: string
                    password: string
                    name?: string
                }

                const user = await prisma.user.findFirst({
                    where: {
                        email
                    }
                })

                if (!user && !name) {
                    throw new Error('Usuário não encontrado!')
                }

                if (!user && name) {
                    const userCreated = await prisma.user.create({
                        data: {
                            name,
                            email,
                            password: await hash(password, 12)
                        }
                    })

                    // Any object returned will be saved in `user` property of the JWT
                    return {
                        id: (await userCreated).id,
                        email: (await userCreated).email
                    }

                }

                if (user) {
                    const isPasswordCorrect = await compare(password, user.password)

                    if (!isPasswordCorrect) {
                        throw new Error('Senha incorreta!')
                    }

                    return user
                }

                return null
            },
        })
    ],
    session: {
        maxAge: 7 * 24 * 60 * 60, // 7 Days
    }
}

export default NextAuth(authOptions)