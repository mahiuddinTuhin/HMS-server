import { Types } from "mongoose";
import { TEducation, TSchedule } from "../../interfaces/TCommon.interface";

export type TDoctor = {
  user: Types.ObjectId;
  id: string;
  department: Types.ObjectId;
  schedule: TSchedule[];
  allMedicalHistory: Types.ObjectId[];
  pendingAppointments: Types.ObjectId[];
  license_info: string[];
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
  date_of_birth: string;
  gender: string;
  profile_image: string;
};
