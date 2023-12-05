/* eslint-disable @typescript-eslint/no-explicit-any */

import { TDepartment } from "../department/department.interface";
import Department from "../department/department.mode";
import { TLaboratory } from "../labratory/labratory.interface";
import Laboratory from "../labratory/labrotory.model";

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

export const adminServices = { createDepartment, createLabratory };
