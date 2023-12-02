import { Schema, model } from "mongoose";
import { TDoctor, TMedicalHistory, Tcontacts } from "./doctors.interface";

const contactSchema = new Schema<Tcontacts>({
  home: String,
  office: String,
  email: String,
});

export const medicalHistorySchema = new Schema<TMedicalHistory>({
  medical_id: Number,
});

export const doctorSchema = new Schema<TDoctor>(
  {
    userId: {
      type: String,
      index: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    schedule: [String],
    medicalHistory: [medicalHistorySchema],
    contactInfo: contactSchema,
    specialization: String,
    education: [String],
    license_info: String,
    present_address: String,
    permanent_address: String,
    date_of_birth: String,
    gender: String,
  },
  {
    timestamps: true,
  },
);

export const Doctor = model<TDoctor>("Doctors", doctorSchema);
