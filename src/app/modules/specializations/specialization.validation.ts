/*
 * medical problem validation with zod
 */

import { z } from "zod";

const medicalProblemValidation = z.object({
  problemName: z.string(),

  problemHints: z.string(),

  symptoms: z.array(z.string()),

  supportsFromHospital: z.array(z.string()),

  treatments: z.array(z.string()),
});

/*
 * medical specialization section validation with zod
 */

const specializationsValidation = z.object({
  specializationName: z.string(),

  specializationDetails: z.string(),

  problems: z.array(medicalProblemValidation),
});

export default specializationsValidation;
