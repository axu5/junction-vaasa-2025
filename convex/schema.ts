import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  roles: defineTable({
    userId: v.string(),
    role: v.union(v.literal("admin"), v.literal("operator")),
  }),
  otp: defineTable({
    userId: v.string(),
    code: v.string(),
    siteId: v.string(),
    createdAt: v.number(),
    startTime: v.number(),
    endTime: v.number(),
    otpUsedAt: v.optional(v.number()),
  }),
});

export default schema;
