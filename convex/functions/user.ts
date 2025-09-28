import { query } from "../_generated/server";

export const getUserRole = query({
  args: {},
  handler: async ctx => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return "not_authenticated";

    const [userId] = user.subject.split("|");

    const role = await ctx.db
      .query("roles")
      .filter(q => q.eq(q.field("userId"), userId))
      .first();

    return role ? role.role : "operator";
  },
});
