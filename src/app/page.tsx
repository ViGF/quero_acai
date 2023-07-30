import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";

import { Button } from "@/components/Button";
import { CaretDoubleDown } from "@/icons";
import { InfoHeader } from "@/components/InfoHeader";
import { InfoItem } from "@/components/InfoItem";
import { CardSize } from "@/components/CardSize";
import { MainContainer as Container } from "@/components/MainContainer";

import Logo from "../../public/Logo.png";

async function getStripeProps() {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2022-11-15",
  });

  const res = await stripe.prices.list({
    expand: ["data.product"],
  });

  const prices = res.data;
  return prices;
}

export default async function Home() {
  const products = await getStripeProps();

  const availableComplements = (
    products[0].product as Stripe.Product
  ).metadata.complements.split(",");

  const availableFruits = (
    products[0].product as Stripe.Product
  ).metadata.fruits.split(",");
  
  const availableSyrupsAndCreams = (
    products[0].product as Stripe.Product
  ).metadata.syrupsAndCreams.split(",");

  return (
    <div className="flex flex-col items-center justify-center">
      <main className="flex min-h-screen grid-cols-2 flex-col items-center justify-center justify-items-center lg:grid lg:px-[10%] mb-12">
        <div className="flex flex-col items-center justify-center gap-11">
          <Image
            src={Logo}
            alt="Logo do Quero Açaí composta por três copos com açaí com recheios"
            priority
          />
          <Button>
            <Link href="/store">Pedir Agora</Link>
          </Button>
        </div>
        <div className="opacity-0 lg:opacity-100">
          <h2>
            Peça rapidamente o seu açaí com qualidade, diversas combinações e
            entrega rápida!
          </h2>
          <p className="mt-4 font-extralight">
            Explore <strong>5</strong> complementos diferentes,{" "}
            <strong>4</strong> opções de frutas, caldas e cremes para adicionar
            ao seu açaí.
          </p>
        </div>
        <footer className="absolute bottom-9 flex flex-col items-center justify-center">
          <CaretDoubleDown />
          <span className="mt-1 font-light italic text-white">
            Explorar Opções
          </span>
        </footer>
      </main>
      <section>
        <div className="flex grid-cols-2 flex-col items-center gap-9 lg:grid">
          <Container>
            <InfoHeader text="Tamanhos" />
            <CardSize products={products} />
          </Container>
          <Container>
            <InfoHeader text="Complementos" />
            <div className="flex flex-col gap-4 lg:m-auto">
              {availableComplements.map((item) => {
                return <InfoItem text={item} key={item} />;
              })}
            </div>
          </Container>
          <Container>
            <InfoHeader text="Frutas" />
            <div className="flex flex-col gap-4 lg:mt-12 lg:pb-24">
              {availableFruits.map((item) => {
                return <InfoItem text={item} key={item} />;
              })}
            </div>
          </Container>
          <Container>
            <InfoHeader text="Caldas e Cremes" />
            <div className="flex flex-col gap-4 lg:m-auto">
              {availableSyrupsAndCreams.map((item) => {
                return <InfoItem text={item} key={item} />;
              })}
            </div>
          </Container>
        </div>
        <div className="mt-12 md:px-9 pb-14 text-center font-light lg:mt-20">
          <InfoHeader text="Horário de Funcionamento" />
          <p className="mb-8 max-sm:px-4">
            Funcionamos de Domingo a Sexta das 12:00 às 21:00 horas
          </p>
          <Button>
            <Link href="/store">Pedir Agora</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
