/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import AppError from "../../errors/customError";
import { TMedicalHistory } from "../MedicalHistory/medicalHistory.ineterface";
import { MedicalHistory } from "../MedicalHistory/medicalHistory.model";
import { TAppointments } from "../appointment/appointment.interface";
import { Appointment } from "../appointment/appointment.model";
import Department from "../department/department.model";
import { Patient } from "../patients/patient.model";
import { TDoctor } from "./doctors.interface";
import { Doctor } from "./doctors.model";

/* creating an appointment by doctor */
const createAppointment = async (data: TAppointments) => {
  /* checking whether doctor is available or not */
  const doesDoctorExist = await Doctor.findById(data?.id);

  if (!doesDoctorExist) {
    throw new AppError(
      "Doctor does not exist. Enter doctor id properly.",
      StatusCodes.BAD_REQUEST,
    );
  }

  if (doesDoctorExist) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const canTakeSchedule: any = await Doctor.findOne({
      id: data?.id,
      pendingAppointments: {
        $elemMatch: {
          date: data?.date,
          time: data?.time,
        },
      },
    });

    if (canTakeSchedule) {
      throw new AppError(
        "Doctor does not available on that time. Change time or date.",
        StatusCodes.BAD_REQUEST,
      );
    }
  }

  const newAppointMent = await Doctor.findOneAndUpdate(
    {
      id: data?.id,
    },
    {
      $push: {
        pendingAppointments: {
          date: data?.date,
          time: data?.time,
        },
      },
    },
    { new: true },
  );

  const updatedPatient = await Patient.findOneAndUpdate(
    {
      id: data?.id,
    },
    {
      $push: {
        pendingAppointments: {
          date: data?.date,
          time: data?.time,
        },
      },
    },
  );

  if (!newAppointMent || !updatedPatient) {
    throw new AppError(
      "Failed to create appointment!!",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  return newAppointMent;
};

/* creating a medical history by doctor */
const createMedicalHistory = async (data: TMedicalHistory) => {
  try {
    const newMedicalHistory: any = await MedicalHistory.create(data);
    if (!newMedicalHistory) {
      throw new AppError(
        "Creating Medical History failed! from doctor services.",
        StatusCodes.BAD_REQUEST,
      );
    }
    return newMedicalHistory;
  } catch (error) {
    throw new AppError(
      `Creating Medical History  failed from doctor services!: ${error}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

const findDocByIdService = async (id: string) => {
  const doc = await Doctor.findOne({
    user: new Types.ObjectId(id),
  });
  // console.log({ doc });
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

const appointedTimeOfDoc = async (doctor_id: string) => {
  const doctor: any = await Doctor.findById(doctor_id);

  if (!doctor) {
    throw new AppError("Doctor id is not found.", 400);
  }

  const pendingAppointments: string[] = doctor?.pendingAppointments;

  const scheduleByDate: Record<string, string[]> = {};

  /* if no appointment found, then return empty obj */

  if (!pendingAppointments.length) {
    return {};
  }

  /* getting all appointment from appointment collection by using the _id that is containing in * pendingAppointments */

  const allAppointments = await Appointment.find({
    _id: { $in: pendingAppointments },
  });

  /*
   * loop in all appointment
   * set scheduleByDate value with filed name using the date
   * push the time into matching date
   */

  allAppointments.forEach((appointment) => {
    const { date, time } = appointment;

    if (!scheduleByDate[date]) {
      scheduleByDate[date] = [];
    }
    scheduleByDate[date].push(time);
  });

  return scheduleByDate;
};

/*
 *find doctor by symptoms
 *
 *
 */

const findDoctorBySymptoms = async (symptoms: string) => {
  const doc = await Department.find(
    {
      specializations: {
        $elemMatch: {
          problems: {
            $elemMatch: {
              symptoms,
            },
          },
        },
      },
    },
    {
      doctors: 1,
    },
  );

  return doc;
};

export const doctorServices = {
  findDocByIdService,
  updateDocByIdService,
  getAllDocService,
  deleteDocByIdService,
  createAppointment,
  createMedicalHistory,
  appointedTimeOfDoc,
  findDoctorBySymptoms,
};
