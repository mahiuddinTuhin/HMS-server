import { ObjectId } from "mongodb";
import { z } from "zod";

const diagnosisValidation = z.object({
  id: z.string({
    required_error: "Diagnosis id is required!",
    invalid_type_error: "Diagnosis id must be a string",
  }),
  patient: z.instanceof(ObjectId),
  doctor: z.instanceof(ObjectId),
  labStaff: z.instanceof(ObjectId),
  diagnosisName: z.string({
    required_error: "Diagnosis name is required!",
    invalid_type_error: "Diagnosis name must be a string",
  }),
  diagnosisDetails: z.string({
    required_error: "Diagnosis details is required!",
    invalid_type_error: "Diagnosis details must be a string",
  }),
  charge: z.number({
    required_error: "Charge amount is required!",
    invalid_type_error: "Charge amount must be a number",
  }),
  isPaid: z.boolean().default(false),
  testTime: z.string({
    required_error: "Test time is required!",
    invalid_type_error: "Test time must be a string",
  }),
  reportTime: z.string().optional(),
});

export default diagnosisValidation;
