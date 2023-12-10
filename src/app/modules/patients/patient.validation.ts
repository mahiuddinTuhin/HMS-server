import { z } from "zod";

export const patientValidation = z.object({
  user: z
    .string()
    .refine((value) => value !== null, {
      message: "User ID is required",
    })
    .optional(),

  allMedicalHistory: z.array(z.string().optional()).optional(),

  pendingAppointments: z
    .array(
      z
        .object({
          doctor: z.string().refine((value) => value !== null, {
            message: "Doctor ID is required",
          }),
          date: z.string().refine((value) => value !== null, {
            message: "Date is required",
          }),
          time: z.string().refine((value) => value !== null, {
            message: "Time is required",
          }),
        })
        .optional(),
    )
    .optional(),

  allAppointmentHistory: z
    .array(
      z
        .object({
          doctor: z.string().refine((value) => value !== null, {
            message: "Doctor ID is required",
          }),
          date: z.string().refine((value) => value !== null, {
            message: "Date is required",
          }),
          time: z.string().refine((value) => value !== null, {
            message: "Time is required",
          }),
        })
        .optional(),
    )
    .optional(),

  allDiagnosis: z
    .array(z.string().optional())
    .refine((value) => value !== null, {
      message: "All diagnosis is required",
    })
    .optional(),

  isAdmitted: z.boolean().default(false),

  currentMedicalDepartment: z
    .string()
    .refine((value) => value !== null, {
      message: "Current medical department is required",
    })
    .optional(),

  bills: z
    .number()
    .default(0)
    .refine((value) => value !== null, {
      message: "Bills is required",
    }),

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
