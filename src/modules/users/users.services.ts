/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { startSession } from "mongoose";
import { Doctor } from "../doctors/doctors.model";
import { Patient } from "../patients/patient.mdoel";
import { TUsers } from "./users.interface";
import { Users } from "./users.model";

/* creating doctor */
const createDocService = async (data: any) => {
  /* taking necessary data for user */
  const userData: Partial<TUsers> = {
    userId: data.userId,
    password: data.password,
    email: data.email,
    profile_image: data.profile_image,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const newUser = await Users.create([userData], { session });
    if (!newUser.length) {
      throw new Error("Error occured in transactions.");
    }

    const { password, email, profile_image, ...restOfData } = data;
    const docData = { ...restOfData, user_Id: newUser[0]?._id };

    const newDoctor = await Doctor.create([docData], { session });

    if (!newDoctor.length) {
      throw new Error("Doctor data creation failed!");
    }

    await session.commitTransaction();
    await session.endSession();

    return newDoctor;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

/* creating patient */
const createPatientService = async (data: any) => {
  const userData: Partial<TUsers> = {
    userId: data.userId,
    password: data.password,
    email: data.email,
    profile_image: data.profile_image,
  };

  const session = await startSession();

  const { password, email, profile_image, ...restOfData } = data;

  try {
    /* starting session */
    session.startTransaction();
    const newUser = await Users.create([userData], { session });

    if (!newUser.length) {
      throw new Error("User creation failed.");
    }

    const patientData = { ...restOfData, user_Id: newUser[0]?._id };
    const newPatient = await Patient.create([patientData], { session });
    if (!newPatient.length) {
      throw new Error("User creation failed.");
    }

    await session.commitTransaction();
    await session.endSession();
    /* ends session */

    return newPatient;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getUserById = async (id: number) => {
  const result = await Users.findOne({ userId: id });
  if (!result) {
    throw new Error("User retrieve failed.");
  }
  return result;
};

const getAllUser = async () => {
  const result = await Users.find();
  if (!result) {
    throw new Error("User retrieve failed.");
  }
  return result;
};

const deleteUserById = async (id: number) => {
  const result = await Users.deleteOne({ userId: id });
  if (!result) {
    throw new Error("User deletion failed.");
  }
  return result;
};

const updateUserById = async (id: number, data: TUsers) => {
  const result = await Users.updateOne({ userId: id }, { data });
  if (!result) {
    throw new Error("User update failed.");
  }
  return result;
};

export const userServices = {
  createDocService,
  createPatientService,
  getUserById,
  deleteUserById,
  updateUserById,
  getAllUser,
};
