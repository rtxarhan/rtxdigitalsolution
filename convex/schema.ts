import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  // Enquiries sent from the website contact form
  leads: defineTable({
    name: v.string(),
    phone: v.string(),
    businessType: v.string(),
    planId: v.string(),
    planName: v.string(),
    planPrice: v.number(),
    message: v.string(),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("won"),
      v.literal("lost"),
    ),
    note: v.optional(v.string()),
  }).index("by_status", ["status"]),
});
