/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import AppError from "../../util/customError";
import { TDiagnosis } from "../diagnosis/diagnosis.interface";
import { Diagnosis } from "../diagnosis/diagnosis.model";

/* creating an appointment by doctor */
const createDiagnosis = async (data: TDiagnosis) => {
  try {
    const newDiagnosis: any = await Diagnosis.create(data);
    if (!newDiagnosis) {
      throw new AppError(
        "Creating diagnosis failed! from staff services.",
        StatusCodes.BAD_REQUEST,
      );
    }
    return newDiagnosis;
  } catch (error) {
    throw new AppError(
      `Creating diagnosis failed from staff services!: ${error}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

export const staffServices = {
  createDiagnosis,
};
