import { z } from "zod";

const staffValidation = z.object({
  body: z.object({
    user: z.string().optional(),
    id: z
      .string({
        required_error: "ID is required",
        invalid_type_error: "ID must be a string",
      })
      .optional(),
    shift: z.enum(["day", "night"], {
      required_error: "Shift is required",
      invalid_type_error: "Shift must be 'day' or 'night'",
    }),
    education: z.array(z.object({})),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email(),
    phone: z.string({
      required_error: "Phone is required",
      invalid_type_error: "Phone must be a string",
    }),
    fullName: z.object({
      firstName: z.string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string",
      }),
      middleName: z
        .string({
          required_error: "Middle name is required",
          invalid_type_error: "Middle name must be a string",
        })
        .optional(),
      lastName: z.string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
      }),
    }),
    address: z.object({
      presentAddress: z.string({
        required_error: "Present address is required",
        invalid_type_error: "Present address must be a string",
      }),
      permanentAddress: z.string({
        required_error: "Permanent address is required",
        invalid_type_error: "Permanent address must be a string",
      }),
    }),
    dateOfBirth: z.string({
      required_error: "Date of birth is required",
      invalid_type_error: "Date of birth must be a string",
    }),
    gender: z.string({
      required_error: "Gender is required",
      invalid_type_error: "Gender must be a string",
    }),
    profileImage: z
      .string({
        required_error: "Profile image is required",
        invalid_type_error: "Profile image must be a string",
      })
      .optional(),
  }),
});

export default staffValidation;
