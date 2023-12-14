import Department from "./department.model";

const findAllDepartment = async () => {
  /* query for all department */

  const allDepartment = await Department.find();
  return allDepartment;
};

const departmentService = {
  findAllDepartment,
};

export default departmentService;
