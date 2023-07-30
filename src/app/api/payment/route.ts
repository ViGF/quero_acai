import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
});

const requestBody = z.object({
  orders: z.array(z.object({
    complements: z.array(z.string()),
    fruits: z.array(z.string()),
    syrupsAndCreams: z.array(z.string()),
    priceId: z.string(),
    quantity: z.number()
  })),
  prices: z.array(z.object({
    id: z.string(),
    nickname: z.string(),
    product: z.object({
      metadata: z.any()
    }),
    unit_amount: z.number()
  }))
})


interface items extends z.infer<typeof requestBody> {}

function convertItemsToStripeObject({ orders, prices }: items) {
  return orders.map(item => {
    const description = `
    Complementos: ${item.complements}
    Frutas: ${item.fruits}
    Caldas e Cremes: ${item.syrupsAndCreams}`
  
    const priceId = item.priceId
    const itemPriceObject = prices.find(price => price.id == priceId)
    const itemCover = itemPriceObject!.product.metadata[`cover-${item.priceId}`]

    return {
      quantity: item.quantity,
      price_data: {
        currency: 'brl',
        unit_amount: itemPriceObject?.unit_amount,
        product_data: {
          name: `${itemPriceObject?.nickname} ml`,
          description: description,
          images: [itemCover]
        }
      }
    }
  })
}

export async function POST(req: Request) {
  const request = await req.json()

  const items = requestBody.parse(request)
  const itemsInStripeObject = convertItemsToStripeObject(items)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: 'https://quero-acai-vigf.vercel.app/store/sucess',
      cancel_url: 'https://quero-acai-vigf.vercel.app/store/cart',
      line_items: itemsInStripeObject,
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ['BR'],
      },
      shipping_options: [{
        shipping_rate: 'shr_1NZJaBJT0aY1nC8ZEGVkGs5G'
      }]
    })

    return NextResponse.json(session.url!, {status: 200})
  } catch (error: any) {
    return NextResponse.json({error: {message: error.message}}, {status: error.statusCode || 500})
  }
}