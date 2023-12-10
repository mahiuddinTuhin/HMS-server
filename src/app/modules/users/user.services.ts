/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import AppError from "../../errors/customError";
import generateUserId from "../../utils/userIdGenerator";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.mode";
import { TDoctor } from "../doctors/doctors.interface";
import { Doctor } from "../doctors/doctors.model";
import Nurse from "../nurse/nurse.model";
import { Patient } from "../patients/patient.model";
import Staff from "../staff/staff.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
const bcrypt = require("bcrypt");

/**
 *
 * @creating_admin_service
 *
 * @returns_new_admin
 */
const createAdminService = async (data: any) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const generatedUserId = await generateUserId("patient");

    if (!generatedUserId) {
      throw new AppError(
        "Error occured on creating generating id.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    /* taking necessary data for common user */

    const userData: Partial<TUser> = {
      id: generatedUserId,
      password: data?.password,
      needsPasswordChange: true,
      email: data?.email,
      phone: data?.phone,
      role: "admin",
      isDeleted: false,
      status: "active",
    };
    const newUser: any = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError("Failed to create user from service.", 400);
    }

    const {
      password,
      needsPasswordChange,
      role,
      isDeleted,
      _id,
      ...restOfData
    } = data;

    const adminData: Partial<TAdmin> = {
      ...restOfData,
      id: newUser[0]?.id,
      user: newUser[0]?._id,
    };

    const newAdmin = await Admin.create([adminData], { session });

    if (!newAdmin.length) {
      throw new AppError("Failed to create admin from service.", 400);
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

/**
 * @function creating Doctor Services
 *
 */

const createDocService = async (data: any) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const generatedUserId = await generateUserId("Doctor");

    if (!generatedUserId) {
      throw new AppError(
        "Error occured on creating generating id.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    /* taking necessary data for common user */

    const userData: Partial<TUser> = {
      id: generatedUserId,
      password: data?.password,
      needsPasswordChange: true,
      email: data?.email,
      phone: data?.phone,
      role: "doctor",
      isDeleted: false,
      status: "active",
    };

    const newUser: any = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError("Failed to create user from service.", 400);
    }

    const {
      password,
      needsPasswordChange,
      role,
      isDeleted,
      _id,
      ...restOfData
    } = data;

    const doctorData: Partial<TDoctor> = {
      ...restOfData,
      id: newUser[0]?.id,
      user: newUser[0]?._id,
    };

    const newDoctor = await Doctor.create([doctorData], { session });

    if (!newDoctor?.length) {
      throw new AppError("Failed to create admin from service.", 400);
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
  const userData: Partial<TUser> = {
    id: await generateUserId("Nurse"),
    password: data?.password,
    needsPasswordChange: true,
    email: data?.email,
    phone: data?.phone,
    role: "nurse",
    isDeleted: false,
    status: "active",
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    const {
      password,
      needsPasswordChange,
      role,
      isDeleted,
      _id,
      ...restOfData
    } = data;

    const nurseData = {
      ...restOfData,
      id: newUser[0]?.id,
      user: newUser[0]?._id,
    };

    const newNurse = await Nurse.create([nurseData], { session });

    if (!newNurse) {
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
    throw new Error(error);
  }
};

/* 4. creating patient */
const createPatientService = async (data: any) => {
  const session = await mongoose.startSession();

  /* taking necessary data for common user */
  const userData: Partial<TUser> = {
    id: await generateUserId("Patient"),
    password: data?.password,
    needsPasswordChange: true,
    email: data?.email,
    phone: data?.phone,
    isDeleted: false,
    role: "patient",
    status: "active",
  };

  try {
    session.startTransaction();

    const generatedUserId = await generateUserId("patient");

    if (!generatedUserId) {
      throw new AppError(
        "Error occured on creating generating id.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    const userData: Partial<TUser> = {
      id: generatedUserId,
      password: data?.password,
      needsPasswordChange: true,
      email: data?.email,
      phone: data?.phone,
      isDeleted: false,
      role: "patient",
      status: "active",
    };

    const newUser: any = await User.create([userData], { session });

    if (!newUser) {
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
      ...restOfData
    } = data;

    const patientData = {
      ...restOfData,
      id: newUser[0]?.id,
      user: newUser[0]?._id,
    };

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
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const generatedUserId = await generateUserId("staff");

    if (!generatedUserId) {
      throw new AppError(
        "Error generating user ID",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    /* taking necessary data for common user */
    const userData: Partial<TUser> = {
      id: generatedUserId,
      password: data?.password,
      needsPasswordChange: true,
      email: data?.email,
      phone: data?.phone,
      isDeleted: false,
      role: "staff",
      status: "active",
    };

    const newUser = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError(
        "Error occured in creating user transactions.",
        StatusCodes.BAD_REQUEST,
      );
    }

    const {
      password,
      needsPasswordChange,
      role,
      isDeleted,
      userId,
      ...restOfData
    } = data;

    const staffData = {
      ...restOfData,
      id: newUser[0]?.id,
      user: newUser[0]?._id,
    };

    const newStaff = await Staff.create([staffData], { session });

    if (!newStaff) {
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
  const result = await User.findOne({ userId: id });
  if (!result) {
    throw new Error("User retrieve failed.");
  }
  return result;
};

const getAllUser = async (query: Record<string, any>) => {
  let searchTerm = "";

  if (query?.searchTerm as string) {
    searchTerm = query?.searchTerm;
  }
  const result = await User.find();

  return result;
};

const updateUserById = (id: number, body: any) => {};

export const userServices = {
  createAdminService,
  createDocService,
  createNurseService,
  createStaffService,
  createPatientService,
  getUserById,
  updateUserById,
  getAllUser,
};
