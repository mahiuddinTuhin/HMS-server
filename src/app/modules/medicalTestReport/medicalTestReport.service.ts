/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

const medicalTestReportService = {
  findMedicalTestReportById,
};

export default medicalTestReportService;
