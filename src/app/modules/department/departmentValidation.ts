import { z } from "zod";

const DepartmentValidation = z.object({
  departmentName: z
    .string({
      required_error: "Department Name is required",
      invalid_type_error: "Department Name must be a string",
    })
    .min(3),
  details: z
    .string({
      required_error: "Detail of department is required",
      invalid_type_error: "Detail of department must be a string",
    })
    .min(20),
  allDoctors: z.array(z.string().optional()),
  licences: z
    .string({
      required_error: "Licences is required",
      invalid_type_error: "Licences must be a string",
    })
    .min(10),
  allMedicalHistory: z.array(z.string().optional()),
});

export default DepartmentValidation;
