import { Type, Static } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

// Define schema using TypeBox
export const RoleSchema = Type.Object({
  name: Type.String({ minLength: 3 }),
  description: Type.String({ minLength: 10 }),
  permissions: Type.Array(Type.String({ pattern: "^[a-z]+:[a-z]+$" })),
  active: Type.Optional(Type.Boolean({ default: true })),
});

// Define TypeScript type from the schema
export type CreateRoleDTO = Static<typeof RoleSchema>;

// Use TypeBox schema inside Fastify schema
export const createRoleSchema: FastifySchema = {
  body: RoleSchema,
} as const;

const RoleParamSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
});

// **Schema for PUT (Update Role)**
export const UpdateRoleSchema = Type.Object({
  name: Type.Optional(Type.String({ minLength: 3 })),
  description: Type.Optional(Type.String({ minLength: 10 })),
  permissionsToAdd: Type.Optional(
    Type.Array(Type.String({ pattern: "^[a-z]+:[a-z]+$" })),
  ),
  permissionsToRemove: Type.Optional(
    Type.Array(Type.String({ pattern: "^[a-z]+:[a-z]+$" })),
  ),
  active: Type.Optional(Type.Boolean()),
});

export type UpdateRoleDTO = Static<typeof UpdateRoleSchema>;
export type RoleParamDTO = Static<typeof RoleParamSchema>;

export const updateRoleSchema: FastifySchema = {
  params: RoleParamSchema,
  body: UpdateRoleSchema,
} as const;

// **Schema for GET (Get Role by ID)**
export const getRoleByIdSchema: FastifySchema = {
  params: RoleParamSchema,
} as const;

// **Schema for DELETE (Delete Role by ID)**
export const deleteRoleSchema: FastifySchema = {
  params: RoleParamSchema,
} as const;
