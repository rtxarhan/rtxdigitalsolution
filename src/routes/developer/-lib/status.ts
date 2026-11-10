import type { Doc } from "@/convex/_generated/dataModel";

export type LeadStatus = Doc<"leads">["status"];

export const STATUS_META: Record<LeadStatus, { label: string; className: string }> = {
  new: { label: "New", className: "bg-primary/15 text-primary" },
  contacted: { label: "Contacted", className: "bg-sky-500/15 text-sky-700 dark:text-sky-300" },
  won: { label: "Won", className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  lost: { label: "Lost", className: "bg-muted text-muted-foreground" },
};

export const STATUS_ORDER: LeadStatus[] = ["new", "contacted", "won", "lost"];
