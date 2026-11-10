import { motion } from "motion/react";
import { cn } from "@/lib/utils.ts";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  highlight: string;
  description?: string;
  className?: string;
};

/** Shared section title: mono eyebrow, display title with an orange highlight. */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("mx-auto max-w-2xl text-center", className)}
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
        {eyebrow}
      </p>
      <h2 className="pt-3 font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">
        {title}{" "}
        <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
          {highlight}
        </span>
      </h2>
      {description && (
        <p className="pt-4 text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
