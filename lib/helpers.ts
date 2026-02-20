/**
 * Helper utilities for the application.
 * Future: API fetch helpers can be added here when backend is ready.
 */

export const constants = {
  phone: "+923164095608",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://dornyfood.com",
};

/** Build WhatsApp order URL */
export function getWhatsAppUrl(
  phone: string = constants.phone,
  message: string = "Hi! I'd like to order from Dorney 😊"
): string {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
