import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Dorney - Get in Touch | FMCG Manufacturer Pakistan",
  description:
    "Contact Dorney for wholesale orders, distributor inquiries, and retail partnerships. Locations, phone numbers, and contact form.",
  keywords: ["contact Dorney", "Dorney Pakistan", "wholesale inquiry", "distributor"],
  openGraph: {
    title: "Contact Dorney | FMCG Manufacturer Pakistan",
    description: "Get in touch with Dorney for orders and partnerships.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
