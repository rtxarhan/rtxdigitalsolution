import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PROJECTS, type Project } from "@/lib/projects.ts";
import SectionHeading from "./section-heading.tsx";

type StackCardProps = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

function StackCard({
  project,
  index,
  total,
  progress,
  range,
  targetScale,
}: StackCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });
  const reduceMotion = shouldReduceMotion === true;
  const scaleOutput: [number, number] = [1, reduceMotion ? 1 : targetScale];
  const videoScaleOutput: [number, number] = reduceMotion ? [1, 1] : [1.15, 1];
  const dimOutput: [number, number] = [1, reduceMotion ? 1 : 0.82];
  const scale = useTransform(progress, range, scaleOutput);
  const videoScale = useTransform(scrollYProgress, [0, 1], videoScaleOutput, {
    clamp: true,
  });
  const dim = useTransform(progress, range, dimOutput);
  const number = String(index + 1).padStart(2, "0");
  const totalNumber = String(total).padStart(2, "0");

  return (
    <div className="relative h-[85vh]">
      <motion.article
        ref={cardRef}
        className="sticky mx-auto flex aspect-[4/5] max-h-[calc(100svh-8rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-card shadow-2xl shadow-black/20 md:aspect-[16/10] md:max-h-[calc(100svh-9rem)]"
        style={{
          top: `calc(5rem + ${index * 1.25}rem)`,
          scale,
          opacity: dim,
          zIndex: index + 1,
        }}
      >
        <motion.video
          className="absolute inset-0 size-full object-cover"
          src={project.video}
          poster={project.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${project.name} live website preview`}
          style={{ scale: videoScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />

        <div className="relative z-10 flex items-start justify-between p-4 sm:p-6 md:p-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-md sm:text-xs">
            <motion.span
              className="size-2 rounded-full bg-red-500"
              animate={{ scale: [1, 1.35, 1], opacity: [1, 0.55, 1] }}
              transition={{
                duration: 1.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            LIVE
          </span>
          <span className="font-mono text-xs tracking-[0.18em] text-white/80 sm:text-sm">
            {number} <span className="text-white/45">/</span> {totalNumber}
          </span>
        </div>

        <div className="relative z-10 mt-auto flex flex-col items-start gap-3 p-5 text-white sm:gap-4 sm:p-8 md:p-10">
          <Badge className="border-white/25 bg-white/15 text-white backdrop-blur-md">
            {project.category}
          </Badge>
          <div className="max-w-3xl">
            <h3 className="font-display text-3xl font-semibold leading-[0.98] tracking-tight text-balance sm:text-5xl md:text-6xl">
              {project.name}
            </h3>
            <p className="pt-2 text-sm text-white/80 sm:pt-3 sm:text-base md:text-lg">
              {project.result}
            </p>
          </div>
          {project.liveUrl ? (
            <Button
              render={
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              nativeButton={false}
              className="mt-1 cursor-pointer rounded-full bg-white px-5 text-black hover:bg-white/90"
            >
              Visit Live Site <ArrowUpRight className="ml-1 size-4" />
            </Button>
          ) : (
            <Button
              variant="secondary"
              disabled
              className="mt-1 rounded-full border border-white/15 bg-white/15 text-white/75"
            >
              Live link soon
            </Button>
          )}
        </div>
      </motion.article>
    </div>
  );
}

export default function Work() {
  const stackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });
  const progress = scrollYProgress;
  const total = PROJECTS.length;

  return (
    <section id="work" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="02 — Work"
        title="Real projects,"
        highlight="live in motion."
        description="Every card is a live preview. Scroll to flip through recent builds."
      />

      <div ref={stackRef} className="mx-auto max-w-6xl pt-12 sm:pt-16">
        {PROJECTS.map((project, index) => {
          const start = (index + 1) / total;
          const end = Math.min((index + 2) / total, 1);
          const range: [number, number] = [start, end];
          const targetScale = shouldReduceMotion ? 1 : 0.9;

          return (
            <StackCard
              key={project.name}
              project={project}
              index={index}
              total={total}
              progress={progress}
              range={range}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
