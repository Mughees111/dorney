import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Dornay - Get in Touch | FMCG Manufacturer Pakistan",
  description:
    "Contact Dornay for wholesale orders, distributor inquiries, and retail partnerships. Locations, phone numbers, and contact form.",
  keywords: ["contact Dornay", "Dornay Pakistan", "wholesale inquiry", "distributor"],
  openGraph: {
    title: "Contact Dornay | FMCG Manufacturer Pakistan",
    description: "Get in touch with Dornay for orders and partnerships.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
