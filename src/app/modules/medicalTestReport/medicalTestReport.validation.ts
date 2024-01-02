import { z } from "zod";

const medicalTestReportValidation = z.object({
  body: z.object({
    id: z
      .string({
        required_error: "Medical Test Id is required",
        invalid_type_error: "Medical Test Id must be a string",
      })
      .optional(),
    isPaid: z.boolean().default(true),
    reports: z
      .array(z.object({}))
      .min(1, "Reports array cannot be empty")
      .optional(),
    summary: z
      .string({
        required_error: "Summary is required",
        invalid_type_error: "Summary must be a string",
      })
      .optional(),

    test: z.string({
      required_error: "Test id is required",
      invalid_type_error: "Test id must be a string",
    }),
    reportAvailableDate: z.string({
      required_error: "Report Available date is required",
      invalid_type_error: "Report Available date must be a string",
    }),
  }),
});

export default medicalTestReportValidation;
