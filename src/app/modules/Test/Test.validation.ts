import { z } from "zod";

const TestValidation = z.object({
  testName: z
    .string()
    .min(3, { message: "Test name must be at least 3 characters long" }),
  testDetails: z
    .string()
    .min(10, { message: "Test details must be at least 10 characters long" }),
  associatedServices: z.array(z.string()),
  machineDetails: z.object({
    machineName: z.string(),
    machineModel: z.string(),
    manufacturer: z.string(),
    yearOfManufacture: z
      .number()
      .min(1900, { message: "Invalid year of manufacture" }),
  }),
  benefits: z.array(z.string()),
  patientCount: z
    .number()
    .int()
    .min(0, { message: "Patient count must be a non-negative integer" }),
  responsibleDoctor: z.string(),
  cost: z
    .number()
    .min(0, { message: "Cost must be a non-negative number" })
    .default(0),
});

export default TestValidation;
