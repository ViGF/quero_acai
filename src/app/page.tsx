import Image from "next/image";
import { Button } from "@/components/Button";

import Logo from '../../public/Logo.png'
import { CaretDoubleDown } from "@/icons";
import { InfoHeader } from "@/components/InfoHeader";
import { InfoItem } from "@/components/InfoItem";

import { optionsAvailable } from '@/utils/data/optionsAvailable'
import { CardSize } from "@/components/CardSize";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <main className="flex flex-col justify-center items-center min-h-screen">
                <Image
                    src={Logo}
                    alt='Logo do Quero Açaí composta por três copos com açaí com recheios'
                    priority
                />
                <Button text="Pedir Agora" />
                <footer className="flex flex-col justify-center items-center absolute bottom-9">
                    <CaretDoubleDown />
                    <span className="text-white italic font-light mt-1">Explorar Opções</span>
                </footer>
            </main>
            <section>
                <div className="flex justify-center items-center flex-col">
                    <InfoHeader text="Tamanhos" />
                    <div>
                        <CardSize />
                    </div>
                </div>
            </section>
        </div>
    )
}