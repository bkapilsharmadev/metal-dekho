[**Metal Dekho v1.0.0**](../../../README.md) • **Docs**

***

[Metal Dekho v1.0.0](../../../modules.md) / [utils/logger](../README.md) / customLogger

# Variable: customLogger

> `const` **customLogger**: `Logger`\<`never`, `boolean`\>

A custom Pino logger instance with multiple streams.

- Writes logs to the console in a developer-friendly format when not in production.
- Writes logs to rotating files for persistent storage.
- Log level adjusts dynamically based on the environment (`NODE_ENV`).

Usage:
```typescript
customLogger.info("This is an informational message.");
customLogger.error("This is an error message.");
```

## See

rotatingFileStream

## Defined in

src/utils/logger.ts:82
