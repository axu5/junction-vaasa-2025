import { query } from "../_generated/server";

export const getUserRole = query({
  args: {},
  handler: async ctx => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");

    const role = await ctx.db
      .query("roles")
      .filter(q => q.eq(q.field("userId"), user.subject))
      .first();

    return role ? role.role : "operator";
  },
});
