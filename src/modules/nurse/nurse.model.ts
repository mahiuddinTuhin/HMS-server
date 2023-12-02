import { Schema, model } from "mongoose";

const nurseSchema = new Schema({
    userId: String,
    user_id: { type: Schema.Types.ObjectId, required: true },
    specialization: String,
    schedule: [String],
    contactInfo: Tcontacts,
    education: [TEducation],
    date_of_birth: String,
    gender: String,
    needs_password_change: Boolean,
   });
   export const Nurse = model("Nurse", nurseSchema);