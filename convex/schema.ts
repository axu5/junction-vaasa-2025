import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  roles: defineTable({
    userId: v.string(),
    role: v.union(v.literal("admin"), v.literal("operator")),
  }),
});

export default schema;
