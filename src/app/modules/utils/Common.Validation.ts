import { z } from "zod";

const contactValidation = z.object({
  homeMobile: z.string().min(11),
  officeMobile: z.string().min(11),
  email: z.string().email(),
});

const educationValidation = z.object({
  institute: z.string().min(3),
  degree: z.string().min(3),
  year: z.number().int(),
});

const personalInfoValidation = z.object({
  address: z.object({
    present_address: z.string().min(10),
    permanent_address: z.string().min(10),
  }),
  fullName: z.object({
    firstName: z.string().min(3),
    middleName: z.string().optional(),
    lastName: z.string().min(3),
  }),
  date_of_birth: z.string().min(6),
  gender: z.string().min(4),
  profile_image: z.string().min(5),
});

export const utilsValidation = {
  contactValidation,
  educationValidation,
  personalInfoValidation,
};
