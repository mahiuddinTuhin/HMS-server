/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from "http-status-codes";
import AppError from "../../util/customError";
import { TDepartment } from "../department/department.interface";
import Department from "../department/department.mode";
import { TLaboratory } from "../labratory/labratory.interface";
import Laboratory from "../labratory/labrotory.model";

/* creating department */
const createDepartment = async (data: TDepartment) => {
  try {
    const newDepartment: any = await Department.create(data);
    if (!newDepartment) {
      throw new AppError(
        "Creating department failed! from data model.",
        StatusCodes.BAD_REQUEST,
      );
    }
    return newDepartment;
  } catch (error) {
    throw new AppError(
      `Creating department failed from services!: ${error}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

/* creating labratory */
const createLabratory = async (data: TLaboratory) => {
  try {
    const newLabratory: any = await Laboratory.create(data);
    if (!newLabratory) {
      throw new AppError(
        "Creating department failed! from data model.",
        StatusCodes.BAD_REQUEST,
      );
    }
    return newLabratory;
  } catch (error) {
    throw new AppError(
      `Creating department failed from services!: ${error}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

export const adminServices = { createDepartment, createLabratory };
