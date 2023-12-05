/* eslint-disable @typescript-eslint/no-explicit-any */

import { TDepartment } from "../department/department.interface";
import Department from "../department/department.mode";
import { TLaboratory } from "../labratory/labratory.interface";
import Laboratory from "../labratory/labrotory.model";
import { Admin } from "./admin.mode";

/* creating department */
const createDepartment = async (data: TDepartment) => {
  const newDepartment: any = await Department.create(data);
  return newDepartment;
};

/* creating labratory */
const createLabratory = async (data: TLaboratory) => {
  const newLabratory: any = await Laboratory.create(data);
  return newLabratory;
};

/**
 * @find_all_admin service
 */

const findAllAdmin = async () => {
  const allAdmin: any = await Admin.find().populate("user");
  return allAdmin;
};

export const adminServices = {
  createDepartment,
  createLabratory,
  findAllAdmin,
};
