/**
 * WhatsApp Order URL - POST
 * Returns the WhatsApp URL with formatted order message (for Order on WhatsApp button)
 * Cart is client-side; this endpoint builds the message from the payload
 */

import { NextRequest, NextResponse } from "next/server";
import { getWhatsAppUrl, formatOrderForWhatsApp } from "@/lib/helpers";
import { z } from "zod";

const schema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
  ).min(1),
  customerName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customerName } = schema.parse(body);
    const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
    const message = formatOrderForWhatsApp(items, total, customerName);
    const url = getWhatsAppUrl(undefined, message);
    return NextResponse.json({ url });
  } catch (e) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ error: e.issues ?? e }, { status: 400 });
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
