import { ObjectId } from "mongodb";
import { z } from "zod";

const NurseValidation = z.object({
  user: z.instanceof(ObjectId),
  id: z.string({
    required_error: "Nurse ID is required",
    invalid_type_error: "Nurse ID must be a string",
  }),
  shift: z.enum(["day", "night"]),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .min(1, "Email is required")
    .email(),
  phone: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    })
    .min(1, "Phone number is required"),
  // .refine(phonePattern, "Invalid phone number format"),
  education: z
    .array(z.object({}))
    .min(1, "At least one education entry is required"),
  fullName: z.object({
    firstName: z
      .string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string",
      })
      .min(1, "First name is required"),
    middleName: z
      .string({
        required_error: "Middle name is required",
        invalid_type_error: "Middle name must be a string",
      })
      .min(1, "Middle name is required"),
    lastName: z
      .string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
      })
      .min(1, "Last name is required"),
  }),
  address: z.object({
    presentAddress: z
      .string({
        required_error: "Present address is required",
        invalid_type_error: "Present address must be a string",
      })
      .min(1, "Present address is required"),
    permanentAddress: z
      .string({
        required_error: "Permanent address is required",
        invalid_type_error: "Permanent address must be a string",
      })
      .min(1, "Permanent address is required"),
  }),
  dateOfBirth: z
    .string({
      required_error: "Date of birth is required",
      invalid_type_error: "Date of birth must be a string",
    })
    .min(1, "Date of birth is required"),
  // .refine(birthDatePattern, "Invalid date format (YYYY-MM-DD)"),
  gender: z
    .string({
      required_error: "Gender is required",
      invalid_type_error: "Gender must be a string",
    })
    .min(1, "Gender is required"),
  profileImage: z
    .string({
      required_error: "Profile image URL is required",
      invalid_type_error: "Profile image URL must be a string",
    })
    .min(1, "Profile image URL is required"),
});

export default NurseValidation;
