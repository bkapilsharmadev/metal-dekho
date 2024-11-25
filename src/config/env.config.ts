import * as dotenv from "dotenv";
dotenv.config();

interface EnvVar {
  value: string | undefined;
  required: boolean;
}

interface EnvVariables {
  APP_PORT: EnvVar;
  APP_HOST: EnvVar;
  NODE_ENV: EnvVar;
  LOG_DIR: EnvVar;
}

const envVariables: EnvVariables = {
  NODE_ENV: { value: process.env.NODE_ENV, required: true },
  APP_PORT: { value: process.env.APP_PORT, required: true },
  APP_HOST: { value: process.env.APP_HOST, required: false },
  LOG_DIR: { value: process.env.LOG_DIR, required: true },
};

const getEnvVariable = (key: keyof EnvVariables): string => {
  const envVar = envVariables[key];
  if (envVar.required && envVar.value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return envVar.value ?? "";
};

export const NODE_ENV = getEnvVariable("NODE_ENV") || "development";
export const APP_PORT = getEnvVariable("APP_PORT") || "3000";
export const APP_HOST = getEnvVariable("APP_HOST") || "localhost";
export const LOG_DIR = getEnvVariable("LOG_DIR") || "./logs";
