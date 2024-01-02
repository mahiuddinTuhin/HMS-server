import { RequestHandler } from "express";
import { responseToRequest } from "../../utils/ResponseToServer";
import catchAsync from "../../utils/catchAsync";
import departmentService from "./medicalTestReport.service";

const findAllDepartment: RequestHandler = catchAsync(async (req, res) => {
  const allDepartment = await departmentService.findAllDepartment();
  responseToRequest(res, {
    success: true,
    status: 200,
    message: "Successfully retrieved all department.",
    data: allDepartment,
  });
});

const findDepartmentById: RequestHandler = catchAsync(async (req, res) => {
  const id: string = req.params?.depId;
  const department = await departmentService.findDepartmentById(id);
  responseToRequest(res, {
    success: true,
    status: 200,
    message: "Successfully retrieved department.",
    data: department,
  });
});

const findAllSpecializations: RequestHandler = catchAsync(async (req, res) => {
  const allSpecializations = await departmentService.findAllSpecializatios();

  responseToRequest(res, {
    success: true,
    status: 200,
    message: "Successfully retrieved all specializations.",
    data: allSpecializations,
  });
});

const findSpecializationById: RequestHandler = catchAsync(async (req, res) => {
  const id: string = req?.params?.specializationId;
  const SpecializationById = await departmentService.findSpecializatioById(id);

  responseToRequest(res, {
    success: true,
    status: 200,
    message: "Successfully retrieved specialization by id.",
    data: SpecializationById,
  });
});

const findAllProblems: RequestHandler = catchAsync(async (req, res) => {
  const AllProblems = await departmentService.findAllProblems();

  responseToRequest(res, {
    success: true,
    status: 200,
    message: "Successfully retrieved all problems.",
    data: AllProblems,
  });
});

const findAllSymptoms: RequestHandler = catchAsync(async (req, res) => {
  const AllSymptoms = await departmentService.findAllSymptoms();

  responseToRequest(res, {
    success: true,
    status: 200,
    message: "Successfully retrieved all problems.",
    data: AllSymptoms,
  });
});

const medicalTestReportController = {
  findAllDepartment,
  findAllSpecializations,
  findDepartmentById,
  findSpecializationById,
  findAllProblems,
  findAllSymptoms,
};

export default medicalTestReportController;
