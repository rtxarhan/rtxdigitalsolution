import {
  ArrowUpRight,
  Check,
  Clock3,
  Heart,
  MapPin,
  Menu,
  Scissors,
  Search,
  ShoppingBag,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge.tsx";
import { Card } from "@/components/ui/card.tsx";
import SectionHeading from "./section-heading.tsx";

type Project = {
  name: string;
  category: string;
  result: string;
  preview: ReactNode;
};

function BrowserFrame({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
      <div className="flex h-10 items-center gap-3 border-b border-border/80 bg-muted/70 px-3">
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-[#ef6a5b]" />
          <span className="size-2 rounded-full bg-[#eab84c]" />
          <span className="size-2 rounded-full bg-[#5fba72]" />
        </div>
        <div className="mx-auto flex h-6 min-w-0 max-w-52 flex-1 items-center justify-center rounded-md border border-border/70 bg-background/80 px-3 font-mono text-[9px] text-muted-foreground">
          <span className="truncate">{url}</span>
        </div>
        <span className="size-7 shrink-0" />
      </div>
      {children}
    </div>
  );
}

function GlowPreview() {
  return (
    <BrowserFrame url="glowstudio.in">
      <div className="relative min-h-64 overflow-hidden bg-[#fff5f0] p-4 text-[#442b32] sm:p-5">
        <div className="absolute -right-9 -top-12 size-40 rounded-full bg-[#f2c4b0]/60 blur-2xl" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.17em] text-[#8a4552]">
            <Scissors className="size-3.5" /> GLOW STUDIO
          </div>
          <Menu className="size-4 text-[#65444a]" />
        </div>
        <div className="relative max-w-[72%] pt-8 sm:pt-9">
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#a45659]">
            YOUR MOMENT, YOUR GLOW
          </p>
          <h3 className="pt-2 font-display text-2xl leading-[1.04] font-bold tracking-tight text-[#442b32] sm:text-[30px]">
            Look good.
            <br />
            Feel better.
          </h3>
          <p className="pt-2 text-[10px] leading-4 text-[#735b5d]">
            A little time for you makes all the difference.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-3">
            {[
              { label: "Haircut", icon: Scissors },
              { label: "Facial", icon: Heart },
              { label: "Bridal", icon: Star },
            ].map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full border border-[#e8c9bb] bg-[#fffaf7] px-2 py-1 text-[8px] font-medium text-[#704a4e]"
              >
                <Icon className="size-2.5" />
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[#9d4d54] px-3 py-2 text-[9px] font-semibold text-white shadow-lg shadow-[#6e343b]/20 sm:bottom-4 sm:right-4">
          <span className="size-1.5 rounded-full bg-white/80" /> WhatsApp chat
        </div>
        <div className="absolute right-3 top-[4.35rem] flex items-center gap-2 rounded-xl border border-[#efddd2] bg-white px-2.5 py-2 shadow-lg shadow-[#774b3c]/10 sm:right-5 sm:top-[4.7rem]">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#fff2dc] text-[#9d671c]">
            <Star className="size-3.5 fill-current" />
          </div>
          <div>
            <p className="text-[10px] leading-none font-bold text-[#442b32]">4.9 on Google</p>
            <p className="pt-1 text-[8px] text-[#77666a]">Loved by locals</p>
          </div>
        </div>
        <div className="absolute -bottom-7 -left-6 size-24 rounded-full border-[12px] border-[#e4b8a5]/35" />
      </div>
    </BrowserFrame>
  );
}

function FitZonePreview() {
  return (
    <BrowserFrame url="fitzone.in">
      <div className="min-h-64 bg-[#111411] p-4 text-[#f4f6ef] sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.16em]">
            <span className="flex size-6 items-center justify-center rounded-md bg-[#c2fa45] text-[#17210c]">
              F
            </span>
            FITZONE
          </div>
          <Menu className="size-4 text-[#c2fa45]" />
        </div>
        <div className="grid grid-cols-[1fr_0.8fr] items-center gap-2 pt-8">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#c2fa45]">
              NO SHORTCUTS. JUST YOU.
            </p>
            <h3 className="pt-2 font-display text-3xl leading-[0.94] font-black tracking-tight text-white sm:text-4xl">
              Train
              <br />
              harder.
            </h3>
            <p className="pt-2 text-[9px] leading-4 text-[#c2c8bd]">
              Make every rep count. Your next level starts here.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-[#c2fa45] px-2.5 py-1.5 text-[8px] font-bold text-[#17210c]">
              FIND YOUR FIT <ArrowUpRight className="size-3" />
            </div>
          </div>
          <div className="relative flex h-36 items-end justify-center overflow-hidden rounded-xl border border-[#354032] bg-[#1d241b]">
            <div className="absolute right-2 top-2 rounded-full border border-[#c2fa45]/50 px-2 py-1 font-mono text-[7px] text-[#d0ff6c]">
              OPEN 24/7
            </div>
            <div className="absolute bottom-4 h-24 w-20 rounded-t-[45%] bg-gradient-to-b from-[#718247] to-[#252b1e]" />
            <div className="absolute bottom-4 h-16 w-28 rounded-t-full bg-[#c2fa45]/15 blur-lg" />
            <div className="absolute bottom-2 left-2 font-mono text-[7px] text-[#e5ebdf]">
              EST. 2018 · YOUR CITY
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function SpiceRoutePreview() {
  return (
    <BrowserFrame url="spiceroute.in">
      <div className="min-h-64 bg-[#fbf2df] p-4 text-[#3e2b1d] sm:p-5">
        <div className="flex items-center justify-between">
          <div className="font-display text-[13px] font-bold tracking-tight text-[#74391e]">
            SPICE <span className="text-[#c57632]">ROUTE</span>
          </div>
          <div className="flex size-7 items-center justify-center rounded-full bg-[#733d24] text-[#fff3dc]">
            <Menu className="size-3.5" />
          </div>
        </div>
        <div className="pt-7 text-center">
          <p className="font-mono text-[8px] uppercase tracking-[0.23em] text-[#9c6137]">
            GOOD FOOD, GOOD STORIES
          </p>
          <h3 className="pt-2 font-display text-3xl leading-none font-bold tracking-tight text-[#542d1d] sm:text-4xl">
            Taste the
            <br />
            journey.
          </h3>
          <p className="mx-auto max-w-52 pt-2 text-[9px] leading-4 text-[#735741]">
            From the first aroma to the last bite, find your new favourite.
          </p>
          <div className="flex justify-center gap-2 pt-3">
            {["Small plates", "Mains", "Chai & more"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#d9ba91] bg-[#fff9ed] px-2 py-1 text-[8px] font-medium text-[#69432d]"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mx-auto mt-4 flex max-w-56 items-center justify-between rounded-lg bg-[#713d24] px-3 py-2 text-left text-[#fff5e6]">
            <div>
              <p className="font-display text-[10px] font-semibold">A table for every story</p>
              <p className="pt-0.5 text-[8px] text-[#f0d8bc]">Walk in hungry. Leave happy.</p>
            </div>
            <ArrowUpRight className="size-3.5 text-[#f3c477]" />
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function UrbanKartPreview() {
  const products = [
    { name: "Linen tote", price: "₹799", color: "bg-[#ead8c0]" },
    { name: "Everyday mug", price: "₹499", color: "bg-[#dce5db]" },
    { name: "Desk journal", price: "₹349", color: "bg-[#e9d5d2]" },
    { name: "Soft throw", price: "₹1,299", color: "bg-[#d8dfee]" },
  ];

  return (
    <BrowserFrame url="urbankart.in">
      <div className="min-h-64 bg-[#f6f4ef] p-4 text-[#252823] sm:p-5">
        <div className="flex items-center justify-between">
          <div className="font-display text-[15px] leading-none font-black tracking-tight text-[#304435]">
            urban<span className="text-[#c5683e]">kart</span>
          </div>
          <div className="flex items-center gap-3 text-[#424a42]">
            <Search className="size-3.5" />
            <ShoppingBag className="size-3.5" />
          </div>
        </div>
        <div className="flex items-end justify-between pt-5">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#6b776d]">
              LITTLE THINGS, WELL MADE
            </p>
            <h3 className="pt-1 font-display text-xl font-bold tracking-tight text-[#304435]">
              The everyday edit
            </h3>
          </div>
          <span className="mb-0.5 rounded-full bg-[#e8e9df] px-2 py-1 text-[8px] font-medium text-[#455744]">
            New in
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 pt-3">
          {products.map((product) => (
            <div key={product.name} className="min-w-0">
              <div className={`relative flex aspect-[0.9] items-center justify-center rounded-lg ${product.color}`}>
                <div className="flex size-8 items-center justify-center rounded-full border border-white/80 bg-white/55 text-[#485648]">
                  {product.name.includes("tote") ? (
                    <ShoppingBag className="size-4" />
                  ) : product.name.includes("journal") ? (
                    <span className="h-5 w-3 rounded-sm border border-current" />
                  ) : product.name.includes("mug") ? (
                    <span className="relative h-4 w-3 rounded-b-md border border-current after:absolute after:-right-1 after:top-1 after:size-2 after:rounded-full after:border after:border-current" />
                  ) : (
                    <span className="h-3 w-5 rounded-b-full border border-current" />
                  )}
                </div>
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-white/80 text-[#485648]">
                  <Heart className="size-2" />
                </span>
              </div>
              <p className="truncate pt-1.5 text-[7px] font-medium text-[#333b33]">{product.name}</p>
              <p className="pt-0.5 text-[8px] font-bold text-[#304435]">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

const projects: Project[] = [
  {
    name: "Glow Studio",
    category: "Booking System",
    result: "+40% more bookings",
    preview: <GlowPreview />,
  },
  {
    name: "FitZone Gym",
    category: "Landing Page",
    result: "A stronger first impression",
    preview: <FitZonePreview />,
  },
  {
    name: "Spice Route Cafe",
    category: "Restaurant",
    result: "More tables, fewer questions",
    preview: <SpiceRoutePreview />,
  },
  {
    name: "UrbanKart",
    category: "E-commerce",
    result: "A smoother way to shop",
    preview: <UrbanKartPreview />,
  },
];

export default function Work() {
  return (
    <section id="work" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="02 — Work"
          title="Designed"
          highlight="piece by piece."
          description="A few recent builds, each shaped around the people and business behind the screen."
        />
        <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 md:gap-7">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, rotateX: 12, y: 60 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, scale: 1.012, rotateX: -1 }}
              className="[transform-style:preserve-3d]"
            >
              <Card className="h-full gap-0 rounded-2xl border border-border/80 bg-card p-3 shadow-[0_14px_40px_-30px] shadow-foreground/25 transition-shadow duration-300 hover:shadow-[0_24px_56px_-30px] hover:shadow-primary/30 sm:p-4">
                <div className="overflow-hidden rounded-xl">
                  {project.preview}
                </div>
                <div className="flex items-start justify-between gap-3 px-2 pt-4 pb-1 sm:px-1">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                      {project.name}
                    </h3>
                    <p className="flex items-center gap-1.5 pt-1.5 text-sm text-muted-foreground">
                      <Check className="size-3.5 shrink-0 text-primary" />
                      <span className="truncate">{project.result}</span>
                    </p>
                  </div>
                  <Badge className="mt-0.5 shrink-0 border border-primary/20 bg-accent px-2.5 py-1 text-[10px] text-accent-foreground">
                    {project.category}
                  </Badge>
                </div>
              </Card>
            </motion.article>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium shadow-sm sm:text-sm">
            <Clock3 className="size-4 text-primary" />
            Built for real businesses
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium shadow-sm sm:text-sm">
            <MapPin className="size-4 text-primary" />
            Made with care in India
          </div>
        </div>
      </div>
    </section>
  );
}
