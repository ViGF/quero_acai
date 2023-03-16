import Image from "next/image";
import { Button } from "@/components/Button";

import Logo from '../../public/Logo.png'
import { CaretDoubleDown } from "@/icons";
import { InfoHeader } from "@/components/InfoHeader";
import { InfoItem } from "@/components/InfoItem";

import { optionsAvailable } from '@/utils/data/optionsAvailable'
import { CardSize } from "@/components/CardSize";
import Link from "next/link";
import { MainContainer as Container } from "@/components/MainContainer";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <main className="lg:grid lg:px-[10%] justify-items-center grid-cols-2 flex flex-col justify-center items-center min-h-screen">
                <div className="flex flex-col justify-center items-center gap-11">
                    <Image
                        src={Logo}
                        alt='Logo do Quero Açaí composta por três copos com açaí com recheios'
                        priority
                    />
                    <Button>
                        <Link href='/app'>
                            Pedir Agora
                        </Link>
                    </Button>
                </div>
                <div className="opacity-0 lg:opacity-100">
                    <h2>
                        Peça rapidamente o seu açaí com qualidade, diversas combinações e entrega rápida!
                    </h2>
                    <p className="mt-4 font-extralight">
                        Explore <strong>5</strong> complementos diferentes, <strong>4</strong> opções de frutas, caldas e cremes para adicionar ao seu açaí.
                    </p>
                </div>
                <footer className="flex flex-col justify-center items-center absolute bottom-9">
                    <CaretDoubleDown />
                    <span className="text-white italic font-light mt-1">Explorar Opções</span>
                </footer>
            </main>
            <section>
                <div className="flex flex-col items-center lg:grid grid-cols-2 gap-9">
                    <Container>
                        <InfoHeader text="Tamanhos" />
                        <CardSize />
                    </Container>
                    <Container>
                        <InfoHeader text="Complementos" />
                        <div className="flex gap-4 flex-col lg:m-auto">
                            {optionsAvailable.complements.map(item => {
                                return (
                                    <InfoItem text={item} key={item} />
                                )
                            })}
                        </div>
                    </Container>
                    <Container>
                        <InfoHeader text="Frutas" />
                        <div className="flex gap-4 flex-col lg:pb-24 lg:mt-12">
                            {optionsAvailable.fruits.map(item => {
                                return (
                                    <InfoItem text={item} key={item} />
                                )
                            })}
                        </div>
                    </Container>
                    <Container>
                        <InfoHeader text="Caldas e Cremes" />
                        <div className="flex gap-4 flex-col lg:m-auto">
                            {optionsAvailable.syrupsAndCreams.map(item => {
                                return (
                                    <InfoItem text={item} key={item} />
                                )
                            })}
                        </div>
                    </Container>
                </div>
                <div className="text-center font-light px-9 pb-14 mt-12 lg:mt-20">
                    <InfoHeader text="Horário de Funcionamento" />
                    <p className="mb-8">
                        Funcionamos de Domingo a Sexta das 12:00 às 21:00 horas
                    </p>
                    <Button>
                        <Link href='/app'>
                            Pedir Agora
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}