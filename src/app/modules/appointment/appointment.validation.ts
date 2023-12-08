import { ObjectId } from "mongodb";
import { z } from "zod";

const appointmentValidation = z.object({
  id: z.string({
    required_error: "Appointment id is required!",
    invalid_type_error: "Appointment id must be a string",
  }),
  doctor: z.instanceof(ObjectId),
  patient: z.instanceof(ObjectId),
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
  date: z.string({
    required_error: "Date id is required!",
    invalid_type_error: "Date id must be a string",
  }),
  isClosed: z.boolean().default(false),
});

export default appointmentValidation;
