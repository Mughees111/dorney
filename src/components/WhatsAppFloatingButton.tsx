'use client';

import { useCallback } from "react";
import { constants } from "../configs/constants";


const WhatsappSvgIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="white"
    className="w-7 h-7"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.96.51 3.87 1.48 5.55L2 22l4.69-1.57a9.89 9.89 0 0 0 5.35 1.55h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.77 14.06c-.24.67-1.4 1.3-1.93 1.38-.5.08-1.14.11-1.84-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.83-4.2-4.97-4.4-.14-.2-1.19-1.59-1.19-3.03 0-1.44.76-2.14 1.03-2.44.27-.3.6-.38.8-.38.2 0 .4 0 .58.01.18.01.43-.07.67.5.24.58.82 2.02.89 2.16.07.14.12.3.02.48-.1.18-.15.3-.3.46-.15.16-.31.36-.44.48-.15.14-.31.29-.13.57.18.28.8 1.31 1.72 2.12 1.18 1.05 2.18 1.38 2.49 1.54.31.16.49.13.67-.08.18-.2.77-.9.98-1.21.21-.31.42-.26.7-.16.28.1 1.78.84 2.08.99.3.15.5.23.57.36.07.13.07.77-.17 1.44z" />
  </svg>
);
// WhatsApp Floating Button - Compact + Super Fancy (new version)
export default function WhatsAppFloatingButton() {

    const openWhatsApp = useCallback(() => {
        const phone = constants.phone.replace(/\D/g, "");
        const text = "Hi! I'd like to order from Dorney 😊";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    }, []);

    return (
        <div className="fixed bottom-[50px] right-[20px] z-[9999]">
            <div className="relative group">

                {/* Animated moving light border (conic gradient + slow spin) */}
                <div 
                    className="absolute -inset-[7px] bg-[conic-gradient(#22c55e,#4ade80,#86efac,#22c55e)] 
                               rounded-full animate-[spin_3.2s_linear_infinite] 
                               opacity-75 blur-[2px] pointer-events-none -z-10"
                />

                {/* Main Circular Button - same 64px size as your original */}
                <div
                    onClick={openWhatsApp}
                    className="relative w-16 h-16 bg-[#25D366] hover:bg-[#22c55e] active:bg-[#1e9e4e]
                               rounded-full flex items-center justify-center 
                               shadow-2xl shadow-green-500/60 hover:shadow-green-600/70
                               cursor-pointer transition-all duration-300 
                               group-hover:scale-110 active:scale-95"
                    role="button"
                    aria-label="Chat on WhatsApp"
                >
                    <WhatsappSvgIcon />
                </div>

                {/* Fancy text label - slides in from LEFT on hover only */}
                <div className="absolute top-1/2 -translate-y-1/2 right-full mr-4 
                                opacity-100 group-hover:opacity-100 
                                -translate-x-0 group-hover:translate-x-0
                                transition-all duration-300 ease-out pointer-events-none">
                    <div className="bg-white text-[#128C7E] font-semibold text-[15px] 
                                    px-6 py-3.5 rounded-3xl shadow-2xl shadow-green-400/30 
                                    border border-green-100 flex items-center gap-2 whitespace-nowrap">
                        We'd love to talk! 
                        <span className="text-lg">💬</span>
                    </div>
                </div>

            </div>
        </div>
    );
}