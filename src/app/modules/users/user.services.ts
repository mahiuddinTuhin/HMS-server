/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import mongoose, { Types } from "mongoose";
import AppError from "../../errors/customError";
import { TPasswordReset } from "../../interfaces/TCommon.interface";
import { userRole } from "../../interfaces/interfaces";
import uploadToCloudinary from "../../utils/uploadToCloudinary";
import generateUserId from "../../utils/userIdGenerator";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.mode";
import { Appointment } from "../appointment/appointment.model";
import Department from "../department/department.model";
import { TDoctor } from "../doctors/doctors.interface";
import { Doctor } from "../doctors/doctors.model";
import Nurse from "../nurse/nurse.model";
import { Patient } from "../patients/patient.model";
import Specialization from "../specializations/specializations.model";
import Staff from "../staff/staff.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

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

    /*
     *  generating user id
     * returns the incremented id of previous one from DB
     */
    const generatedUserId = await generateUserId(userRole.admin);

    if (!generatedUserId) {
      throw new AppError(
        "Error occured on creating generating id.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    /*
     *  uploads to cloudinary with path and imageName
     * return secure_url
     */
    let profileImage = "";

    if (data?.path) {
      // generating image name for imageDB
      const imageName = `image-${generatedUserId}`;
      const { secure_url } = (await uploadToCloudinary(
        data?.path,
        imageName,
      )) as any;
      profileImage = secure_url;
    }

    /* taking necessary data for common user */

    const userData: Partial<TUser> = {
      id: generatedUserId,
      password: data?.password,
      email: data?.email,
      phone: data?.phone,
      role: "admin",
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
      profileImage,
    };

    const newAdmin = await Admin.create([adminData], { session });

    if (!newAdmin.length) {
      throw new AppError("Failed to create admin from service.", 400);
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(error?.message, 400);
  }
};

/**
 *
 * @creating_doctor_service
 *
 * @returns_new_doctor
 */

const createDocService = async (data: any) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    /*
     *  generating user id
     * returns the incremented id of previous one from DB
     */
    const generatedUserId = await generateUserId(userRole.doctor);

    if (!generatedUserId) {
      throw new AppError(
        "Error occured on creating generating id.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    // generating image name for imageDB
    const imageName = `image-${generatedUserId}`;

    /*
     *  uploads to cloudinary with path and imageName
     * return secure_url
     */

    let profileImage = "";

    if (data?.path) {
      const { secure_url } = (await uploadToCloudinary(
        data?.path,
        imageName,
      )) as any;

      profileImage = secure_url;
    }

    /* taking necessary data for common user */

    const userData: Partial<TUser> = {
      id: generatedUserId,
      password: data?.password,
      email: data?.email,
      phone: data?.phone,
      role: userRole.doctor,
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

    /* cooking doctor obj for create document in database */
    const doctorData: Partial<TDoctor> = {
      ...restOfData,
      id: newUser[0]?.id,
      user: newUser[0]?._id,
      profileImage,
    };

    // creting doctor document
    const newDoctor: any = await Doctor.create([doctorData], { session });

    // updating department with doctor's user_id, also skip if already exist

    await Department.findByIdAndUpdate(
      doctorData.department, // object id
      {
        $addToSet: {
          doctors: doctorData.user, //doctorData.user is a object id
        },
      },
      { session },
    );

    // updating specialization collection with doctor's user_id, also skip if already exist. Note: A doctor can exist in multiple specialization.

    const newSpecializations = newDoctor[0].specializations as string[];

    await Promise.all(
      newSpecializations?.map(async (spec) => {
        await Specialization.findByIdAndUpdate(
          spec,
          {
            $addToSet: {
              doctors: doctorData.user, //doctorData.user is a object id
            },
          },
          {
            session,
          },
        );
      }),
    );

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
    throw new AppError(error?.message, 400);
  }
};

/**
 *
 * @creating_nurse_service
 *
 * @returns_new_nurse
 */
const createNurseService = async (data: any) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    /*
     *  generating user id
     * returns the incremented id of previous one from DB
     */
    const generatedUserId = await generateUserId(userRole.nurse);

    if (!generatedUserId) {
      throw new AppError(
        "Error occured on creating generating id.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    // generating image name for imageDB
    const imageName = `image-${generatedUserId}`;

    /*
     *  uploads to cloudinary with path and imageName
     * return secure_url
     */

    let profileImage = "";

    if (data?.path) {
      const { secure_url } = (await uploadToCloudinary(
        data?.path,
        imageName,
      )) as any;

      profileImage = secure_url;
    }

    /* taking necessary data for common user */
    const userData: Partial<TUser> = {
      id: generatedUserId,
      password: data?.password,
      email: data?.email,
      phone: data?.phone,
      role: userRole.nurse,
    };
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
      profileImage,
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
    throw new AppError(error?.message, 400);
  }
};

/**
 *
 * @creating_patient_service
 *
 * @returns_new_patient
 */
const createPatientService = async (data: any) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    /*
     *  generating user id
     * returns the incremented id of previous one from DB
     */
    const generatedUserId = await generateUserId(userRole.patient);

    if (!generatedUserId) {
      throw new AppError(
        "Error occured on creating generating id.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    // generating image name for imageDB
    const imageName = `image-${generatedUserId}`;

    /*
     *  uploads to cloudinary with path and imageName
     * return secure_url
     */
    let profileImage = "";

    if (data?.path) {
      const { secure_url } = (await uploadToCloudinary(
        data?.path,
        imageName,
      )) as any;

      profileImage = secure_url;
    }

    /* taking necessary data for common user */
    const userData: Partial<TUser> = {
      id: generatedUserId,
      password: data?.password,
      email: data?.email,
      phone: data?.phone,
      role: userRole.patient,
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
      profileImage,
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
    throw new AppError(error?.message, 400);
  }
};

/**
 *
 * @creating_staff_service
 *
 * @returns_new_staff
 */
const createStaffService = async (data: any) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    /*
     *  generating user id
     * returns the incremented id of previous one from DB
     */
    const generatedUserId = await generateUserId(userRole.staff);

    if (!generatedUserId) {
      throw new AppError(
        "Error occured on creating generating id.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    // generating image name for imageDB
    const imageName = `image-${generatedUserId}`;
    /*
     *  uploads to cloudinary with path and imageName
     * return secure_url
     */
     let profileImage = "";

     if (data?.path) {
       const { secure_url } = (await uploadToCloudinary(
         data?.path,
         imageName,
       )) as any;

       profileImage = secure_url;
     }

    /* taking necessary data for common user */
    const userData: Partial<TUser> = {
      id: generatedUserId,
      password: data?.password,
      email: data?.email,
      phone: data?.phone,
      role: userRole.staff,
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
      profileImage
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
    throw new AppError(error?.message, 400);
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
  const searchTerm = query?.searchTerm || {};

  const result = await User.find(searchTerm);

  return result;
};

const updateUserById = (id: number, body: any) => {};

/**
 *
 * @reset_password
 *
 */

const resetPassword = async (data: TPasswordReset) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    session.commitTransaction();
    session.endSession();
  } catch (error: any) {
    session.abortTransaction();
    session.endSession();

    throw new AppError(error?.message, 400);
  }
};

/**
 *
 * @Get_me_service
 *
 */
const getMe = async (id: string, role: string) => {
  let result;
  if (role === "admin") {
    result = await Admin.findOne({ id }).populate("user");
  } else if (role === "nurse") {
    result = await Nurse.findOne({ id }).populate("user");
  } else if (role === "doctor") {
    result = await Doctor.findOne({ id }).populate("user");
  } else if (role === "staff") {
    result = await Staff.findOne({ id }).populate("user");
  } else if (role === "patient") {
    result = await Patient.findOne({ id }).populate("user");
  }

  return result;
};

/*
 * delete_doctor_by_id_service
 *
 * isDeleted from User
 * removing doctor id from department
 * removing doctor id from all specializations
 * close all appointments of this doctor
 *
 */

const deleteDoctor = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(async () => {
      /* find user and change isDeleted field value to true */
      const deletedUser = (await User.findOneAndUpdate(
        {
          $and: [
            { _id: new Types.ObjectId(id) },
            { isDeleted: false },
            { role: userRole.doctor },
          ],
        },
        {
          $set: { isDeleted: true },
        },
        { new: true, session },
      )) as TUser;

      if (!deletedUser) {
        throw new AppError(
          "Doctor does not exist. Enter Doctor id properly.",
          StatusCodes.BAD_REQUEST,
        );
      }

      /* finding doctor data using the user id from Doctor collection */
      const doctorData = (await Doctor.findOne(
        {
          user: new Types.ObjectId(deletedUser?._id),
        },
        null,
        { session },
      )) as TDoctor;

      /* removing doctor id from department */
      await Department.findByIdAndUpdate(
        doctorData.department, // object id
        {
          $pull: {
            doctors: doctorData.user, //doctorData.user is a object id
          },
        },
        { session },
      );

      /* removing doctor id from specializations */

      await Promise.all(
        doctorData?.specializations?.map(async (spec) => {
          await Specialization.findByIdAndUpdate(
            spec,
            {
              $pull: {
                doctors: doctorData.user, //doctorData.user is a object id
              },
            },
            {
              session,
            },
          );
        }),
      );

      /* close all appointments of this doctor */
      await Promise.all(
        doctorData?.pendingAppointments?.map(async (appointmentId) => {
          const appointed = await Appointment.findByIdAndUpdate(
            appointmentId,
            {
              $set: {
                isClosed: true,
              },
            },
            { new: true, session },
          );

          await Patient.findOneAndUpdate(
            { user: appointed?.patient },
            {
              $pull: {
                pendingAppointments: appointmentId,
              },
            },
            {
              session,
            },
          );
        }),
      );

      await Doctor.findByIdAndUpdate(
        {
          _id: doctorData?._id,
        },
        {
          $set: {
            pendingAppointments: [],
          },
        },
        { session },
      );

      return true;
    });

    return result;
  } catch (error: any) {
    await session.endSession();
    throw new AppError(error?.message, 400);
  }
};

/*
 *   Delete admin
 *   isDeleted: true
 */
const deleteAdmin = async (id: string) => {
  /* checking whether doctor is available or not */
  const doesAdminExist = await User.findOne({
    $and: [{ _id: new Types.ObjectId(id) }, { isDeleted: false }],
  });

  if (!doesAdminExist) {
    throw new AppError(
      "Admin does not exist. Enter Admin id properly.",
      StatusCodes.BAD_REQUEST,
    );
  }
  const deletedAdmin = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        isDeleted: true,
      },
    },
    { new: true },
  );
  return deletedAdmin;
};

