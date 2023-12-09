import { z } from "zod";

export const medicalValidation = z.object({
  doctorId: z.string({
    required_error: "doctorId is required",
    invalid_type_error: "doctorId must be a string",
  }),
  patientId: z.string({
    required_error: "patientId is required",
    invalid_type_error: "patientId must be a string",
  }),
  diagnosis: z.array(z.string()).min(1, "Diagnosis array cannot be empty"),
  medications: z.array(z.string()).min(1, "Medications array cannot be empty"),
  releasedOn: z.string({
    required_error: "releasedOn is required",
    invalid_type_error: "releasedOn must be a string",
  }),
  bill: z.number({
    required_error: "Bill is required",
    invalid_type_error: "Bill must be a number",
  }),
});
