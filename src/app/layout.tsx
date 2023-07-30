import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { ptBR } from "@clerk/localizations";

import "./globals.css";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "700"],
  style: ["italic", "normal"],
  subsets: ['latin']
});

export const metadata = {
  title: "Quero Açaí",
  description: "Quero Açaí, peça seu açaí online e personalizado, é prático",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.className}`}>
        <ClerkProvider
          localization={ptBR}
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
