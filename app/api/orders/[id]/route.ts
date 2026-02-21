/**
 * Order API - GET (order detail), PATCH (update status)
 * Requires admin auth
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";
import { z } from "zod";

const updateOrderSchema = z.object({
  orderStatus: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]).optional(),
  paymentStatus: z.enum(["pending", "paid", "refunded"]).optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getAdminFromRequest(_req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      ...order,
      totalAmount: Number(order.totalAmount),
      items: order.items.map((i) => ({
        ...i,
        price: Number(i.price),
        total: Number(i.total),
      })),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const data = updateOrderSchema.parse(body);
    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(data.orderStatus && { orderStatus: data.orderStatus }),
        ...(data.paymentStatus && { paymentStatus: data.paymentStatus }),
      },
    });
    return NextResponse.json(order);
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ error: e.issues ?? e }, { status: 400 });
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
