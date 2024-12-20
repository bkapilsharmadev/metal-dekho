import { DatabaseError } from "@utils/error/server-error/database-error/DatabaseError.js";
import { PostgresClusterConfig } from "./postgres-cluster.types.js";
import PostgresCluster from "@database/postgres/PostgresCluster.js";

class PgClusters {
  private clusters: Map<string, PostgresCluster>;

  constructor() {
    this.clusters = new Map<string, PostgresCluster>();
  }

  /**
   * Add a new cluster to the pool manager.
   *
   * @param config - The cluster configuration.
   */
  addCluster(config: PostgresClusterConfig): void {
    if (this.clusters.has(config.name)) {
      throw new DatabaseError({
        message: `Cluster "${config.name}" already exists`,
      });
    }

    const cluster = new PostgresCluster(config.master, config.slaves);
    this.clusters.set(config.name, cluster);
  }

  /**
   * Get a cluster by name.
   *
   * @param name - The name of the cluster.
   */
  getCluster(name: string): PostgresCluster {
    const cluster = this.clusters.get(name);
    if (!cluster) {
      throw new DatabaseError({
        message: `Cluster "${name}" not found`,
      });
    }
    return cluster;
  }

  /**
   * Destroy a specific cluster.
   *
   * @param name - The name of the cluster to destroy.
   */
  async destroyCluster(name: string): Promise<void> {
    const cluster = this.clusters.get(name);
    if (!cluster) {
      throw new DatabaseError({
        message: `Cluster "${name}" not found`,
      });
    }

    await cluster.destroy();
    this.clusters.delete(name);
  }

  /**
   * Destroy all clusters and their pools.
   */
  async destroyAll(): Promise<void> {
    await Promise.all(
      Array.from(this.clusters.values()).map((cluster) => cluster.destroy()),
    );
    this.clusters.clear();
    console.log("All clusters destroyed");
  }
}

export const pgClusters = new PgClusters();
