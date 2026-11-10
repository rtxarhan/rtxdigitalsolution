import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { MessageCircle, Scissors, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { STORY_VIDEO } from "@/lib/projects.ts";

type PieceOrigin = {
  x: number;
  y: number;
  rotate: number;
};

type PieceRange = {
  from: PieceOrigin;
  range: [number, number];
};

type PieceStyle = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  opacity: MotionValue<number>;
};

function usePiece(progress: MotionValue<number>, { from, range }: PieceRange): PieceStyle {
  const x = useTransform(progress, [...range], [from.x, 0], { clamp: true });
  const y = useTransform(progress, [...range], [from.y, 0], { clamp: true });
  const rotate = useTransform(progress, [...range], [from.rotate, 0], { clamp: true });
  const opacity = useTransform(progress, [range[0], range[0] + 0.08], [0, 1], {
    clamp: true,
  });

  return { x, y, rotate, opacity };
}

const STAGES = [
  { eyebrow: "01 — The idea", first: "Every piece of", second: "your business." },
  { eyebrow: "02 — The build", first: "Designed", second: "piece by piece." },
  { eyebrow: "03 — The launch", first: "Your customers", second: "are waiting." },
] as const;

function StageHeadline({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  const stage = STAGES[index];
  const ranges: [number, number, number][] = [
    [0, 0.24, 0.38],
    [0.27, 0.48, 0.69],
    [0.59, 0.76, 1],
  ];
  const range = ranges[index];
  const outputRange = index === 0 ? [1, 1, 0] : index === 2 ? [0, 1, 1] : [0, 1, 0];
  const opacity = useTransform(progress, range, outputRange, { clamp: true });

  return (
    <motion.div
      className="absolute inset-x-4 top-[6svh] z-10 text-center sm:top-[7svh]"
      style={{ opacity }}
      aria-hidden="true"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs">
        {stage.eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-5xl">
        {stage.first}
        <br />
        <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
          {stage.second}
        </span>
      </h2>
    </motion.div>
  );
}

export default function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const finalProgress = useMotionValue(1);
  const progress = shouldReduceMotion ? finalProgress : scrollYProgress;

  const browserRotateX = useTransform(progress, [0, 1], [25, 0], { clamp: true });
  const browserScale = useTransform(progress, [0, 1], [0.85, 1], { clamp: true });
  const liveOpacity = useTransform(progress, [0.78, 0.9], [0, 1], {
    clamp: true,
  });
  const ctaOpacity = useTransform(progress, [0.85, 0.96], [0, 1], {
    clamp: true,
  });
  const ctaY = useTransform(progress, [0.85, 0.96], [18, 0], {
    clamp: true,
  });

  const navPiece = usePiece(progress, { from: { x: -740, y: -260, rotate: -14 }, range: [0.08, 0.46] });
  const heroPiece = usePiece(progress, { from: { x: -620, y: 380, rotate: 12 }, range: [0.17, 0.55] });
  const videoPiece = usePiece(progress, { from: { x: 720, y: -340, rotate: -12 }, range: [0.25, 0.62] });
  const ratingPiece = usePiece(progress, { from: { x: -520, y: 260, rotate: -18 }, range: [0.34, 0.66] });
  const servicesPiece = usePiece(progress, { from: { x: 460, y: 310, rotate: 15 }, range: [0.42, 0.72] });
  const whatsappPiece = usePiece(progress, { from: { x: 600, y: 400, rotate: 24 }, range: [0.49, 0.75] });
  const bookingPiece = usePiece(progress, { from: { x: 700, y: 300, rotate: 10 }, range: [0.52, 0.76] });

  const dotOneWidth = useTransform(progress, [0, 0.3, 0.37, 1], [22, 22, 7, 7], { clamp: true });
  const dotTwoWidth = useTransform(progress, [0, 0.29, 0.36, 0.63, 0.7, 1], [7, 7, 22, 22, 7, 7], { clamp: true });
  const dotThreeWidth = useTransform(progress, [0, 0.62, 0.69, 1], [7, 7, 22, 22], { clamp: true });
  const dotOneOpacity = useTransform(progress, [0, 0.34, 0.4], [1, 1, 0.35], { clamp: true });
  const dotTwoOpacity = useTransform(progress, [0, 0.3, 0.38, 0.65, 0.72], [0.35, 0.35, 1, 1, 0.35], { clamp: true });
  const dotThreeOpacity = useTransform(progress, [0, 0.64, 0.72], [0.35, 0.35, 1], { clamp: true });

  return (
    <section id="story" ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_65%)] opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />
        <div className="pointer-events-none absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 sm:right-8">
          <motion.span className="h-1.5 rounded-full bg-primary" style={{ width: dotOneWidth, opacity: dotOneOpacity }} />
          <motion.span className="h-1.5 rounded-full bg-primary" style={{ width: dotTwoWidth, opacity: dotTwoOpacity }} />
          <motion.span className="h-1.5 rounded-full bg-primary" style={{ width: dotThreeWidth, opacity: dotThreeOpacity }} />
        </div>

        {STAGES.map((stage, index) => (
          <StageHeadline key={stage.eyebrow} progress={progress} index={index} />
        ))}

        <div className="relative z-0 flex w-full flex-col items-center gap-4 px-3 pt-[18svh] sm:px-8 sm:pt-[20svh]">
          <div className="[perspective:1200px] w-full max-w-4xl">
            <motion.div
              className="flex h-[min(51svh,500px)] min-h-[310px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 sm:rounded-3xl"
              style={{ rotateX: browserRotateX, scale: browserScale }}
            >
              <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-border bg-accent/50 px-3 sm:h-11 sm:px-4">
                <span className="size-2 rounded-full bg-muted-foreground/35 sm:size-2.5" />
                <span className="size-2 rounded-full bg-muted-foreground/35 sm:size-2.5" />
                <span className="size-2 rounded-full bg-muted-foreground/35 sm:size-2.5" />
                <span className="mx-auto flex h-5 w-[42%] items-center justify-center rounded-full border border-border bg-background px-3 font-mono text-[9px] text-muted-foreground sm:h-6 sm:text-[10px]">
                  glowstudio.in
                </span>
                <motion.span
                  className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-1 font-mono text-[8px] font-semibold tracking-wider text-foreground sm:text-[9px]"
                  style={{ opacity: liveOpacity }}
                >
                  <span className="size-1.5 animate-pulse rounded-full bg-red-500" /> LIVE
                </motion.span>
              </div>

              <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] gap-2 p-2.5 sm:gap-3 sm:p-4">
                <motion.nav
                  className="flex min-h-8 items-center justify-between rounded-lg border border-border bg-background/80 px-2.5 sm:min-h-10 sm:px-4"
                  style={navPiece}
                  aria-label="Glow Studio website navigation"
                >
                  <span className="flex items-center gap-1.5 font-display text-[11px] font-semibold sm:gap-2 sm:text-sm">
                    <Scissors className="size-3.5 text-primary sm:size-4" /> Glow Studio
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[7px] text-muted-foreground sm:gap-5 sm:text-[9px]">
                    <span>Home</span><span>Services</span><span className="hidden min-[430px]:inline">Gallery</span><span className="hidden sm:inline">About</span>
                  </div>
                </motion.nav>

                <div className="grid min-h-0 grid-cols-[0.92fr_1.08fr] gap-2 sm:gap-4">
                  <motion.div
                    className="flex min-w-0 flex-col items-start justify-center rounded-xl border border-border bg-background/65 p-2.5 sm:rounded-2xl sm:p-5"
                    style={heroPiece}
                  >
                    <p className="font-mono text-[7px] tracking-[0.15em] text-muted-foreground sm:text-[9px] sm:tracking-[0.2em]">HAIR · SKIN · NAILS</p>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-[0.94] tracking-tight sm:mt-3 sm:text-4xl">
                      Look good.<br /><span className="font-serif text-base font-normal italic text-primary sm:text-3xl">Feel better.</span>
                    </h3>
                    <motion.div className="mt-2 sm:mt-4" style={ratingPiece}>
                      <div className="flex items-center gap-0.5 text-amber-500" aria-label="5 stars">
                        {Array.from({ length: 5 }, (_, starIndex) => (
                          <Star key={starIndex} className="size-2 fill-current sm:size-3" />
                        ))}
                        <span className="ml-1.5 whitespace-nowrap font-mono text-[7px] text-muted-foreground sm:text-[9px]">4.9 on Google</span>
                      </div>
                    </motion.div>
                    <Button size="sm" className="mt-2 h-7 cursor-pointer rounded-full px-3 text-[9px] sm:mt-4 sm:h-8 sm:px-4 sm:text-xs">
                      Book now
                    </Button>
                  </motion.div>

                  <motion.div
                    className="relative min-h-0 overflow-hidden rounded-xl border border-border bg-accent sm:rounded-2xl"
                    style={videoPiece}
                  >
                    <video
                      className="absolute inset-0 size-full object-cover"
                      src={STORY_VIDEO.video}
                      poster={STORY_VIDEO.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label="A looping preview video for Glow Studio"
                    />
                    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-background/85 px-2 py-1 font-mono text-[8px] font-semibold tracking-wider text-foreground backdrop-blur-sm sm:left-3 sm:top-3 sm:text-[9px]">
                      <span className="size-1.5 animate-pulse rounded-full bg-red-500" /> LIVE
                    </div>
                    <motion.div
                      className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-xl border border-border bg-card/95 px-2 py-1.5 shadow-lg backdrop-blur sm:bottom-3 sm:gap-2 sm:rounded-2xl sm:px-3 sm:py-2"
                      style={bookingPiece}
                    >
                      <span className="font-mono text-[8px] font-semibold text-foreground sm:text-[10px]">Today</span>
                      <span className="rounded-full bg-accent px-1.5 py-1 font-mono text-[7px] text-muted-foreground sm:px-2 sm:text-[9px]">11:00</span>
                      <span className="rounded-full bg-primary px-1.5 py-1 font-mono text-[7px] text-primary-foreground sm:px-2 sm:text-[9px]">1:30</span>
                      <span className="rounded-full bg-accent px-1.5 py-1 font-mono text-[7px] text-muted-foreground sm:px-2 sm:text-[9px]">4:00</span>
                    </motion.div>
                  </motion.div>
                </div>

                <div className="relative flex min-h-8 items-center justify-between gap-1.5 sm:min-h-10">
                  <motion.div className="flex min-w-0 items-center gap-1.5 sm:gap-2" style={servicesPiece}>
                    {["Haircut", "Facial", "Bridal"].map((service) => (
                      <span key={service} className="flex items-center gap-1 rounded-full border border-border bg-background/80 px-2 py-1 font-mono text-[7px] text-muted-foreground sm:gap-1.5 sm:px-3 sm:text-[9px]">
                        <Sparkles className="size-2.5 text-primary sm:size-3" /> {service}
                      </span>
                    ))}
                  </motion.div>
                  <motion.div
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg sm:size-10"
                    style={whatsappPiece}
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="size-4 sm:size-5" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
            <Button
              render={<a href="#pricing" />}
              nativeButton={false}
              className="cursor-pointer rounded-full px-6 shadow-lg shadow-primary/15"
            >
              Start my website
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
