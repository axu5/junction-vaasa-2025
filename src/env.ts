import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets-zod";
import { z } from "zod";

export const env = createEnv({
  server: {
    CONVEX_DEPLOYMENT: z.string().min(1),
    SCADA_IAM_TOKEN: z.string().min(1),
    SCADA_ENDPOINT_URL: z.url().min(1),
  },
  client: {
    NEXT_PUBLIC_CONVEX_URL: z.url().min(1),
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: z.string().min(1),
    NEXT_PUBLIC_MAPBOX_STYLE_URL: z.string().min(1),
  },
  runtimeEnv: {
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
    SCADA_IAM_TOKEN: process.env.SCADA_IAM_TOKEN,
    SCADA_ENDPOINT_URL: process.env.SCADA_ENDPOINT_URL,

    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    NEXT_PUBLIC_MAPBOX_STYLE_URL:
      process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL,
  },
  extends: [vercel()],
});
