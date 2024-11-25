[**Metal Dekho v1.0.0**](../../../README.md) • **Docs**

***

[Metal Dekho v1.0.0](../../../modules.md) / [utils/filesystem](../README.md) / ensureLogDirExists

# Function: ensureLogDirExists()

> **ensureLogDirExists**(`dirPath`): `Promise`\<`void`\>

Ensures that a directory exists. If the directory does not exist, it will be created.

- Uses `fs.mkdir` with the `{ recursive: true }` option to create parent directories if needed.
- Handles the case where the directory already exists gracefully.

## Parameters

• **dirPath**: `string`

The path of the directory to ensure exists.

## Returns

`Promise`\<`void`\>

Resolves when the directory exists or is created.

## Throws

If an error other than "EEXIST" occurs.

## Defined in

src/utils/filesystem.ts:13
