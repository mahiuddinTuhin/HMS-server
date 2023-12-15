import { Schema } from "mongoose";
import {
  TContact,
  TEducation,
  TGuardian,
  TPersonalInfo,
} from "../interfaces/TCommon.interface";

/*
 * contact schema
 */

export const contactSchema = new Schema<TContact>({
  phone: [
    {
      type: String,
      required: [true, "Phone number is required!"],
    },
  ],

  address: [
    {
      type: String,
      required: [true, "Address required!"],
    },
  ],

  email: [
    {
      required: [true, "Email is required!"],
      type: String,
      validate: {
        validator: (value: string) => {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailPattern.test(value);
        },
        message: "Invalid email address format!",
      },
    },
  ],
});

const nonPatientEducationSchema = new Schema<TEducation>({
  institute: {
    type: String,
    required: [true, "Institute is required!"],
  },
  degree: {
    type: String,
    required: [true, "Degree is required!"],
  },
  year: {
    type: Number,
    required: [true, "Passing year is required!"],
  },
});

const NonPatientPersonalInfo = new Schema<TPersonalInfo>({
  address: {
    present_address: {
      type: String,
      required: [true, "Present address is required!"],
    },
    permanent_address: {
      type: String,
      required: [true, "Permanent address is required!"],
    },
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, "FirstName  is required!"],
    },
    lastName: {
      type: String,
      required: [true, "FullName is required!"],
    },
  },
  dateOfBirth: {
    type: String,
    required: [true, "Date of birth is required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required!"],
  },
  profileImage: {
    type: String,
    required: [true, "Profile image is required!"],
  },
});

const patientEducationSchema = new Schema<TEducation>({
  institute: String,
  degree: String,
  year: Number,
});

const patientPersonalInfo = new Schema<TPersonalInfo>({
  address: {
    present_address: String,
    permanent_address: String,
  },
  fullName: {
    firstName: String,
    lastName: String,
  },
  dateOfBirth: String,
  gender: String,
  profileImage: String,
});

const patientGuardianSchema = new Schema<TGuardian>({
  relation: String,
  name: String,
  contactNumber: String,
  address: String,
});

const fullNameSchema = new Schema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    middleName: { type: String, required: [true, "Middle name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
  },
  {
    _id: false,
  },
);

const addressSchema = new Schema(
  {
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
  },
  {
    _id: false,
  },
);

export const utilsSchema = {
  nonPatientEducationSchema,
  patientEducationSchema,
  NonPatientPersonalInfo,
  patientPersonalInfo,
  patientGuardianSchema,
  fullNameSchema,
  addressSchema,
};
