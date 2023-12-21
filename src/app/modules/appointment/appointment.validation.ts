import { z } from "zod";
import { dateRegex } from "../../constant/common";

const appointmentValidation = z.object({
  id: z
    .string({
      required_error: "Appointment id is required!",
      invalid_type_error: "Appointment id must be a string",
    })
    .optional(),
  doctor: z.string(),
  patient: z.string(),
  isPaid: z.boolean().default(false),
  time: z.enum(
    [
      "9:00am",
      "9:30am",
      "10:00am",
      "10:30am",
      "11:00am",
      "11:30am",
      "12:00pm",
      "12:30pm",
      "2:00pm",
      "2:30pm",
      "3:00pm",
      "3:30pm",
      "4:00pm",
      "4:30pm",
      "5:00pm",
      "5:30pm",
    ],
    {
      required_error: "Schedule is required!",
      invalid_type_error:
        "Invalid schedule. Please enter any one of the following times: 9:00am, 9:30am, 10:00am, 10:30am, 11:00am, 11:30am, 12:00pm, 12:30pm, 2:00pm, 2:30pm, 3:00pm, 3:30pm, 4:00pm, 4:30pm, 5:00pm, 5:30pm",
    },
  ),
  // yyyy-mm-dd
  date: z
    .string({
      required_error: "Date id is required!",
      invalid_type_error: "Date id must be a string",
    })
    .refine(
      (value) => {
        console.log(dateRegex.test(value));
        return dateRegex.test(value);
      },
      (value) => ({
        message: `The date ${value} is note accepted. use yyyy-mm-dd and year should be greater or equal current year and month(01-12), day(01-31)`,
      }),
    ),
  isClosed: z.boolean().default(false),
  isCompleted: z.boolean().default(false),
});

export default appointmentValidation;
