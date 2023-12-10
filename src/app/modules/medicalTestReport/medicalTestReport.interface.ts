import { Types } from "mongoose";

export type TmedicalTestReport = {
  id: string;
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  name: string;
  details: string;
  charge: number;
  isPaid: boolean;
  reports: object[];
  summary: string;
  equipments: string[];
  staff: Types.ObjectId;
  contactInfo: string;
  reportAvailableDate: string;
  isDeleted: boolean;
};
