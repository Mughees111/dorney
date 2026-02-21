import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
