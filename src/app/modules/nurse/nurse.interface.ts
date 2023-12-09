import { Types } from "mongoose";
import { TEducation } from "../../interfaces/TCommon.interface";

export type TNurse = {
  user: Types.ObjectId;
  id: string;
  shift: "day" | "night";
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
  isDeleted: boolean;
};
