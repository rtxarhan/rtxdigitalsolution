import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ADMIN_PANEL_PASSWORD, isAdmin, requireAdmin } from "./admin";

const statusValidator = v.union(
  v.literal("new"),
  v.literal("contacted"),
  v.literal("won"),
  v.literal("lost"),
);

function clean(value: string, field: string, min: number, max: number): string {
  const trimmed = value.trim();
  if (trimmed.length < min || trimmed.length > max) {
    throw new ConvexError({ code: "BAD_REQUEST", message: `Please check the ${field}.` });
  }
  return trimmed;
}

/** Public: anyone can send an enquiry from the contact form. */
export const submit = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    businessType: v.string(),
    planId: v.string(),
    planName: v.string(),
    planPrice: v.number(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    if (!Number.isFinite(args.planPrice) || args.planPrice < 0) {
      throw new ConvexError({ code: "BAD_REQUEST", message: "Invalid plan price." });
    }
    return await ctx.db.insert("leads", {
      name: clean(args.name, "name", 2, 100),
      phone: clean(args.phone, "phone number", 7, 20),
      businessType: clean(args.businessType, "business type", 2, 100),
      planId: clean(args.planId, "plan", 1, 50),
      planName: clean(args.planName, "plan", 1, 100),
      planPrice: Math.round(args.planPrice),
      message: clean(args.message, "message", 8, 2000),
      status: "new",
    });
  },
});

export const amIAdmin = query({
  args: {},
  handler: async (ctx) => await isAdmin(ctx),
});

/** Second lock on the panel: only the admin account can check the password. */
export const checkPanelPassword = mutation({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return args.password === ADMIN_PANEL_PASSWORD;
  },
});

export const list = query({
  args: {
    paginationOpts: paginationOptsValidator,
    status: v.optional(statusValidator),
  },
  handler: async (ctx, args) => {
    if (!(await isAdmin(ctx))) {
      return { page: [], isDone: true, continueCursor: "" };
    }
    const status = args.status;
    const base = status
      ? ctx.db.query("leads").withIndex("by_status", (q) => q.eq("status", status))
      : ctx.db.query("leads");
    return await base.order("desc").paginate(args.paginationOpts);
  },
});

/** Dashboard numbers. Bounded scan: fine for a freelancer's lead volume. */
export const stats = query({
  args: {},
  handler: async (ctx) => {
    if (!(await isAdmin(ctx))) return null;
    const leads = await ctx.db.query("leads").order("desc").take(2000);
    const byPlan: Record<string, number> = {};
    let pipelineValue = 0;
    let wonValue = 0;
    const counts = { new: 0, contacted: 0, won: 0, lost: 0 };
    for (const lead of leads) {
      counts[lead.status] += 1;
      byPlan[lead.planName] = (byPlan[lead.planName] ?? 0) + 1;
      if (lead.status === "won") wonValue += lead.planPrice;
      else if (lead.status !== "lost") pipelineValue += lead.planPrice;
    }
    return {
      total: leads.length,
      counts,
      pipelineValue,
      wonValue,
      byPlan: Object.entries(byPlan)
        .map(([plan, count]) => ({ plan, count }))
        .sort((a, b) => b.count - a.count),
    };
  },
});

export const update = mutation({
  args: {
    id: v.id("leads"),
    status: v.optional(statusValidator),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const lead = await ctx.db.get("leads", args.id);
    if (!lead) throw new ConvexError({ code: "NOT_FOUND", message: "Lead not found." });
    const patch: { status?: typeof lead.status; note?: string } = {};
    if (args.status) patch.status = args.status;
    if (args.note !== undefined) patch.note = args.note.trim().slice(0, 2000);
    await ctx.db.patch("leads", args.id, patch);
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("leads") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const lead = await ctx.db.get("leads", args.id);
    if (lead) await ctx.db.delete("leads", args.id);
    return null;
  },
});
