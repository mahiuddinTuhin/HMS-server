import { Types } from "mongoose";
import { TEducation } from "../../interfaces/TCommon.interface";

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
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
};
