import { z } from "zod";

const DoctorValidation = z.object({
  body: z.object({
    id: z
      .string({
        required_error: "Doctor ID is required",
        invalid_type_error: "Doctor ID must be a string",
      })
      .optional(),
    user: z.string().optional(),
    department: z.string(),
    schedules: z.array(z.string()).optional(),
    allMedicalHistory: z.array(z.string()).optional(),
    pendingAppointments: z.array(z.string()).optional(),
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

    education: z
      .array(z.object({}))
      .min(1, "At least one education entry is required"),
    fullName: z.object({
      firstName: z
        .string({
          required_error: "First name is required",
          invalid_type_error: "First name must be a string",
        })
        .min(3, "First name should be minimum 3 character long!"),
      middleName: z
        .string({
          required_error: "Middle name is required",
          invalid_type_error: "Middle name must be a string",
        })
        .min(3, "Middle name should be minimum 3 character long!")
        .optional(),
      lastName: z
        .string({
          required_error: "Last name is required",
          invalid_type_error: "Last name must be a string",
        })
        .min(3, "Last name should be minimum 3 character long!"),
    }),
    address: z.object({
      presentAddress: z
        .string({
          required_error: "Present address is required",
          invalid_type_error: "Present address must be a string",
        })
        .min(5, "Present address should be minimum 5 character long!"),
      permanentAddress: z
        .string({
          required_error: "Permanent address is required",
          invalid_type_error: "Permanent address must be a string",
        })
        .min(5, "Permanent address should be minimum 5 character long!"),
    }),
    dateOfBirth: z
      .string({
        required_error: "Date of birth is required",
        invalid_type_error: "Date of birth must be a string",
      })
      .min(6, "Date of birth should be minimum 5 character long!"),
    gender: z
      .string({
        required_error: "Gender is required",
        invalid_type_error: "Gender must be a string",
      })
      .min(4, "Gender should be minimum 4 character long!"),
    profileImage: z
      .string({
        required_error: "Profile image URL is required",
        invalid_type_error: "Profile image URL must be a string",
      })
      .min(5, "Profile image URL should be minimum 5 character long!")
      .optional(),
    license_info: z.string({
      required_error: "license_info is required",
      invalid_type_error: "license_info must be a string",
    }),
  }),
});

export default DoctorValidation;
