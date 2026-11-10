import { useState } from "react";
import { useMutation } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "motion/react";
import { MessageCircle, Phone, Trash2, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api.js";
import type { Doc } from "@/convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { formatInr } from "@/lib/plans.ts";
import { cn } from "@/lib/utils.ts";
import { STATUS_META, STATUS_ORDER, type LeadStatus } from "../-lib/status.ts";

const STATUS_ITEMS = Object.fromEntries(STATUS_ORDER.map((s) => [s, STATUS_META[s].label]));

function waNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

export default function LeadCard({ lead, index }: { lead: Doc<"leads">; index: number }) {
  const updateLead = useMutation(api.leads.update);
  const removeLead = useMutation(api.leads.remove);
  const [note, setNote] = useState(lead.note ?? "");
  const noteChanged = note !== (lead.note ?? "");

  const save = async (patch: { status?: LeadStatus; note?: string }) => {
    try {
      await updateLead({ id: lead._id, ...patch });
      toast.success("Saved");
    } catch {
      toast.error("Could not save");
    }
  };

  const handleDelete = async () => {
    try {
      await removeLead({ id: lead._id });
      toast.success("Enquiry deleted");
    } catch {
      toast.error("Could not delete");
    }
  };

  const meta = STATUS_META[lead.status];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04, ease: "easeOut" }}
      className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-display text-lg font-bold">{lead.name}</h3>
            <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", meta.className)}>
              {meta.label}
            </span>
          </div>
          <p className="pt-1 text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(lead._creationTime), { addSuffix: true })}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{lead.planName}</p>
          <p className="font-display text-lg font-bold text-primary">{formatInr(lead.planPrice)}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><Phone className="size-3.5 text-primary" /> {lead.phone}</span>
        <span className="inline-flex items-center gap-1.5"><Briefcase className="size-3.5 text-primary" /> {lead.businessType}</span>
      </div>

      <p className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-muted/60 p-3 text-sm leading-relaxed">
        {lead.message}
      </p>

      <Textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Private note (only you can see this)"
        rows={2}
        className="mt-3 min-h-14 text-sm"
      />

      <div className="flex flex-wrap items-center gap-2 pt-3">
        <Select
          items={STATUS_ITEMS}
          value={lead.status}
          onValueChange={(value) => {
            if (value) void save({ status: value });
          }}
        >
          <SelectTrigger className="h-9 w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_ORDER.map((status) => (
              <SelectItem key={status} value={status}>{STATUS_META[status].label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {noteChanged && (
          <Button size="sm" onClick={() => void save({ note })} className="rounded-full">
            Save note
          </Button>
        )}
        <Button
          size="sm"
          variant="secondary"
          render={<a href={`https://wa.me/${waNumber(lead.phone)}`} target="_blank" rel="noreferrer" />}
          nativeButton={false}
          className="rounded-full"
        >
          <MessageCircle className="size-4" /> WhatsApp
        </Button>
        <Button
          size="sm"
          variant="secondary"
          render={<a href={`tel:${lead.phone}`} />}
          nativeButton={false}
          className="rounded-full"
        >
          <Phone className="size-4" /> Call
        </Button>
        <AlertDialog>
          <AlertDialogTrigger
            render={<Button size="icon-sm" variant="ghost" className="ml-auto text-destructive" aria-label="Delete enquiry" />}
          >
            <Trash2 className="size-4" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this enquiry?</AlertDialogTitle>
              <AlertDialogDescription>
                {lead.name}’s enquiry will be removed for good.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => void handleDelete()}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.article>
  );
}
