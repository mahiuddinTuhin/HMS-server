/* eslint-disable @typescript-eslint/no-explicit-any */

import FindQueryBuilder from "../../builder/FindQueryBuilder";
import AppError from "../../errors/customError";
import generateServiceId from "../../utils/generateServiceId";
import { TDepartment } from "../department/department.interface";
import Department from "../department/department.mode";
import { TMedicalTest } from "../medicalTest/medicalTest.interface";
import { MedicalTest } from "../medicalTest/medicalTest.model";
import { nonPatientSearchableField } from "./admin.constant";
import { Admin } from "./admin.mode";

/* creating department */
const createDepartment = async (data: TDepartment) => {
  try {
    data.id = (await generateServiceId(Department)) || `Dep001`;

    const newDepartment: any = await Department.create(data);

    return newDepartment;
  } catch (error) {
    throw new AppError("Failed to create department by admin!", 400);
  }
};

/* creating labratory */
const createLabratory = async (data: TMedicalTest) => {
  try {
    data.id = (await generateServiceId(MedicalTest)) || `Lab001.01`;
    const newLabratory: any = await MedicalTest.create(data);
    return newLabratory;
  } catch (error) {
    throw new AppError("Failed to create new Lab data!", 400);
  }
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
