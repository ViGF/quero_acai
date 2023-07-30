import { NextResponse } from "next/server";
import { z } from 'zod'
import prisma from '@/lib/prisma'

// Get cart items
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const requestPathname = z.object({
    userId: z.string()
  })

  const { userId } = requestPathname.parse(params)

  if (!userId) {
    return NextResponse.json({ error: {message: 'missing userId param'} }, {status: 400});
  } else {
    const cart = await prisma.cart.findUnique({
      where: {
        userId
      },
      include: {
        orders: true
      }
    })

    if (!cart) {
      const cart = await prisma.cart.create({
        data: {
          userId
        },
        include: {
          orders: true
        }
      })

      return NextResponse.json(cart.orders, {status: 200});
    }

    return NextResponse.json(cart.orders, {status: 200});
  }
}

// Add item to cart
export async function POST(req: Request, { params }: { params: { userId: string } }) {
  const request = await req.json()

  const requestPathname = z.object({
    userId: z.string()
  })

  const { userId } = requestPathname.parse(params)

  let cart = await prisma.cart.findUnique({
    where: {
      userId
    },
    select: {
      id: true,
    }
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId
      }
    })
  }

  const requestBody = z.object({
    complements: z.array(z.string()),
    fruits: z.array(z.string()),
    syrupsAndCreams: z.array(z.string()),
    priceId: z.string().default('price_1NVwlmJT0aY1nC8ZqJsWYa3i')
  })

  const { complements, fruits, priceId, syrupsAndCreams } = requestBody.parse(request)

  const order = await prisma.order.create({
    data: {
      fruits,
      syrupsAndCreams,
      complements,
      priceId,
      cartId: cart.id
    }
  })

  return NextResponse.json(order, {status: 200});
}

// Edit item quantity
export async function PATCH(req: Request) {
  const request = await req.json()

  const requestBody = z.object({
    quantity: z.number(),
    orderId: z.string().uuid()
  })

  const { orderId, quantity } = requestBody.parse(request)

  const order = await prisma.order.update({
    data: {
      quantity
    },
    where: {
      id: orderId
    }
  })

  return NextResponse.json(order, {status: 200});
}

// Remove item from cart
export async function PUT(req: Request) {
  const request = await req.json()

  const requestBody = z.object({
    orderId: z.string().uuid()
  })

  const { orderId } = requestBody.parse(request)

  const order = await prisma.order.delete({
    where: {
      id: orderId
    }
  })

  return NextResponse.json(order, {status: 200});
}

// Clean all items from cart
export async function DELETE(req: Request, { params }: {params: { userId: string }}) {
  const requestPathname = z.object({
    userId: z.string()
  })

  const { userId } = requestPathname.parse(params)

  const cart = await prisma.cart.findUniqueOrThrow({
    where: {
      userId
    },
    select: {
      id: true
    }
  })

  if (!cart) {
    return NextResponse.json({error: {message: 'cart user not found'}}, {status: 400})
  }

  const orders = await prisma.order.deleteMany({
    where: {
      cartId: cart.id
    }
  })

  return NextResponse.json(orders, {status: 200});
}