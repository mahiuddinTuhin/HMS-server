import { Schema, model } from "mongoose";
import { utilsSchema } from "../../schema/CommonSchema";
import { TPatient } from "./patient.interface";

const patientSchema = new Schema<TPatient>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User _id is required!"],
      unique: true,
      ref: "User",
    },
    id: {
      type: String,
      required: [true, "Id is required!"],
    },

    allMedicalHistory: [
      {
        type: String,
        ref: "MedicalHistory",
        // unique: true,
      },
    ],

    pendingAppointments: [
      {
        date: {
          type: String,
        },
        time: {
          type: String,
        },
      },
    ],
    allAppointmentHistory: [
      {
        type: String,
        ref: "Appointment",
        // unique: true,
      },
    ],
    allDiagnosis: [
      {
        type: String,
        ref: "Diagnosis",
        unique: true,
      },
    ],
    isAdmitted: {
      type: Boolean,
      default: false,
    },
    currentMedicalDepartment: {
      type: String,
      ref: "Department",
      unique: true,
    },

    bills: Number,

    contactNumber: String,

    emergencyContact: String,

    insuranceInfo: String,

    guardian: utilsSchema.patientGuardianSchema,
  },
  {
    timestamps: true,
  },
);

export const Patient = model<TPatient>("Patients", patientSchema);
