import { z } from "zod";

/*
 * medical department validation with zod
 */
const DepartmentValidation = z.object({
  body: z.object({
    departmentName: z
      .string({
        required_error: "Department Name is required",
        invalid_type_error: "Department Name must be a string",
      })
      .min(3),

    departmentDetails: z
      .string({
        required_error: "Detail of department is required",
        invalid_type_error: "Detail of department must be a string",
      })
      .min(20),

    specializations: z.array(z.string().optional()).optional(),

    medicalLicense: z.array(
      z
        .string({
          required_error: "Licences is required",
          invalid_type_error: "Licences must be a string",
        })
        .min(10),
    ),
    medicalHistory: z.array(z.string().optional()).optional(),

    contact: z.object({
      email: z.array(z.string()),
      phone: z.array(z.string()),
      address: z.array(z.string()),
    }),
    isDeleted: z.boolean().default(false),
  }),
});

export default DepartmentValidation;
