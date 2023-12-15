import Department from "./department.model";

const findAllDepartment = async () => {
  /* query for all department */

  const allDepartment = await Department.find(
    { isDeleted: false },
    { _id: 1, id: 1, departmentName: 1 },
  );
  return allDepartment;
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
};

export default departmentService;
