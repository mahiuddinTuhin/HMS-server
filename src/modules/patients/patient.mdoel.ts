import { Schema, model } from "mongoose";
import {
  TAppointments,
  TDoctor,
  TGuardian,
  TMedicalHistory,
  TPatient,
} from "./patient.interface";

const guardianSchema = new Schema<TGuardian>({
  name: String,
  contactNumber: String,
  address: String,
});

const doctorSchema = new Schema<TDoctor>({
  id: Number,
  name: String,
  specialty: String,
});

const appointmentSchema = new Schema<TAppointments>({
  id: Number,
  doctorId: Number,
  date: Date,
  serial: Number,
});

const medicalHistory = new Schema<TMedicalHistory>({
  date: String,
  diagonosis: String,
  medications: [String],
  doctor: doctorSchema,
});

const patientSchema = new Schema<TPatient>({
  userId: {
    type: String,
    required: [true, "User id is required!"],
    unique: true,
  },
  user_Id: {
    type: Schema.Types.ObjectId,
    required: [true, "User id is required!"],
    ref: "Users",
    unique: true,
  },
  medicalHistory: [medicalHistory],
  appointments: [appointmentSchema],
  billing: Number,
  contactNumber: {
    type: String,
    required: [true, "Required a contact numnber!"],
  },
  emergencyContact: String,
  insuranceInfo: String,
  presentAddress: String,
  permanentAddress: String,
  guardian: guardianSchema,
  DOF: Date,
  gender: String,
  currentMedicalDepartment: String,
});

export const Patient = model<TPatient>("Patients", patientSchema);
