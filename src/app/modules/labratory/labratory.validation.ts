import mongoose from "mongoose";
import { z } from "zod";

const LaboratoryValidation = z.object({
  labName: z
    .string({
      required_error: "Lab name is required!",
      invalid_type_error: "Lab name must be a string",
    })
    .min(4, "Lab name should be 4 Character long."),
  equipments: z
    .array(
      z
        .string({
          required_error: "equipments name is required!",
          invalid_type_error: "equipments name must be a string",
        })
        .min(4, "Equipments name should be 4 Character long."),
    )
    .min(1, "Minimum 1 Equipments should be included.!"),
  allStaff: z
    .array(
      z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId",
      }),
    )
    .optional(),
  testsOffers: z
    .array(z.string().min(4, "testsOffers name should be 4 Character long."))
    .min(1, "Minimum 1 testsOffers should be included.!"),
  contactInfo: z.string().min(10, "Contact info should be 10 Character long.!"),
  allDiagnosisHistory: z
    .array(
      z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId",
      }),
    )
    .optional(),
});

export default LaboratoryValidation;
