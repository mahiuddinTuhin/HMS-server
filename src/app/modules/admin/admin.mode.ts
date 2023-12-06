import { Schema, model } from "mongoose";
import { TAdmin } from "./admin.interface";

const adminSchema = new Schema<TAdmin>({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User id is required in admin !"],
    unique: true,
    ref: "User",
  },
  id: {
    type: String,
    required: [true, "id is required in admin!"],
  },
});

export const Admin = model("Admin", adminSchema);
