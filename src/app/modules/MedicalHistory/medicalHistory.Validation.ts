import { z } from "zod";

export const medicalValidation = z.object({
  body: z.object({
    doctor: z.string({
      required_error: "doctorId is required",
      invalid_type_error: "doctorId must be a string",
    }),

    patient: z.string({
      required_error: "patientId is required",
      invalid_type_error: "patientId must be a string",
    }),

    MedicalTestReport: z.array(z.string().optional()).optional(),

    allMedications: z.array(z.string().optional()),

    bill: z
      .number({
        required_error: "Bill is required",
        invalid_type_error: "Bill must be a number",
      })
      .optional(),
  }),
});
