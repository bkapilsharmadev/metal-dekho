[**Metal Dekho v1.0.0**](../../../../README.md) • **Docs**

***

[Metal Dekho v1.0.0](../../../../modules.md) / [utils/error/AppError](../README.md) / AppError

# Class: AppError

**`Internal`**

Represents a custom application error with HTTP status codes, error codes, and additional data.

## Extends

- `Error`

## Constructors

### new AppError()

> **new AppError**(`message`, `httpStatus`, `errorCode`?, `data`?): [`AppError`](AppError.md)

Creates a new instance of the AppError class.

#### Parameters

• **message**: `string`

The error message.

• **httpStatus**: `number`

The HTTP status code.

• **errorCode?**: `string`

An optional error code.

• **data?**: `Record`\<`string`, `unknown`\>

An optional data object.

#### Returns

[`AppError`](AppError.md)

#### Overrides

`Error.constructor`

#### Defined in

src/utils/error/AppError.ts:32

## Properties

### data?

> `optional` **data**: `Record`\<`string`, `unknown`\>

An optional data object that can be used to provide additional information about the error.

#### Defined in

src/utils/error/AppError.ts:23

***

### errorCode?

> `optional` **errorCode**: `string`

An optional error code that can be used to identify the error.

#### Defined in

src/utils/error/AppError.ts:17

***

### httpStatus

> **httpStatus**: `number`

The HTTP status code associated with the error.

#### Defined in

src/utils/error/AppError.ts:11

## Methods

### toJSON()

> **toJSON**(): `object`

#### Returns

`object`

Returns a JSON representation of the error.

##### data

> **data**: `undefined` \| `Record`\<`string`, `unknown`\>

##### errorCode

> **errorCode**: `undefined` \| `string`

##### httpStatus

> **httpStatus**: `number`

##### message

> **message**: `string`

##### name

> **name**: `string`

##### stack

> **stack**: `undefined` \| `string`

#### Defined in

src/utils/error/AppError.ts:50
