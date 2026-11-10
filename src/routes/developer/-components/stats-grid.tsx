import { motion } from "motion/react";
import { CircleCheck, IndianRupee, Inbox, TrendingUp } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { formatInr } from "@/lib/plans.ts";

export default function StatsGrid() {
  const stats = useQuery(api.leads.stats);

  if (stats === undefined) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>
    );
  }
  if (stats === null) return null;

  const cards = [
    { label: "Total enquiries", value: String(stats.total), icon: Inbox },
    { label: "New (not contacted)", value: String(stats.counts.new), icon: TrendingUp },
    { label: "Pipeline value", value: formatInr(stats.pipelineValue), icon: IndianRupee },
    { label: "Won deals", value: `${stats.counts.won} · ${formatInr(stats.wonValue)}`, icon: CircleCheck },
  ];
  const maxPlan = Math.max(1, ...stats.byPlan.map((p) => p.count));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ y: 16, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
              className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground sm:text-sm">{card.label}</p>
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-primary">
                  <Icon className="size-4" />
                </span>
              </div>
              <p className="truncate pt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">{card.value}</p>
            </motion.div>
          );
        })}
      </div>

      {stats.byPlan.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="font-display text-base font-bold">Which plan people want</p>
          <div className="space-y-3 pt-4">
            {stats.byPlan.map((row, index) => (
              <div key={row.plan} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-3 text-sm">
                <span className="truncate text-muted-foreground">{row.plan}</span>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(row.count / maxPlan) * 100}%` }}
                    transition={{ duration: 0.7, delay: 0.1 + index * 0.06, ease: "easeOut" }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <span className="text-right font-mono text-xs">{row.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
