import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site.ts";

/** Centered animated card used for the sign-in, denied and password screens. */
export default function GateCard({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[30rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:22px_22px] opacity-40" />
      <motion.div
        initial={{ y: 20, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md rounded-[2rem] border border-border bg-card p-7 text-center shadow-2xl shadow-foreground/10 sm:p-9"
      >
        <div className="mx-auto flex items-center justify-center gap-2.5">
          <img src={site.logo} alt="" className="size-10 rounded-full object-cover" />
          <span className="font-display text-lg font-bold">{site.name} Admin</span>
        </div>
        <motion.div
          initial={{ rotate: -12, scale: 0.6 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
          className="mx-auto mt-7 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30"
        >
          {icon}
        </motion.div>
        <h1 className="pt-5 font-display text-2xl font-bold tracking-tight">{title}</h1>
        <p className="pt-2 text-sm text-muted-foreground">{description}</p>
        <div className="pt-6">{children}</div>
        <Link
          to="/"
          className="mt-6 inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-3.5" /> Back to website
        </Link>
      </motion.div>
    </div>
  );
}
