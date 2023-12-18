import { Types } from "mongoose";
import { TContact } from "../../interfaces/TCommon.interface";

/*
 *    interface for medical department with all detail information
 */

type TDepartment = {
  id: string;
  departmentName: string;
  departmentDetails: string;
  specializations: Types.ObjectId[];
  medicalHistory?: Types.ObjectId[];
  doctors: Types.ObjectId[];
  contact: TContact;
  /*
   type TContact = {
    phone: string[];
    email: string[];
    address: string[];
}
  */
  medicalLicense: string[];
  isDeleted: true | false;
};

export default TDepartment;
