import FindQueryBuilder from "../../builder/FindQueryBuilder";
import AppError from "../../errors/customError";
import generateServiceId from "../../utils/generateServiceId";
import TTest from "../Test/Test.interface";
import Department from "../department/department.model";

import mongoose, { Types } from "mongoose";
import Test from "../Test/Test.model";
import TDepartment from "../department/department.interface";
import { TmedicalTestReport } from "../medicalTestReport/medicalTestReport.interface";
import { MedicalTestReport } from "../medicalTestReport/medicalTestReport.model";
import { TMedicalSpecializations } from "../specializations/specializations.interface";
import Specialization from "../specializations/specializations.model";
import { nonPatientSearchableField } from "./admin.constant";
import { Admin } from "./admin.mode";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @creating_department
 */
const createDepartment = async (payload: TDepartment) => {
  payload.id = await generateServiceId(Department);

  const newDepartment: any = await Department.create(payload);

  return newDepartment;
};

/**
 * @creating_medical_test
 */

const createTest = async (payload: TTest) => {
  try {
    payload.id = await generateServiceId(Test);

    const newTest: any = await Test.create(payload);
    return newTest;
  } catch (error: any) {
    throw new AppError("Failed to create new Test service!", 400);
  }
};

/**
 * @creating_medical_test_report
 */

const createTestReport = async (payload: TmedicalTestReport) => {
  try {
    payload.id = await generateServiceId(MedicalTestReport);

    const newTestReport: any = await MedicalTestReport.create(payload);
    return newTestReport;
  } catch (error: any) {
    throw new AppError("Failed to create new Test report!", 400);
  }
};

/**
 * @creating_specialization
 */

const createSpecialization = async (payload: TMedicalSpecializations[]) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newSpecializations: any = await Promise.all(
      payload?.map(async (data) => {
        data.id = await generateServiceId(Specialization);

        const specialization = await Specialization.create([data], {
          session,
        });
        return specialization[0];
      }),
    );

    // updating department for mupltiple specialization
    if (newSpecializations) {
      await Promise.all(
        newSpecializations?.map(async (spec: TMedicalSpecializations) => {
          const departmentId = new Types.ObjectId(spec?.department);
          console.log({ departmentId });
          await Department.findByIdAndUpdate(
            {
              _id: departmentId,
            },
            {
              $push: {
                specializations: spec?._id,
              },
            },
            {
              session,
            },
          );
        }),
      );
    }

    await session.commitTransaction();
    session.endSession();

    return newSpecializations;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(error?.message, 400);
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
  createTest,
  findAllAdmin,
  createSpecialization,
  createTestReport,
};
