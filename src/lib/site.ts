import type { RoutePath } from "@/router.tsx";

type Site = {
  name: string;
  tagline: string;
  logo: string;
  nav: Array<{ label: string; to: RoutePath }>;
};

export const site: Site = {
  name: "Rtx Dev",
  tagline:
    "Rtx Dev builds fast, modern websites and web apps for businesses. Plans from ₹12,000 with ₹800/month care.",
  logo: "https://hercules-cdn.com/file_t35F0h2A4nJX4Bzn01bI0S5m",
  nav: [{ label: "Home", to: "/" }],
};

/** Placeholder contact details: replace with the owner's real number and email. */
export const CONTACT = {
  whatsapp: "919999999999",
  email: "hello@rtxdev.in",
  location: "India",
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** In-page section anchors used by the header and footer. */
export const SECTION_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;
