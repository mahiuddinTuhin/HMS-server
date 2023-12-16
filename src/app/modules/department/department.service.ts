/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Department from "./department.model";

/* query for all department */
const findAllDepartment = async () => {
  const allDepartment = await Department.find(
    { isDeleted: false },
    {
      _id: 1,
      id: 1,
      departmentName: 1,
      departmentDetails: 1,
    },
  );
  return allDepartment;
};

/* query for all Specializatios */
const findSpecializatios: any = async () => {
  console.log("findSpecializatios");
  const allSpecializatios = await Department.aggregate([
    {
      $unwind: "$specializations",
    },
  ]);
  return allSpecializatios;
};

const findDepartmentById = async (id: string) => {
  /* query for all department */

  const department = await Department.findById(id, {
    medicalHistory: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });
  return department;
};

const departmentService = {
  findAllDepartment,
  findDepartmentById,
  findSpecializatios,
};

export default departmentService;
