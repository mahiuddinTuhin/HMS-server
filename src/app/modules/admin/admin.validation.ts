import { z } from "zod";
import { utilsValidation } from "../../validation/Common.Validation";

// Define Zod schemas for the different parts of the Admin schema

// Define the Admin schema using Zod
export const AdminValidation = z.object({
  contactInfo: utilsValidation.contactValidation,

  education: utilsValidation.educationValidation,

  personalInfo: utilsValidation.personalInfoValidation,
});
