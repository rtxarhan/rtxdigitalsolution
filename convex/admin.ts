import { ConvexError } from "convex/values";
import type { QueryCtx } from "./_generated/server";

/** Only this account can open the /developer admin panel. */
export const ADMIN_EMAIL = "rtxarhangaming@gmail.com";

/** Extra panel password. Kept on the server only, never sent to the browser. */
export const ADMIN_PANEL_PASSWORD = "arhandigital";

export async function isAdmin(ctx: QueryCtx): Promise<boolean> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity || typeof identity.email !== "string") return false;
  return identity.email.trim().toLowerCase() === ADMIN_EMAIL;
}

export async function requireAdmin(ctx: QueryCtx): Promise<void> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError({ code: "UNAUTHENTICATED", message: "Please sign in." });
  }
  if (!(await isAdmin(ctx))) {
    throw new ConvexError({ code: "FORBIDDEN", message: "Only the admin can do this." });
  }
}
