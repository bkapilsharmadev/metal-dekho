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

  // Database Variables
  PG_MASTER_HOST: EnvVar;
  PG_MASTER_PORT: EnvVar;
  PG_MASTER_USER: EnvVar;
  PG_MASTER_PASSWORD: EnvVar;
  PG_MASTER_DB: EnvVar;

  PG_SLAVE1_HOST: EnvVar;
  PG_SLAVE1_PORT: EnvVar;
  PG_SLAVE1_USER: EnvVar;
  PG_SLAVE1_PASSWORD: EnvVar;
  PG_SLAVE1_DB: EnvVar;

  MONGO_MASTER_URI: EnvVar;
  MONGO_REPLICA1_URI: EnvVar;
}

const envVariables: EnvVariables = {
  NODE_ENV: { value: process.env.NODE_ENV, required: true },
  APP_PORT: { value: process.env.APP_PORT, required: true },
  APP_HOST: { value: process.env.APP_HOST, required: false },
  LOG_DIR: { value: process.env.LOG_DIR, required: true },

  // PostgreSQL Master
  PG_MASTER_HOST: { value: process.env.PG_MASTER_HOST, required: true },
  PG_MASTER_PORT: { value: process.env.PG_MASTER_PORT, required: true },
  PG_MASTER_USER: { value: process.env.PG_MASTER_USER, required: true },
  PG_MASTER_PASSWORD: { value: process.env.PG_MASTER_PASSWORD, required: true },
  PG_MASTER_DB: { value: process.env.PG_MASTER_DB, required: true },

  // PostgreSQL Slave 1
  PG_SLAVE1_HOST: { value: process.env.PG_SLAVE1_HOST, required: true },
  PG_SLAVE1_PORT: { value: process.env.PG_SLAVE1_PORT, required: true },
  PG_SLAVE1_USER: { value: process.env.PG_SLAVE1_USER, required: true },
  PG_SLAVE1_PASSWORD: { value: process.env.PG_SLAVE1_PASSWORD, required: true },
  PG_SLAVE1_DB: { value: process.env.PG_SLAVE1_DB, required: true },

  // MongoDB
  MONGO_MASTER_URI: { value: process.env.MONGO_MASTER_URI, required: true },
  MONGO_REPLICA1_URI: { value: process.env.MONGO_REPLICA1_URI, required: true },
};

const getEnvVariable = (key: keyof EnvVariables): string => {
  const envVar = envVariables[key];
  if (envVar.required && envVar.value === undefined) {
    throw new Error(`❌Missing required environment variable: ${key}`);
  }
  return envVar.value ?? "";
};

export const NODE_ENV = getEnvVariable("NODE_ENV") || "development";
export const APP_PORT = getEnvVariable("APP_PORT") || "3000";
export const APP_HOST = getEnvVariable("APP_HOST") || "localhost";
export const LOG_DIR = getEnvVariable("LOG_DIR") || "./logs";

// PostgreSQL Config
export const PG_MASTER = {
  host: getEnvVariable("PG_MASTER_HOST"),
  port: Number(getEnvVariable("PG_MASTER_PORT")),
  user: getEnvVariable("PG_MASTER_USER"),
  password: getEnvVariable("PG_MASTER_PASSWORD"),
  database: getEnvVariable("PG_MASTER_DB"),
};

export const PG_SLAVE1 = {
  host: getEnvVariable("PG_SLAVE1_HOST"),
  port: Number(getEnvVariable("PG_SLAVE1_PORT")),
  user: getEnvVariable("PG_SLAVE1_USER"),
  password: getEnvVariable("PG_SLAVE1_PASSWORD"),
  database: getEnvVariable("PG_SLAVE1_DB"),
};

// MongoDB Config
export const MONGO_MASTER_URI = getEnvVariable("MONGO_MASTER_URI");
export const MONGO_REPLICA1_URI = getEnvVariable("MONGO_REPLICA1_URI");
