/**
 * Orders API - POST (create order - Order Online)
 * GET (list orders) requires admin auth
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const createOrderSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email().optional().or(z.literal("")),
  customerPhone: z.string().min(1),
  customerAddress: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string().optional(),
      productName: z.string().min(1),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ).min(1),
});

export async function GET(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(
      orders.map((o) => ({
        ...o,
        totalAmount: Number(o.totalAmount),
        items: o.items.map((i) => ({
          ...i,
          price: Number(i.price),
          total: Number(i.total),
        })),
      }))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = createOrderSchema.parse(body);
    const totalAmount = data.items.reduce(
      (sum, i) => sum + i.quantity * i.price,
      0
    );
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail || null,
        customerPhone: data.customerPhone,
        customerAddress: data.customerAddress || null,
        totalAmount,
        notes: data.notes || null,
        orderStatus: "pending",
        paymentStatus: "pending",
        items: {
          create: data.items.map((i) => ({
            productId: i.productId || null,
            productName: i.productName,
            quantity: i.quantity,
            price: i.price,
            total: i.quantity * i.price,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalAmount: Number(order.totalAmount),
    });
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ error: e.issues ?? e }, { status: 400 });
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
