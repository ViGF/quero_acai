import { ClerkProvider } from "@clerk/nextjs/app-beta"
import { ptBR } from '@clerk/localizations'
import { Poppins } from '@next/font/google'

import './globals.css'

const poppins = Poppins({
    weight: ['200', '300', '400', '500', '700'],
    style: ['italic', 'normal']
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-br">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <ClerkProvider
                localization={ptBR}
                publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            >
                <body className={`${poppins.className}`}>
                    {children}
                </body>
            </ClerkProvider>
        </html>
    )
}
