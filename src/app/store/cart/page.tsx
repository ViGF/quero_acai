"use client";

import { useEffect, useState } from "react";
import Stripe from "stripe";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/Button";
import { QuantityInput } from "@/components/QuantityInput";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [prices, setPrices] = useState<Stripe.Price[]>([]);
  const [items, setItems] = useState<OrderProps[]>([]);
  const userId = useUser().user?.id

  const router = useRouter()

  function removeItemFromLocalData(orderId: string) {
    setItems(oldItems => oldItems.filter(oldItems => oldItems.id !== orderId))
  }

  function updateQuantityOnLocalData(orderId: string, quantity: number) {
    const orderToUpdateIndex = items.findIndex(item => item.id == orderId)!
    const orderToUpdate = items.find(item => item.id == orderId)!

    const orderUpdated: OrderProps = { ...orderToUpdate, quantity }
    const orders = items
    orders[orderToUpdateIndex] = orderToUpdate

    setItems(orders)
  }

  async function checkout() {
    const res = await fetch(`/api/payment`, {
      method: 'POST',
      body: JSON.stringify({
        orders: items,
        prices
      })
    }).then(async res => await res.json())

    if (res.error) {
      window.alert(res.error.message)
    }

    return router.push(res)
  }

  useEffect(() => {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? "", {
      apiVersion: "2022-11-15",
    });

    async function getCartItems() {
      const orders = await fetch(`/api/user/${userId}/cart`).then(async res => await res.json())

      setItems(orders)
    }

    async function getStripeProps() {
      const res = await stripe.prices.list({
        expand: ['data.product']
      });

      setPrices(res.data);
    }
    
    Promise.all([
      getStripeProps(),
      getCartItems()
    ])
    
  }, [userId]);

  return (
    <main className="p-6">
      <h2 className="font-medium mb-6">
        Meus itens
        {items.length > 0 ? (
          <span> ({items.length})</span>
        ) : null}
      </h2>
      <div className="flex flex-col gap-6 items-start max-sm:items-center">
        {items.length > 0 && prices.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-4">
              {items.map((item, i) => {
                const priceObject = prices.find((value) => {
                  return value.id == item.priceId;
                });

                if (priceObject) {
                  return (
                    <div
                      key={`${i}-${item.priceId}`}
                      className="flex flex-1 min-w-[200px] w-[70vw] flex-col justify-between rounded-md border border-secondary bg-thirtiary p-4 text-sm md:w-[40vw] lg:w-[20vw]"
                    >
                      <div className="flex justify-between">
                        <h2>Tamanho</h2>
                        <p className="font-semibold">
                          {priceObject.nickname} ml
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p>Quantidade</p>
                        <QuantityInput
                          defaultValue={item.quantity}
                          orderId={item.id}
                          userId={userId!}
                          removeItemFromLocalData={removeItemFromLocalData}
                          updateQuantityOnLocalData={updateQuantityOnLocalData}
                        />
                      </div>
                      <div>
                        <p>Complementos:</p>
                        <div className="flex flex-col gap-2 px-2 pt-1">
                          {item.complements.map((complement, i) => (
                            <div
                              key={`${complement}-${item.priceId}`}
                              className="flex justify-between font-semibold"
                            >
                              <p className="text-xs">{i + 1}</p>
                              <p className="text-xs">{complement}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <MoreHorizontal size={21} />
                      <div className="flex justify-between border-t border-secondary pt-2 font-semibold">
                        <p>Preço: </p>
                        <p>
                          R${(priceObject.unit_amount! / 100) * item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <Button title="Pedir agora" onClick={checkout} className="mx-auto">Pedir agora</Button>
          </>
        ) : (
          <>
            <p>Você ainda não adicionou nada ao seu carrinho!</p>
            <Link href="/store" className="mx-auto">
              <Button title="Adicionar agora">Adicionar agora</Button>
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