/*
 *   Delete nurse
 *   isDeleted: true
 */
const deleteNurse = async (id: string) => {
  /* checking whether doctor is available or not */
  const doesNurseExist = await User.findOne({
    $and: [{ _id: new Types.ObjectId(id) }, { isDeleted: false }],
  });

  if (!doesNurseExist) {
    throw new AppError(
      "Nurse does not exist. Enter Nurse id properly.",
      StatusCodes.BAD_REQUEST,
    );
  }
  const deletedNurse = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        isDeleted: true,
      },
    },
    { new: true },
  );
  return deletedNurse;
};

/*
 *   Delete staff
 *   isDeleted: true
 */
const deleteStaff = async (id: string) => {
  /* checking whether doctor is available or not */
  const doesStaffExist = await User.findOne({
    $and: [{ _id: new Types.ObjectId(id) }, { isDeleted: false }],
  });

  if (!doesStaffExist) {
    throw new AppError(
      "Staff does not exist. Enter Staff id properly.",
      StatusCodes.BAD_REQUEST,
    );
  }
  const deletedStaff = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        isDeleted: true,
      },
    },
    { new: true },
  );
  return deletedStaff;
};

/*
 * delete patient by id service
 *
 * isDeleted true from User
 * remove all pending appointments of this patient
 * remove all these appointment from doctor's pending appointment
 * making isClosed field value true for all of these appointment
 *
 */

