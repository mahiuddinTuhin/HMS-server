import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    userId: String,
    user_id: { type: Schema.Types.ObjectId, required: true },
    role: String,
    schedule: [String],
    contactInfo: Tcontacts,
    education: [TEducation],
    date_of_birth: String,
    gender: String,
    needs_password_change: Boolean,
   });
   
   export const Admin = model("Admin", adminSchema);