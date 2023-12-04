/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import AppError from "../../util/customError";
import { Admin } from "../admin/admin.mode";
import { Doctor } from "../doctors/doctors.model";
import { Nurse } from "../nurse/nurse.model";
import { Patient } from "../patients/patient.mdoel";
import { Staff } from "../staff/staff.model";
import { TUsers } from "./users.interface";
import { Users } from "./users.model";

/* 1. creating admin service */
const createAdminService = async (data: any) => {
  /* taking necessary data for common user */
  const userData: Partial<TUsers> = {
    userId: data?.userId,
    username:
      data?.username || data?.personalInfo?.fullName?.firstName + "2023" || "",
    password: data?.password || process.env.DEFAULT_PASSWORD,
    needsPasswordChange: true,
    email: data?.email,
    role: "admin",
    isDeleted: false,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await Users.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(
        "Error occured in creating user transactions.",
        StatusCodes.BAD_REQUEST,
      );
    }

    const {
      password,
      email,
      needsPasswordChange,
      role,
      isDeleted,
      userId,
      ...restOfData
    } = data;

    const adminData = { ...restOfData, adminId: data?.userId };

    const newAdmin = await Admin.create([adminData], { session });

    if (!newAdmin.length) {
      throw new Error("Doctor data creation failed!");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

/* 2. creating doctor service*/
const createDocService = async (data: any) => {
  /* taking necessary data for user */
  const userData: Partial<TUsers> = {
    userId: data?.userId,
    username:
      data?.username ||
      data.personalInfo.fullName.firstName + "2023" ||
      "D" + new Date().getTime(),
    password: data?.password || process.env.DEFAULT_PASSWORD,
    needsPasswordChange: true,
    email: data?.email,
    role: "doctor",
    isDeleted: false,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await Users.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(
        "Error occured in creating user transactions.",
        StatusCodes.BAD_REQUEST,
      );
    }

    const {
      password,
      email,
      needsPasswordChange,
      role,
      isDeleted,
      userId,
      ...restOfData
    } = data;

    const doctorData = {
      ...restOfData,
      doctorId: data?.userId,
      allMedicalHistory: [],
    };

    const newDoctor = await Doctor.create([doctorData], { session });

    if (!newDoctor.length) {
      throw new AppError(
        "Error occured in creating Doctor data transactions.",
        StatusCodes.BAD_REQUEST,
      );
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

/*  3. create nurse service */
const createNurseService = async (data: any) => {
  /* taking necessary data for common user */
  const userData: Partial<TUsers> = {
    userId: data?.userId,
    username:
      data?.username ||
      data.personalInfo.fullName.firstName + "2023" ||
      "N" + new Date().getTime(),
    password: data?.password || process.env.DEFAULT_PASSWORD,
    needsPasswordChange: true,
    email: data?.email,
    role: "nurse",
    isDeleted: false,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await Users.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(
        "Error occured in creating user transactions.",
        StatusCodes.BAD_REQUEST,
      );
    }

    const {
      password,
      email,
      needsPasswordChange,
      role,
      isDeleted,
      userId,
      ...restOfData
    } = data;

    const adminData = { ...restOfData, nurseId: data?.userId };

    const newNurse = await Nurse.create([adminData], { session });

    if (!newNurse.length) {
      throw new AppError(
        "Error occured in creating nurse model transactions.",
        StatusCodes.BAD_REQUEST,
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newNurse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    console.log("--error occured--");
    throw new AppError("An error occured here......", 500);
  }
};

/* 4. creating patient */
const createPatientService = async (data: any) => {
  /* taking necessary data for common user */
  const userData: Partial<TUsers> = {
    userId: data?.userId,
    username:
      data?.username ||
      data.personalInfo.fullName.firstName + "2023" ||
      "P" + new Date().getTime(),
    password: data?.password || process.env.DEFAULT_PASSWORD,
    needsPasswordChange: true,
    email: data?.email,
    role: "patient",
    isDeleted: false,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await Users.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(
        "Error occured in creating user transactions.",
        StatusCodes.BAD_REQUEST,
      );
    }

    const {
      password,
      email,
      needsPasswordChange,
      role,
      isDeleted,
      userId,
      ...restOfData
    } = data;

    const patientData = { ...restOfData, patientId: data?.userId };

    const newPatient = await Patient.create([patientData], { session });

    if (!newPatient.length) {
      throw new AppError(
        "Error occured in creating nurse model transactions.",
        StatusCodes.BAD_REQUEST,
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newPatient;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

/* 5. creating staff */
const createStaffService = async (data: any) => {
  /* taking necessary data for common user */
  const userData: Partial<TUsers> = {
    userId: data?.userId,
    username:
      data?.username ||
      data.personalInfo.fullName.firstName + "2023" ||
      "S" + new Date().getTime(),
    password: data?.password || process.env.DEFAULT_PASSWORD,
    needsPasswordChange: true,
    email: data?.email,
    role: "staff",
    isDeleted: false,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await Users.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(
        "Error occured in creating user transactions.",
        StatusCodes.BAD_REQUEST,
      );
    }

    const {
      password,
      email,
      needsPasswordChange,
      role,
      isDeleted,
      userId,
      ...restOfData
    } = data;

    const staffData = { ...restOfData, staffId: data?.userId };

    const newStaff = await Staff.create([staffData], { session });

    if (!newStaff.length) {
      throw new AppError(
        "Error occured in creating staff model transactions.",
        StatusCodes.BAD_REQUEST,
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newStaff;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
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
  createAdminService,
  createDocService,
  createNurseService,
  createStaffService,
  createPatientService,
  getUserById,
  deleteUserById,
  updateUserById,
  getAllUser,
};
