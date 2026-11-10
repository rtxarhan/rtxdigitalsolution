import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDownRight, ArrowUpRight, Check, Globe2, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { PROJECTS } from "@/lib/projects.ts";

const FLOATING_Y: number[] = [0, -10, 0];
const MARQUEE_X: string[] = ["0%", "-50%"];
const HERO_VIDEO = PROJECTS[0];
const CAPABILITIES = [
  "LANDING PAGES",
  "E-COMMERCE",
  "WEB APPS",
  "ADMIN PANELS",
  "BOOKING SYSTEMS",
  "UI/UX DESIGN",
  "BUSINESS WEBSITES",
  "SEO",
] as const;
const STATS = [
  { value: 50, suffix: "+", label: "Projects shipped" },
  { value: 30, suffix: "+", label: "Happy clients" },
  { value: 100, suffix: "%", label: "Responsive by design" },
  { value: 50, suffix: "%", label: "Pay to get started" },
] as const;

function StatCount({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, { duration: 1.35, ease: "easeOut" });
    return () => controls.stop();
  }, [count, isInView, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function StatsStrip() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-foreground/[0.04] md:grid-cols-4">
      {STATS.map((stat, index) => (
        <div key={stat.label} className={`px-5 py-6 sm:px-7 sm:py-8 ${index % 2 === 1 ? "border-l border-border" : ""} ${index > 1 ? "md:border-l" : ""} ${index >= 2 ? "border-t md:border-t-0" : ""}`}>
          <p className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <StatCount value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="mt-1.5 text-xs leading-5 text-muted-foreground sm:text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function MarqueeBand() {
  return (
    <div className="relative left-1/2 mt-16 w-[112%] -translate-x-1/2 -rotate-1 overflow-hidden bg-primary py-4 text-primary-foreground shadow-lg shadow-primary/15 sm:mt-20">
      <motion.div
        animate={{ x: MARQUEE_X }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        className="flex w-max"
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {CAPABILITIES.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center gap-6 px-5 font-mono text-xs font-semibold tracking-[0.16em] sm:px-8 sm:text-sm">
                {item}<span className="size-1.5 rounded-full bg-primary-foreground/65" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/** Browser mockup that now plays a live looping video instead of a static picture. */
function BrowserPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Tilt back and drift as the hero scrolls away.
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[34rem] px-3 pb-10 pt-4 [perspective:1200px] sm:px-8 sm:pb-12 sm:pt-8">
      <div className="absolute -right-2 top-6 size-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_20%,transparent),transparent_68%)] blur-2xl sm:-right-4 sm:top-4 sm:size-80" />
      <motion.div
        initial={{ y: 16, rotate: 1.5 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        style={{ rotateX, translateY: y }}
        className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10 sm:rounded-[1.6rem]"
      >
        <div className="flex items-center gap-3 border-b border-border bg-muted/55 px-3 py-3 sm:px-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-primary/80" />
            <span className="size-2.5 rounded-full bg-muted-foreground/25" />
            <span className="size-2.5 rounded-full bg-muted-foreground/25" />
          </div>
          <div className="flex h-7 flex-1 items-center justify-center rounded-full border border-border/80 bg-background px-3 font-mono text-[10px] text-muted-foreground sm:text-xs">
            <Globe2 aria-hidden="true" className="mr-1.5 size-3" /> yourbusiness.in
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-muted sm:aspect-[5/6]">
          <video
            src={HERO_VIDEO.video}
            poster={HERO_VIDEO.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${HERO_VIDEO.name} live preview`}
            className="size-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
            <span className="relative flex size-2">
              <motion.span
                className="absolute inline-flex size-full rounded-full bg-red-500"
                animate={{ scale: [1, 1.9, 1] as const, opacity: [0.7, 0, 0.7] as const }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative inline-flex size-2 rounded-full bg-red-500" />
            </span>
            Live
          </span>
          <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-[10px]">Made for your next chapter</p>
            <p className="mt-2 font-display text-3xl font-bold leading-[0.98] tracking-tight text-white sm:text-5xl">Make your<br />next move.</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-semibold text-black">
              Book a table <ArrowUpRight aria-hidden="true" className="size-3" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: FLOATING_Y }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        className="absolute -left-1 bottom-2 z-10 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3 py-2.5 shadow-xl shadow-foreground/10 sm:bottom-0 sm:px-4 sm:py-3"
      >
        <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary"><Check aria-hidden="true" className="size-4" /></span>
        <span><span className="block text-xs font-bold text-foreground">Ready in 2–3 days</span><span className="mt-0.5 block text-[10px] text-muted-foreground">Quick, without the rush</span></span>
      </motion.div>
      <motion.div
        animate={{ y: FLOATING_Y }}
        transition={{ duration: 4.8, delay: 0.4, ease: "easeInOut", repeat: Infinity }}
        className="absolute -right-1 top-0 z-10 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5 shadow-xl shadow-foreground/10 sm:-right-2 sm:top-3 sm:px-4 sm:py-3"
      >
        <span className="flex size-8 items-center justify-center rounded-xl bg-secondary text-foreground"><Smartphone aria-hidden="true" className="size-4" /></span>
        <span className="text-xs font-bold text-foreground">Fast & responsive</span>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden px-4 pb-4 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border)_42%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_42%,transparent)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <div className="pointer-events-none absolute -top-44 left-1/2 -z-10 size-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_15%,transparent),transparent_68%)] blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-4 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
        <motion.div initial={{ y: 18 }} animate={{ y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }} className="relative z-10 py-4 sm:py-8 lg:py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-3.5 py-2 shadow-sm shadow-primary/5 backdrop-blur">
            <span className="relative flex size-2.5">
              <motion.span animate={{ scale: [1, 1.8, 1], opacity: [0.55, 0, 0.55] }} transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity }} className="absolute inline-flex size-full rounded-full bg-primary" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-semibold text-foreground sm:text-sm">Available for new projects</span>
          </div>

          <h1 className="mt-6 max-w-2xl font-display text-[clamp(3.1rem,8vw,6.4rem)] font-bold leading-[0.98] tracking-[-0.035em] text-balance text-foreground">
            I build websites that <span className="bg-gradient-to-r from-primary to-primary/65 bg-clip-text text-transparent">grow</span> your business.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Modern websites, web apps and booking systems for businesses. Ready in 2–7 days, starting at ₹12,000.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button render={<a href="#pricing" />} nativeButton={false} className="h-12 cursor-pointer rounded-full px-6 text-sm font-semibold shadow-lg shadow-primary/20 sm:px-7">
              Get a Website <ArrowUpRight aria-hidden="true" />
            </Button>
            <Button render={<a href="#work" />} nativeButton={false} variant="secondary" className="h-12 cursor-pointer rounded-full px-6 text-sm font-semibold sm:px-7">
              View Work <ArrowDownRight aria-hidden="true" />
            </Button>
          </div>

          <p className="mt-7 font-mono text-[9px] font-medium leading-5 tracking-[0.11em] text-muted-foreground sm:text-[10px] sm:tracking-[0.15em]">
            WEBSITE READY IN 2-3 DAYS <span className="px-1 text-primary">•</span> WEB DEVELOPMENT <span className="px-1 text-primary">•</span> UI/UX <span className="px-1 text-primary">•</span> WEB APPS
          </p>
        </motion.div>

        <BrowserPreview />
      </div>

      <div className="mx-auto mt-5 max-w-6xl sm:mt-8">
        <StatsStrip />
      </div>
      <MarqueeBand />
    </section>
  );
}
