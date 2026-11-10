import { ArrowUpRight, Mail } from "lucide-react";

import { CONTACT, SECTION_LINKS, site, whatsappLink } from "@/lib/site.ts";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div className="max-w-sm">
          <a href="#home" className="inline-flex cursor-pointer items-center gap-3 rounded-full">
            <img src={site.logo} alt="" className="size-11 rounded-full object-cover" />
            <span className="font-display text-xl font-bold tracking-tight text-foreground">{site.name}</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
            Thoughtful websites for ambitious businesses. Built with care, ready to help you grow.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{CONTACT.location}</p>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-foreground">Explore</h2>
          <nav aria-label="Footer navigation" className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
            {SECTION_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-primary">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-foreground">Say hello</h2>
          <div className="mt-4 flex flex-col items-start gap-3">
            <a href={`mailto:${CONTACT.email}`} className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
              <Mail aria-hidden="true" className="size-4" /> {CONTACT.email}
            </a>
            <a
              href={whatsappLink("Hi Rtx Dev, I want a website")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              WhatsApp <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-border px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {year} {site.name}. All rights reserved.</p>
        <p className="font-mono uppercase tracking-[0.12em]">Made for the next big thing.</p>
      </div>
    </footer>
  );
}