const deletePatient = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(async () => {
      /* finding id and update the isDeleted field to true */

      const updatedUser: any = await User.findOneAndUpdate(
        {
          $and: [
            { _id: new Types.ObjectId(id) },
            { isDeleted: false },
            { role: userRole.patient },
          ],
        },
        {
          $set: { isDeleted: true },
        },
        { new: true, session },
      );

      if (!updatedUser) {
        throw new AppError(
          "Patient does not exist. Enter Patient id properly.",
          StatusCodes.BAD_REQUEST,
        );
      }

      /* finding Patient data by user id */

      const PatientData: any = await Patient.findOne({
        user: updatedUser?._id,
      }).session(session);

      /* close all appointments of this patient from patient collection */
      await Promise.all(
        PatientData?.pendingAppointments?.map(async (appointmentId: string) => {
          const appointed = await Appointment.findByIdAndUpdate(
            appointmentId,
            {
              $set: {
                isClosed: true,
              },
            },
            {
              new: true,
              session,
            },
          );

          await Doctor.findOneAndUpdate(
            { user: appointed?.doctor },
            {
              $pull: {
                pendingAppointments: appointmentId,
              },
            },
            {
              session,
            },
          );
        }),
      );

      /* make empty the pending appointment of patient */
      const updatedPatient = await Patient.findByIdAndUpdate(
        {
          _id: PatientData?._id,
        },
        {
          $set: { pendingAppointments: [] },
        },
        {
          new: true,
          session,
        },
      );

      return updatedPatient;
    });

    return result;
    /* check phind.com */
  } catch (error: any) {
    await session.endSession();
    throw new AppError(error?.message, 400);
  }
};

export const userServices = {
  createAdminService,
  createDocService,
  createNurseService,
  createStaffService,
  createPatientService,
  getUserById,
  updateUserById,
  getAllUser,
  resetPassword,
  getMe,
  deleteDoctor,
  deleteAdmin,
  deleteNurse,
  deleteStaff,
  deletePatient,
};
