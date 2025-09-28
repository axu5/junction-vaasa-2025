import { query } from "../_generated/server";

function generateRandomFloat() {
  return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}

export const generateOtp = query({
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

    return otp;
  },
});
