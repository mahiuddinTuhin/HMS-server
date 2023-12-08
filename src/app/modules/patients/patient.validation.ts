import { ObjectId } from "mongodb";
import { z } from "zod";

export const patientValidation = z.object({
  user: z.instanceof(ObjectId).refine((value) => value !== null, {
    message: "User ID is required",
  }),
  id: z.string().refine((value) => value !== null, {
    message: "ID is required",
  }),
  allMedicalHistory: z.array(z.instanceof(ObjectId)).optional(),

  pendingAppointments: z
    .array(
      z.object({
        doctor: z.instanceof(ObjectId).refine((value) => value !== null, {
          message: "Doctor ID is required",
        }),
        date: z.string().refine((value) => value !== null, {
          message: "Date is required",
        }),
        time: z.string().refine((value) => value !== null, {
          message: "Time is required",
        }),
      }),
    )
    .optional(),

  allAppointmentHistory: z
    .array(
      z.object({
        doctor: z.instanceof(ObjectId).refine((value) => value !== null, {
          message: "Doctor ID is required",
        }),
        date: z.string().refine((value) => value !== null, {
          message: "Date is required",
        }),
        time: z.string().refine((value) => value !== null, {
          message: "Time is required",
        }),
      }),
    )
    .optional(),

  allDiagnosis: z
    .array(z.instanceof(ObjectId))
    .refine((value) => value !== null, {
      message: "All diagnosis is required",
    })
    .optional(),

  isAdmitted: z.boolean().default(false),

  currentMedicalDepartment: z
    .instanceof(ObjectId)
    .refine((value) => value !== null, {
      message: "Current medical department is required",
    }),

  bills: z
    .number()
    .default(0)
    .refine((value) => value !== null, {
      message: "Bills is required",
    }),

  contactNumber: z
    .string()
    .refine((value) => value !== null, {
      message: "Contact number is required",
    })
    .optional(),

  emergencyContact: z
    .string()
    .refine((value) => value !== null, {
      message: "Emergency contact is required",
    })
    .optional(),

  insuranceInfo: z
    .string()
    .refine((value) => value !== null, {
      message: "Insurance info is required",
    })
    .optional(),

  guardian: z
    .string()
    .refine((value) => value !== null, {
      message: "Emergency contact is required",
    })
    .optional(),
});
