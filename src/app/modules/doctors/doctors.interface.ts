import mongoose from "mongoose";
import { TEducation } from "../../interfaces/TCommon.interface";

export type TDoctor = {
  id: string;
  user: mongoose.Types.ObjectId;
  department: mongoose.Types.ObjectId;
  schedules: string[];
  allMedicalHistory: mongoose.Types.ObjectId[];
  pendingAppointments: mongoose.Types.ObjectId[];
  email: string;
  phone: string;
  education: TEducation[];
  fullName: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  address: {
    presentAddress: string;
    permanentAddress: string;
  };
  dateOfBirth: string;
  gender: string;
  profileImage: string;
  license_info: string;
  createdAt: Date;
  updatedAt: Date;
};
