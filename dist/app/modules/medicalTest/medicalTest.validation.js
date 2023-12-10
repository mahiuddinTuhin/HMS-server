"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const medicalTestReportValidation = zod_1.z.object({
  id: zod_1.z.string({
    required_error: "Medical Test Id is required",
    invalid_type_error: "Medical Test Id must be a string",
  }),
  name: zod_1.z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  details: zod_1.z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  charge: zod_1.z.number({
    required_error: "Charge is required",
    invalid_type_error: "Charge must be a number",
  }),
  isPaid: zod_1.z.boolean().default(true),
  reports: zod_1.z
    .array(zod_1.z.object({}))
    .min(1, "Reports array cannot be empty")
    .optional(),
  summary: zod_1.z
    .string({
      required_error: "Summary is required",
      invalid_type_error: "Summary must be a string",
    })
    .optional(),
  equipments: zod_1.z
    .array(zod_1.z.string())
    .min(1, "Equipments array cannot be empty"),
  doctor: zod_1.z.string(),
  staff: zod_1.z.string(),
  reportAvailableDate: zod_1.z.string({
    required_error: "Report Available date is required",
    invalid_type_error: "Report Available date must be a string",
  }),
});
exports.default = medicalTestReportValidation;
