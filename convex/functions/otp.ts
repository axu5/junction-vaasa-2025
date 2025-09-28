import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

const OTP_VALIDITY_DURATION_MS = 2 * 60 * 1000;

function generateRandomFloat() {
  return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}

export const verifyOtp = mutation({
  args: { otp: v.string(), siteId: v.string() },
  handler: async (ctx, { otp, siteId }) => {
    const otpEntry = await ctx.db
      .query("otp")
      .filter(q =>
        q.and(
          q.eq(q.field("code"), otp),
          q.gt(q.field("endTime"), Date.now()),
          q.eq(q.field("siteId"), siteId),
          q.gt(Date.now(), q.field("startTime")),
          q.eq(q.field("otpUsedAt"), 0)
        )
      )
      .first();

    if (!otpEntry) {
      return false;
    }

    await ctx.db.patch(otpEntry._id, { otpUsedAt: Date.now() });
    return true;
  },
});

export const getActiveOtp = query({
  args: {},
  handler: async ctx => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");

    const otpEntry = await ctx.db
      .query("otp")
      .filter(q =>
        q.and(
          q.eq(q.field("userId"), user.subject),
          q.gt(q.field("endTime"), Date.now()),
          q.gt(Date.now(), q.field("startTime"))
          // q.eq(q.field("otpUsedAt"), 0)
        )
      )
      .first();

    return otpEntry ? otpEntry : null;
  },
});

export const generateOtp = mutation({
  args: {},
  handler: async ctx => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");

    // Example: generate a random 6-digit OTP
    const otp = Math.floor(
      100000 + generateRandomFloat() * 900000
    ).toString();

    // You could store this in a DB or send via email/SMS
    console.log(`Generated OTP for ${user.subject}: ${otp}`);

    const expiresAt = Date.now() + OTP_VALIDITY_DURATION_MS;

    await ctx.db.insert("otp", {
      userId: user.subject,
      code: otp,
      siteId: "exampleSiteId",
      createdAt: Date.now(),
      endTime: expiresAt,
      startTime: Date.now(),
      otpUsedAt: 0,
    });

    return { otp, expiresAt };
  },
});
