"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const common_1 = require("../../constant/common");
const appointmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z
            .string({
            required_error: "Appointment id is required!",
            invalid_type_error: "Appointment id must be a string",
        })
            .optional(),
        doctor: zod_1.z.string(),
        patient: zod_1.z.string(),
        isPaid: zod_1.z.boolean().default(false),
        time: zod_1.z.enum([
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
        ], {
            required_error: "Schedule is required!",
            invalid_type_error: "Invalid schedule. Please enter any one of the following times: 9:00am, 9:30am, 10:00am, 10:30am, 11:00am, 11:30am, 12:00pm, 12:30pm, 2:00pm, 2:30pm, 3:00pm, 3:30pm, 4:00pm, 4:30pm, 5:00pm, 5:30pm",
        }),
        // yyyy-mm-dd
        date: zod_1.z
            .string({
            required_error: "Date id is required!",
            invalid_type_error: "Date id must be a string",
        })
            .refine((value) => {
            console.log(common_1.dateRegex.test(value));
            return common_1.dateRegex.test(value);
        }, (value) => ({
            message: `The date ${value} is note accepted. use yyyy-mm-dd and year should be greater or equal current year and month(01-12), day(01-31)`,
        })),
        isClosed: zod_1.z.boolean().default(false),
        isCompleted: zod_1.z.boolean().default(false),
    }),
});
exports.default = appointmentValidation;
