import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import ThemeToggle from "@/components/theme-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Sheet,
  SheetClose,
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
            {/* Fullscreen dark menu: always dark by design, in both themes */}
            <SheetContent
              side="top"
              showCloseButton={false}
              className="h-dvh gap-0 border-0 bg-[oklch(0.14_0.012_50)] p-6 text-white"
            >
              <SheetHeader className="flex-row items-center justify-between px-0 pb-4">
                <div className="flex items-center gap-2.5">
                  <img src={site.logo} alt="" className="size-10 rounded-full object-cover" />
                  <SheetTitle className="font-display text-xl text-white">Rtx Dev</SheetTitle>
                </div>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
                <SheetClose
                  render={
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary"
                    />
                  }
                >
                  <X className="size-5" aria-hidden="true" />
                </SheetClose>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center gap-1">
                {SECTION_LINKS.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 + index * 0.05, ease: "easeOut" }}
                    className="group flex cursor-pointer items-baseline gap-4 border-b border-white/10 py-4 font-display text-3xl font-bold text-white transition-colors hover:text-primary"
                  >
                    <span className="font-mono text-xs font-normal text-white/40">
                      0{index + 1}
                    </span>
                    {link.label}
                    <ArrowUpRight className="ml-auto size-5 self-center text-white/30 transition-colors group-hover:text-primary" aria-hidden="true" />
                  </motion.a>
                ))}
              </nav>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get a Website <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
