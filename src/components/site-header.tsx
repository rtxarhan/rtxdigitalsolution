import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";

import ThemeToggle from "@/components/theme-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { SECTION_LINKS, site } from "@/lib/site.ts";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -18 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-3 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-6xl px-0 sm:top-5 sm:w-[calc(100%-3rem)]"
    >
      <div className="flex min-h-16 items-center justify-between gap-3 rounded-full border border-border/70 bg-card/90 px-3 shadow-lg shadow-foreground/5 backdrop-blur-xl sm:px-5">
        <a href="#home" aria-label="Rtx Dev home" className="flex shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          <img src={site.logo} alt="" className="size-9 rounded-full object-cover" />
          <span className="font-display text-lg font-bold tracking-tight text-foreground">Rtx Dev</span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Button
            render={<a href="#pricing" />}
            nativeButton={false}
            className="hidden cursor-pointer rounded-full px-4 sm:inline-flex"
          >
            Get a Website <ArrowUpRight aria-hidden="true" />
          </Button>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="cursor-pointer lg:hidden" aria-label="Open menu" />}
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="gap-0 rounded-l-3xl border-border bg-card p-5">
              <SheetHeader className="px-0 pb-6">
                <SheetTitle className="font-display text-2xl">Rtx Dev</SheetTitle>
                <SheetDescription>Explore the services, work, and process.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col">
                {SECTION_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="cursor-pointer border-b border-border py-4 text-base font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#pricing"
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Get a Website <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
