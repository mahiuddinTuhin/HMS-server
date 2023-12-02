/* eslint-disable @typescript-eslint/no-explicit-any */
/* creating department */

import { StatusCodes } from "http-status-codes";
import AppError from "../../util/customError";
import { TDepartment } from "../department/department.interface";
import Department from "../department/department.mode";

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

export const adminServices = { createDepartment };
