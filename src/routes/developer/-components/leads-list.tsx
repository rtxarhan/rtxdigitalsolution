import { useState } from "react";
import { usePaginatedQuery } from "convex/react";
import { AnimatePresence } from "motion/react";
import { Inbox } from "lucide-react";
import { api } from "@/convex/_generated/api.js";
import { Button } from "@/components/ui/button.tsx";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { cn } from "@/lib/utils.ts";
import { STATUS_META, STATUS_ORDER, type LeadStatus } from "../-lib/status.ts";
import LeadCard from "./lead-card.tsx";

type Filter = LeadStatus | "all";

export default function LeadsList() {
  const [filter, setFilter] = useState<Filter>("all");
  const { results, status, loadMore } = usePaginatedQuery(
    api.leads.list,
    filter === "all" ? {} : { status: filter },
    { initialNumItems: 20 },
  );

  const filters: Array<{ id: Filter; label: string }> = [
    { id: "all", label: "All" },
    ...STATUS_ORDER.map((s) => ({ id: s, label: STATUS_META[s].label })),
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {status === "LoadingFirstPage" ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-52 w-full rounded-2xl" />
          ))}
        </div>
      ) : status === "Exhausted" && results.length === 0 ? (
        <Empty className="rounded-2xl border border-dashed border-border bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon"><Inbox /></EmptyMedia>
            <EmptyTitle>No enquiries yet</EmptyTitle>
            <EmptyDescription>
              When someone fills the contact form on your website, it shows up here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {results.map((lead, index) => (
              <LeadCard key={lead._id} lead={lead} index={index} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {(status === "CanLoadMore" || status === "LoadingMore") && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            onClick={() => loadMore(20)}
            disabled={status === "LoadingMore"}
            className="rounded-full"
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
