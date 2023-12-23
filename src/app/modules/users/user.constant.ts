import { Admin } from "../admin/admin.mode";
import { Doctor } from "../doctors/doctors.model";
import Nurse from "../nurse/nurse.model";
import { Patient } from "../patients/patient.model";
import Staff from "../staff/staff.model";

export const roleBasedModel = {
  admin: Admin,
  staff: Staff,
  patient: Patient,
  doctor: Doctor,
  nurse: Nurse,
};
