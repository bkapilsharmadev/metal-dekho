import { PoolConfig } from "pg";

/**
 * A class representing a PostgreSQL cluster.
 *
 * @param master: PoolConfig    - The master pool configuration.
 * @param slaves: PoolConfig[] (optional | default: []) - The slave pool configurations.
 */
export interface PostgresClusterConfig {
  name: string;
  master: PoolConfig;
  slaves?: PoolConfig[];
}
