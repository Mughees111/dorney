"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/helpers";

const locations = [
  {
    name: "Muridke Sheikhupura Road",
    address: "02-km Muridke, Sheikhupura Road Pakistan",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.5!2d74.257!3d31.802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ4JzA3LjIiTiA3NMKwMTUnMjUuMiJF!5e0!3m2!1sen!2spk!4v9999999999999",
  },
];

const teamContacts = [
  { name: "Mr Khalid sheikh", role: "CEO", phone: "" },
  { name: "Mr Usman sheikh", role: "", phone: "" },
  { name: "Ch Rashid hameed shab", role: "", phone: "" },
  { name: "Mr Hamza sheikh", role: "Administration Director", phone: "" },
];

export function ContactPageClient() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-bgLight min-h-screen">
      <section className="pt-16 pb-16 md:pt-20 md:pb-20 bg-gradient-to-br from-bgLight via-white to-bgLight">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm md:text-base">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cookie text-dark mt-4 mb-6 leading-tight">
              Contact Dornay
            </h1>
            <p className="text-lg sm:text-xl text-neutral leading-relaxed max-w-3xl mx-auto">
              Pakistan&apos;s Premier FMCG Manufacturer – Building a legacy of
              quality, trust, and excellence in bakery & confectionery
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16 md:py-20 space-y-20 md:space-y-24">
        <div>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-dark text-center mb-10">
            Our Locations
          </h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10 border-b border-neutral/30 pb-4">
            {locations.map((loc, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-dark hover:bg-primary/10 border border-neutral/50"
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {locations[activeTab].name}
                </h3>
                <p className="text-neutral whitespace-pre-line leading-relaxed">
                  {locations[activeTab].address}
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] md:aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-neutral/20">
              <iframe
                src={locations[activeTab].mapEmbed}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${locations[activeTab].name} Location`}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-poppins font-bold text-dark text-center mb-10">
            Key Contacts
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamContacts.map((contact) => (
              <div
                key={contact.name}
                className="text-center p-6 border border-neutral/30 rounded-xl hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-dark mb-2">{contact.name}</h3>
                <p className="text-primary font-medium mb-3">{contact.role}</p>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="text-neutral hover:text-primary transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-lg">📞</span> {contact.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-dark mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-neutral max-w-3xl mx-auto leading-relaxed">
            Have questions or feedback? We&apos;re here to help! Reach out to the
            Dornay team—we&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="lg:col-span-3 bg-white p-8 md:p-10 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-dark mb-8">Drop us a Line</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-neutral/50 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-neutral/50 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-neutral/50 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    placeholder="+92 300 1234567"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-neutral/50 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="How can we help you today?"
                  required
                />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-primary text-white p-8 rounded-2xl shadow-lg  ">
              <h3 className="text-2xl font-bold mb-6">Main Office</h3>
              <div className="space-y-4">
                <p className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <span>Main Factory: 02-km Muridke<br />Sheikhupura Road Pakistan</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-xl">📞</span>
                  <a href="tel:+92311786708" className="hover:underline">+92 311 786708</a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-xl">📞</span>
                  <a href="tel:+04237163047" className="hover:underline">04237163047</a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-xl">⏰</span>
                  <span>Opening Hours:<br />Mon–Sat: 9:00 AM – 6:00 PM<br />Sunday: Closed</span>
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-dark mb-4">Quick WhatsApp</h3>
              <Button href={getWhatsAppUrl(undefined, "Hi Dornay Team")} variant="outline" size="lg" className="w-full">
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
