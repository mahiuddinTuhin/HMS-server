/*
 * Medical problem schema
 */

import { Schema } from "mongoose";
import {
  TMedicalProblem,
  TMedicalSpecializations,
} from "./department.interface";

export const medicalProblemSchema = new Schema<TMedicalProblem>(
  {
    problemName: {
      type: String,
      required: [true, "Problem name is required!"],
    },

    problemHints: {
      type: String,
      required: [true, "Problem hints is required!"],
    },

    symptoms: [
      {
        type: String,
        required: [true, "Problem symtoms is required!"],
      },
    ],

    supportsFromHospital: [
      {
        type: String,
        required: [true, "Support for Problem from hospital is required!"],
      },
    ],

    treatments: [
      {
        type: String,
        required: [true, "treatments for this problem is required!"],
      },
    ],
  },
  {
    _id: false,
  },
);

/*
 * Medical specialization section schema
 */
export const medicalSpecializationSchema = new Schema<TMedicalSpecializations>(
  {
    specializationName: {
      type: String,
      required: [true, "Specialization Name name is required!"],
    },
    specializationDetails: {
      type: String,
      required: [true, "Specialization Details name is required!"],
    },

    problems: [medicalProblemSchema],
  },
  {
    _id: false,
  },
);
