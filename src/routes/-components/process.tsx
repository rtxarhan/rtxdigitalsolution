import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import SectionHeading from "./section-heading.tsx";

const STEPS = [
  {
    number: "01",
    title: "Discuss",
    description: "We talk through your idea and goals on a free WhatsApp call.",
  },
  {
    number: "02",
    title: "Design",
    description: "We shape the layout and visual direction around your business.",
  },
  {
    number: "03",
    title: "Build",
    description: "Your site comes to life with thoughtful development and animations.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Go live with support and monthly care to keep things running smoothly.",
  },
] as const;

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.65"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="03 — Process"
          title="From idea to"
          highlight="launch."
        />

        <div className="relative mt-14 md:mt-20">
          <div className="absolute bottom-8 left-[1.15rem] top-8 w-px bg-border md:bottom-auto md:left-[12.5%] md:right-[12.5%] md:top-6 md:h-px md:w-auto">
            <motion.div
              className="h-full w-full origin-top bg-primary md:hidden"
              style={{ scaleY: lineScale }}
            />
            <motion.div
              className="hidden h-full w-full origin-left bg-primary md:block"
              style={{ scaleX: lineScale }}
            />
          </div>

          <ol className="relative grid gap-9 md:grid-cols-4 md:gap-6">
            {STEPS.map((step, index) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, x: -16, y: 12 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                className="flex gap-5 md:flex-col md:gap-6"
              >
                <div className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background md:size-12">
                  <span className="font-mono text-xs text-primary">{step.number}</span>
                </div>
                <div className="pb-2 md:pt-1">
                  <p className="font-mono text-sm tracking-[0.2em] text-primary/80">
                    STEP {step.number}
                  </p>
                  <h3 className="pt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="max-w-xs pt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
