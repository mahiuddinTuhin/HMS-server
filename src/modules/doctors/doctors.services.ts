import { TDoctor } from "./doctors.interface";
import { Doctor } from "./doctors.model";

const findDocByIdService = async (id: string) => {
  const doc = await Doctor.find({ doctorsId: id });
  return doc;
};

const deleteDocByIdService = async (id: string) => {
  const allDoc = await Doctor.deleteOne({ doctorsId: id });
  return allDoc;
};

const updateDocByIdService = async (id: string, data: Partial<TDoctor>) => {
  const updatedDoc = await Doctor.findById(id, { data }, { new: true });
  return updatedDoc;
};

const getAllDocService = async () => {
  const allDoc = await Doctor.find();
  return allDoc;
};

export const doctorServices = {
  findDocByIdService,
  updateDocByIdService,
  getAllDocService,
  deleteDocByIdService,
};
