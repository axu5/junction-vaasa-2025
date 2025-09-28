import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } =
  convexAuth({
    providers: [Password],
    callbacks: {
      async afterUserCreatedOrUpdated({ db }, { userId }) {
        const users = await db.query("users").collect();
        const isFirstUser = users.length === 1;
        const role = isFirstUser ? "admin" : "operator";
        await db.insert("roles", {
          userId: userId.toString(),
          role: role,
        });
      },
    },
  });
