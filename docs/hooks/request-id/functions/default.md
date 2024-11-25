[**Metal Dekho v1.0.0**](../../../README.md) • **Docs**

***

[Metal Dekho v1.0.0](../../../modules.md) / [hooks/request-id](../README.md) / default

# Function: default()

> **default**(`fastify`): `Promise`\<`void`\>

A Fastify plugin that adds a unique request ID to every incoming request.

- Generates a unique ID using `nanoid`.
- Adds the `id` property to the request object for traceability.
- Enhances the request logger with the `requestId` property for better logging context.

### Hook Details:
- Registers an `onRequest` hook that:
  - Generates a unique `requestId` for every request.
  - Attaches the `requestId` to the `request` object.
  - Enhances the request logger with the `requestId`.

## Parameters

• **fastify**: `FastifyInstance`\<`RawServerDefault`, `IncomingMessage`, `ServerResponse`\<`IncomingMessage`\>, `FastifyBaseLogger`, `FastifyTypeProviderDefault`\>

The Fastify instance to which the plugin is registered.

## Returns

`Promise`\<`void`\>

Resolves when the plugin is successfully registered.

## Defined in

src/hooks/request-id.ts:24
