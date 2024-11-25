import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node22', // Adjust this based on your Node.js version
  format: 'esm',
  outdir: 'dist',
  external: ['dotenv', 'fs', 'path', 'os', 'crypto', 'fastify'], // Core Node.js modules to keep external
}).catch(() => process.exit(1));
