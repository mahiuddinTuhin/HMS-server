import { z } from "zod";

export const medicalValidation = z.object({
  body: z.object({
    doctorId: z.string({
      required_error: "doctorId is required",
      invalid_type_error: "doctorId must be a string",
    }),

    patientId: z.string({
      required_error: "patientId is required",
      invalid_type_error: "patientId must be a string",
    }),

    diagnosis: z.array(z.string().optional()).optional(),

    medications: z
      .array(
        z
          .object({
            date: z.date(),
            medications: z.array(z.string()),
          })
          .optional(),
      )
      .optional(),

    releasedOn: z
      .string({
        required_error: "releasedOn is required",
        invalid_type_error: "releasedOn must be a string",
      })
      .optional(),

    bill: z
      .number({
        required_error: "Bill is required",
        invalid_type_error: "Bill must be a number",
      })
      .optional(),
  }),
});
