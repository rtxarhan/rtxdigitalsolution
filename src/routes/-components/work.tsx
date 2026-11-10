import { ArrowUpRight, Check, Clock3, MapPin, Play } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { PROJECTS, type Project } from "@/lib/projects.ts";
import SectionHeading from "./section-heading.tsx";

function ProjectVideo({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
      <video
        src={project.video}
        poster={project.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${project.name} video preview`}
        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
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
      <p className="absolute bottom-3 left-3 right-3 truncate font-display text-lg font-bold text-white sm:text-xl">
        {project.name}
      </p>
    </div>
  );
}

function VisitButton({ project }: { project: Project }) {
  if (!project.liveUrl) {
    return (
      <Button variant="secondary" size="sm" disabled className="rounded-full">
        <Play aria-hidden="true" /> Live link soon
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      render={<a href={project.liveUrl} target="_blank" rel="noreferrer" />}
      nativeButton={false}
      className="cursor-pointer rounded-full"
    >
      Visit Live Site <ArrowUpRight aria-hidden="true" />
    </Button>
  );
}

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
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full gap-0 rounded-2xl border border-border/80 bg-card p-3 shadow-[0_14px_40px_-30px] shadow-foreground/25 transition-shadow duration-300 hover:shadow-[0_24px_56px_-30px] hover:shadow-primary/30 sm:p-4">
                <ProjectVideo project={project} />
                <div className="flex flex-col gap-4 px-2 pt-4 pb-1 sm:px-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
                      <Check className="size-3.5 shrink-0 text-primary" />
                      <span className="truncate">{project.result}</span>
                    </p>
                    <Badge className="shrink-0 border border-primary/20 bg-accent px-2.5 py-1 text-[10px] text-accent-foreground">
                      {project.category}
                    </Badge>
                  </div>
                  <div>
                    <VisitButton project={project} />
                  </div>
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
