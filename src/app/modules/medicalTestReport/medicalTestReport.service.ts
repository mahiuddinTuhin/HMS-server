/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Types } from "mongoose";
import { MedicalTestReport } from "./medicalTestReport.model";

/*
 * query for  find medical test report by id
 */
const findMedicalTestReportById: any = async (id: string) => {
  const testReport = await MedicalTestReport.findById(id)
    .populate({ path: "patient", select: "_id id email phone status" })
    .exec();

  return testReport;
};

const findAllTestReportByUserId: any = async (id: string) => {
  const testReports = await MedicalTestReport.find({
    patient: new Types.ObjectId(id),
  })
    .populate({ path: "patient", select: "_id id email phone status" })
    .exec();

  return testReports;
};

const medicalTestReportService = {
  findMedicalTestReportById,
  findAllTestReportByUserId,
};

export default medicalTestReportService;
