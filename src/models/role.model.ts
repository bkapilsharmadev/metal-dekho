import mongoose from "@database/mongodb/mongoose-conn";
import { ObjectId } from "mongoose";

export interface IRole extends mongoose.Document {
  _id: string | ObjectId;
  name: string;
  description: string;
  permissions: string[];
  active: boolean;
}

const RoleSchema = new mongoose.Schema<IRole>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: [{ type: String }], // e.g., "user:create", "product:delete"
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IRole>("Role", RoleSchema);
