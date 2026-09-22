import { z } from 'zod';

export const envSchema = z.object({
  VITE_APP_ENVIRONMENT: z.enum([
    'local',
    'development',
    'staging',
    'production',
  ]),
  VITE_API_URL: z.url(),
  VITE_SERVE_IMAGES_URL: z.url(),
});

export type EnvVariables = z.infer<typeof envSchema>;
export type EnvVariable = keyof EnvVariables;

declare global {
  var __ENV_CONFIG__: Record<EnvVariable, string>;
}

export const env = <K extends EnvVariable>(key: K): EnvVariables[K] => {
  if (globalThis.__ENV_CONFIG__?.[key]) {
    return globalThis.__ENV_CONFIG__[key] as EnvVariables[K];
  }
  return import.meta.env[key] as EnvVariables[K];
};
