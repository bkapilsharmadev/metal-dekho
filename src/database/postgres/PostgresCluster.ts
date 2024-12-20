import { Pool, PoolConfig } from "pg";
import { DatabaseError } from "@src/utils/error/server-error/database-error/DatabaseError.js";
import { customLogger } from "@utils/logger.js";

/**
 * A class representing a PostgreSQL cluster.
 *
 * @param master: PoolConfig    - The master pool configuration.
 * @param slaves: PoolConfig[] (optional | default: []) - The slave pool configurations.
 */
export default class PostgresCluster {
  private masterPool: Pool;
  private slavePools: Pool[];

  constructor(master: PoolConfig, slaves: PoolConfig[] = []) {
    this.masterPool = new Pool(master);
    this.slavePools = slaves.map((slaveConfig) => new Pool(slaveConfig));
  }

  /**
   * Get the master pool.
   */
  getMaster(): Pool {
    return this.masterPool;
  }

  /**
   * Get a random slave pool.
   */
  getSlave(): Pool {
    if (this.slavePools.length === 0) {
      throw new DatabaseError({ message: "No slave pools available" });
    }

    const randomIndex = Math.floor(Math.random() * this.slavePools.length);
    return this.slavePools[randomIndex];
  }

  /**
   * Destroy the master pool.
   */
  async destroyMaster(): Promise<void> {
    await this.masterPool.end();
    console.log("Master pool destroyed");
    customLogger.info("Master pool destroyed");
  }

  /**
   * Destroy a specific slave pool.
   *
   * @param index - The index of the slave pool to destroy.
   */
  async destroySlave(index: number): Promise<void> {
    if (index < 0 || index >= this.slavePools.length) {
      throw new DatabaseError({
        message: `Slave pool at index ${index.toString()} not found`,
      });
    }

    await this.slavePools[index].end();
    this.slavePools.splice(index, 1);
    console.log(`Slave pool at index ${index.toString()} destroyed`);
    customLogger.info(`Slave pool at index ${index.toString()} destroyed`);
  }

  /**
   * Destroy all pools in the cluster.
   */
  async destroy(): Promise<void> {
    await Promise.all([
      this.masterPool.end(),
      ...this.slavePools.map((pool) => pool.end()),
    ]);
    console.log("All pools in the cluster destroyed");
    customLogger.info("All pools in the cluster destroyed");
  }
}
