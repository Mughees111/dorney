/**
 * Helper utilities for the application.
 */

export const constants = {
  phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, "")}`
    : "+923164095608",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://dornyfood.com",
};

/** Build WhatsApp order URL */
export function getWhatsAppUrl(
  phone?: string,
  message: string = "Hi! I'd like to order from Dorney 😊"
): string {
  const p = phone || constants.phone;
  const cleanPhone = p.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/** Format cart/order for WhatsApp message */
export function formatOrderForWhatsApp(
  items: { name: string; quantity: number; price: number }[],
  total: number,
  customerName?: string
): string {
  const lines = items.map(
    (i) => `• ${i.name} x${i.quantity} = Rs. ${i.quantity * i.price}`
  );
  let msg = "Hi! I would like to place an order:\n\n";
  if (customerName) msg += `Name: ${customerName}\n\n`;
  msg += lines.join("\n");
  msg += `\n\n*Total: Rs. ${total}*`;
  return msg;
}
