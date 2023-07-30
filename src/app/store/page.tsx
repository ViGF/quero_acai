"use client";

import { Button } from "@/components/Button";
import { InfoHeader } from "@/components/InfoHeader";
import { InfoItem } from "@/components/InfoItem";
import { PriceInput } from "@/components/PriceInput";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Stripe from "stripe";
import Loading from "../loading";
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function Store() {
  const [products, setProducts] = useState<Stripe.Price[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<OrderProps>();

  const router = useRouter()
  const userId = useUser().user?.id

  useEffect(() => {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? "", {
      apiVersion: "2022-11-15",
    });

    async function getStripeProps() {
      const res = await stripe.prices.list({
        expand: ["data.product"],
      });

      const prices = res.data;
      setProducts(prices);
    }

    getStripeProps();
  }, []);

  async function submitForm(data: OrderProps) {
    const res = await fetch(`/api/user/${userId}/cart`, {
      body: JSON.stringify({ ...data}),
      method: 'POST'
    }).then(async res => await res.json())

    if (res) {
      router.push('/store/cart')
    }
  }

  return (
    <main className="mb-12">
      {products.length > 0 ? (
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col items-start justify-center lg:mt-12 lg:flex-row lg:pt-9">
            <div className="mx-auto max-w-sm px-16 max-sm:px-8 lg:pb-0">
              <InfoHeader text="Escolha um Tamanho" />
              <Controller
                control={control}
                name="priceId"
                defaultValue={products[0].id}
                render={() => {
                  return <PriceInput products={products} setValue={setValue} />;
                }}
              />
            </div>
            <div className="flex w-full flex-1 flex-wrap justify-center gap-6 lg:justify-around">
              <div>
                <InfoHeader
                  text="Complementos"
                  errorMessage={!!errors.complements}
                />
                <div className="flex flex-col gap-4">
                  {(products[0].product as Stripe.Product).metadata.complements
                    .split(",")
                    .map((item) => {
                      return (
                        <label
                          htmlFor={`complements${item}`}
                          title={item}
                          key={`label${item}`}
                        >
                          <input
                            type="checkbox"
                            value={item}
                            id={`complements${item}`}
                            {...register("complements", {
                              value: [],
                              required: true,
                            })}
                            className="peer sr-only"
                          />
                          <InfoItem
                            text={item}
                            key={item}
                            className="outline invalid:border-pink-500 invalid:text-pink-600 peer-checked:bg-transparent peer-checked:font-medium peer-checked:text-white peer-checked:outline-2"
                          />
                        </label>
                      );
                    })}
                </div>
              </div>
              <div>
                <InfoHeader text="Frutas" errorMessage={!!errors.fruits} />
                <div className="flex flex-col gap-4">
                  {(products[0].product as Stripe.Product).metadata.fruits
                    .split(",")
                    .map((item) => {
                      return (
                        <label
                          htmlFor={`fruits${item}`}
                          title={item}
                          key={`label${item}`}
                        >
                          <input
                            type="checkbox"
                            value={item}
                            id={`fruits${item}`}
                            {...register("fruits", {
                              value: [],
                              required: true,
                            })}
                            className="peer sr-only"
                          />
                          <InfoItem
                            text={item}
                            key={item}
                            className="outline invalid:border-pink-500 invalid:text-pink-600 peer-checked:bg-transparent peer-checked:font-medium peer-checked:text-white peer-checked:outline-2"
                          />
                        </label>
                      );
                    })}
                </div>
              </div>
              <div>
                <InfoHeader
                  text="Caldas e Cremes"
                  errorMessage={!!errors.syrupsAndCreams}
                />
                <div className="flex flex-col gap-4">
                  {(
                    products[0].product as Stripe.Product
                  ).metadata.syrupsAndCreams
                    .split(",")
                    .map((item) => {
                      return (
                        <label
                          htmlFor={`syrupsAndCreams${item}`}
                          title={item}
                          key={`label${item}`}
                        >
                          <input
                            type="checkbox"
                            value={item}
                            id={`syrupsAndCreams${item}`}
                            {...register("syrupsAndCreams", {
                              value: [],
                              required: true,
                            })}
                            className="peer sr-only"
                          />
                          <InfoItem
                            text={item}
                            key={item}
                            className="outline invalid:border-pink-500 invalid:text-pink-600 peer-checked:bg-transparent peer-checked:font-medium peer-checked:text-white peer-checked:outline-2"
                          />
                        </label>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            title="Adicionar ao carrinho"
            className="mx-auto mb-6 mt-10 block lg:mt-0"
          >
            Adicionar ao carrinho
          </Button>
        </form>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </main>
  );
}
