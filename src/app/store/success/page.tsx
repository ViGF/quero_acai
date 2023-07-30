import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function Success() {
  return (
    <main className="flex h-screen gap-1 text-center overflow-hidden px-6 md:p-0 items-center justify-center flex-col">
      <CheckCircle2 className='text-green-500' size={34} />
      <h2 className='font-medium text-lg'>Obrigado pelo pagamento</h2>
      <p className='mt-3 max-w-sm'>
        Seu pagamento foi confirmado e seu pedido será enviado em breve! Em caso de dúvidas ou problema entre em contato via{' '}
        <Link
          href='https://api.whatsapp.com/send/?phone=5583123456789&text=Ol%C3%A1!+Preciso+de+ajuda+com+o+meu+pedido'
          className='font-medium underline cursor-pointer'
        >
          WhatsApp
        </Link>
      </p>
    </main>
  )
}