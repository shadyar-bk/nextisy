import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const appOrigin = z
  .url({ protocol: /^https?$/u })
  .refine((value) => new URL(value).href === `${new URL(value).origin}/`, {
    message: "APP_ORIGIN must contain only the scheme and host",
  });

export const env = createEnv({
  emptyStringAsUndefined: true,
  runtimeEnv: {
    APP_ORIGIN: process.env.APP_ORIGIN,
    NODE_ENV: process.env.NODE_ENV,
  },
  server: {
    APP_ORIGIN: appOrigin,
  },
  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
});
