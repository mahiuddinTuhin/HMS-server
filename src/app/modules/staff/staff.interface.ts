import { Types } from "mongoose";
import { TEducation } from "../../interfaces/TCommon.interface";

export type TStaff = {
  user: Types.ObjectId;
  id: string;
  shift: "day" | "night";
  education: TEducation[];
  email: string;
  phone: string;
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
