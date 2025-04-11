import { z } from 'zod';

export const ConfigValidationSchema = z.object({
  NODE_ENV: z
    .enum(['local', 'development', 'staging', 'production'])
    .default('development'),

  PORT: z.coerce.number().positive().default(3000),

  //postgres credentials
  PG_HOST: z.string(),
  PG_DATABASE: z.string(),
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_PORT: z.coerce.number().positive(),
});
