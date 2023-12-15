import Department from "./department.model";

const findAllDepartment = async () => {
  /* query for all department */

  const allDepartment = await Department.find(
    {},
    { _id: 1, id: 1, departmentName: 1 },
  );
  return allDepartment;
};

const departmentService = {
  findAllDepartment,
};

export default departmentService;
