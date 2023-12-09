import { z } from "zod";

const medicalTestValidation = z.object({
  id: z.string({
    required_error: "Medical Test Id is required",
    invalid_type_error: "Medical Test Id must be a string",
  }),
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  details: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  charge: z.number({
    required_error: "Charge is required",
    invalid_type_error: "Charge must be a number",
  }),
  isPaid: z.boolean().default(true),
  reports: z
    .array(z.object({}))
    .min(1, "Reports array cannot be empty")
    .optional(),
  summary: z
    .string({
      required_error: "Summary is required",
      invalid_type_error: "Summary must be a string",
    })
    .optional(),
  equipments: z.array(z.string()).min(1, "Equipments array cannot be empty"),
  doctor: z.string(),
  staff: z.string(),
  reportAvailableDate: z.string({
    required_error: "Report Available date is required",
    invalid_type_error: "Report Available date must be a string",
  }),
});

export default medicalTestValidation;
