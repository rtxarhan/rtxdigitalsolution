import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { whatsappLink } from "@/lib/site.ts";

export default function WhatsappFloat() {
  return (
    <motion.a
      href={whatsappLink("Hi Rtx Dev, I want a website")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Rtx Dev on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.35, ease: "easeOut" }}
      className="fixed right-5 bottom-5 z-50 flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 md:right-7 md:bottom-7"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#25D366]"
        animate={{ scale: [1, 1.55] as const, opacity: [0.65, 0] as const }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
      <MessageCircle className="relative size-6" strokeWidth={2.2} />
    </motion.a>
  );
}
