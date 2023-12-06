/* eslint-disable @typescript-eslint/no-explicit-any */

import FindQueryBuilder from "../../app/builder/FindQueryBuilder";
import { TDepartment } from "../department/department.interface";
import Department from "../department/department.mode";
import { TLaboratory } from "../labratory/labratory.interface";
import Laboratory from "../labratory/labrotory.model";
import { nonPatientSearchableField } from "./admin.constant";
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

const findAllAdmin = async (query: any) => {
  /* query for all admin */

  const adminQuery = new FindQueryBuilder(Admin.find(), query)
    .populate("user")
    .search(nonPatientSearchableField)
    .filter()
    .sort()
    .pagination()
    .limit()
    .fields();

  const result = await adminQuery?.modelQuery;
  return result;
};

export const adminServices = {
  createDepartment,
  createLabratory,
  findAllAdmin,
};
