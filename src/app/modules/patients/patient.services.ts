import { TPatient } from "./patient.interface";
import { Patient } from "./patient.mdoel";

const getPatientById = async (id: number) => {
  const result = await Patient.findOne({ userId: id });
  if (!result) {
    throw new Error("Patient retrieve failed.");
  }
  return result;
};

const getAllPatient = async () => {
  const result = await Patient.find();
  if (!result) {
    throw new Error("Patient retrieve failed.");
  }
  return result;
};

const deletePatientById = async (id: number) => {
  const result = await Patient.deleteOne({ userId: id });
  if (!result) {
    throw new Error("Patient deletion failed.");
  }
  return result;
};

const updatePatientById = async (id: number, data: TPatient) => {
  const result = await Patient.updateOne({ userId: id }, { data });
  if (!result) {
    throw new Error("Patient update failed.");
  }
  return result;
};

export const patientServices = {
  getPatientById,
  deletePatientById,
  updatePatientById,
  getAllPatient,
};
