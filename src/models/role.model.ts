import mongoose from "@database/mongodb/mongoose-conn";

export interface IRole extends mongoose.Document {
  name: string;
  description: string;
  permissions: string[];
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

const RoleSchema = new mongoose.Schema<IRole>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  permissions: [{ type: String }], // e.g., "user:create", "product:delete"
  active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IRole>("Role", RoleSchema);
