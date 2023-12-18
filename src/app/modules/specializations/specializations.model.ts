import { Schema, model } from "mongoose";
import { TMedicalProblem } from "./specializations.interface";

const medicalProblemSchema = new Schema<TMedicalProblem>({
  problemName: {
    type: String,
    unique: true,
    required: [true, "Problem name is required"],
  },
  problemHints: {
    type: String,
    required: [true, "Problem hints is required"],
  },
  symptoms: [
    {
      type: String,
      unique: true,
      required: [true, "Problem symptoms is required"],
    },
  ],
  supportsFromHospital: [
    {
      type: String,
      required: [true, "Supports list from hospital are required"],
    },
  ],
  treatments: [
    {
      type: String,
      required: [true, "Treatments name is required"],
    },
  ],
});

const specializationSchema = new Schema({
  specializationName: {
    type: String,
    required: [true, "Specialization name is required"],
  },
  specializationDetails: {
    type: String,
    required: [true, "Specialization details is required"],
  },
  problems: [medicalProblemSchema],
  doctors: [
    {
      type: Schema.Types.ObjectId,
      required: [true, "Doctor _id is required"],
    },
  ],
  department: {
    type: Schema.Types.ObjectId,
    required: [true, "Department _id is required"],
  },
});

const Specialization = model("Specialization", specializationSchema);

export default Specialization;
