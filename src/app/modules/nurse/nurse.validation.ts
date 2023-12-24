import { z } from "zod";

const NurseValidation = z.object({
  body: z.object({
    user: z.string().optional(),
    id: z.string().optional(),
    shift: z.enum(["day", "night"]),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email(),
    phone: z
      .string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number must be a string",
      })
      .min(11, "Phone number should be minimum 11 digit long."),
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
        .min(3, "First name shoulbd be minimum 3 character long!"),
      middleName: z
        .string({
          required_error: "Middle name is required",
          invalid_type_error: "Middle name must be a string",
        })
        .min(3, "Middle name shoulbd be minimum 3 character long!")
        .optional(),
      lastName: z
        .string({
          required_error: "Last name is required",
          invalid_type_error: "Last name must be a string",
        })
        .min(3, "Last name shoulbd be minimum 3 character long!"),
    }),
    address: z.object({
      presentAddress: z
        .string({
          required_error: "Present address is required",
          invalid_type_error: "Present address must be a string",
        })
        .min(5, "Present address shoulbd be minimum 5 character long!"),
      permanentAddress: z
        .string({
          required_error: "Permanent address is required",
          invalid_type_error: "Permanent address must be a string",
        })
        .min(5, "Permanent address shoulbd be minimum 5 character long!"),
    }),
    dateOfBirth: z
      .string({
        required_error: "Date of birth is required",
        invalid_type_error: "Date of birth must be a string",
      })
      .min(6, "Date of birth shoulbd be minimum 5 character long!"),
    // .refine(birthDatePattern, "Invalid date format (YYYY-MM-DD)"),
    gender: z
      .string({
        required_error: "Gender is required",
        invalid_type_error: "Gender must be a string",
      })
      .min(4, "Gender shoulbd be minimum 4 character long!"),
    profileImage: z
      .string({
        required_error: "Profile image URL is required",
        invalid_type_error: "Profile image URL must be a string",
      })
      .min(5, "Profile image URL shoulbd be minimum 5 character long!")
      .optional(),
  }),
});

export default NurseValidation;
