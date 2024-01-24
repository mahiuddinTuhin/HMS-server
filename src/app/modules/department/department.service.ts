/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Types } from "mongoose";
import { Doctor } from "../doctors/doctors.model";
import Specialization from "../specializations/specializations.model";
import Department from "./department.model";

/*
 * query for all department
 * return: "_id","id","departmentName","departmentDetails"
 */
const findAllDepartment = async () => {
  const allDepartment = await Department.find(
    { isDeleted: false },
    {
      _id: 1,
      id: 1,
      departmentName: 1,
      departmentDetails: 1,
    },
  );
  return allDepartment;
};

/*
 * query for  find All Specializatios
 * return: "_id","specializations"
 */
const findAllSpecializatios: any = async () => {
  const allSpecializatios = await Specialization.find();
  return allSpecializatios;
};

/*
 * query for  find Specialization by id
 * return: "allProblems","Specialization name
 */
const findSpecializatioById: any = async (id: string) => {
  const Specialization = await Department.aggregate([
    {
      $match: {
        "specializations._id": new Types.ObjectId(id),
      },
    },

    {
      $project: {
        specializations: 1,
        _id: 0,
      },
    },
    {
      $unwind: "$specializations",
    },
    {
      $match: {
        "specializations._id": new Types.ObjectId(id),
      },
    },
    {
      $project: {
        _id: 0,
        specializationName: "$specializations.specializationName",
        allProblems: "$specializations.problems",
      },
    },
  ]);
  return Specialization[0];
};

/*
 * query for  find All problems
 * return: problem, departmentId, specialization id
 */
const findAllProblems: any = async () => {
  /*
   * Doctor's Model => specialization Model =>
   */
  const problems = await Doctor.aggregate([
    {
      $lookup: {
        from: "specializations",
        localField: "specializations",
        foreignField: "_id",
        as: "specializationData",
      },
    },
    {
      $unwind: "$specializationData",
    },
    {
      $unwind: "$specializationData.problems",
    },
    {
      $project: {
        _id: false,
        problem: "$specializationData.problems",
        doctor: {
          doctorId: "$_id",
          doctorName: {
            $concat: [
              "$fullName.firstName",
              " ",
              "$fullName.middleName",
              " ",
              "$fullName.lastName",
            ],
          },
          degree: "$education.degree",
          profileImage: "$profileImage",
        },
      },
    },
    // {
    //   $replaceRoot: {
    //     newRoot: {
    //       problem: "$specializations.problems",
    //       departmentId: "$_id",
    //       specializationsId: "$specializations._id",
    //     },
    //   },
    // },
  ]);
  return problems;
};

/*
 * query for  find All Symptoms
 * return: Symptoms, departmentId, specialization id
 */
const findAllSymptoms: any = async () => {
  console.log("symptoms");
  const AllSymptoms = await Department.aggregate([
    {
      $unwind: "$specializations",
    },
    {
      $unwind: "$specializations.problems",
    },

    /*
     * this below code is alternative of projection, that has writtern after that
     */
    // {
    //   $replaceRoot: {
    //     newRoot: {
    //       allSymptoms: "$specializations.problems.symptoms",
    //     },
    //   },
    // },
    {
      $project: {
        _id: 0,
        symptoms: "$specializations.problems.symptoms",
      },
    },
    {
      $unwind: "$symptoms",
    },
    {
      $group: {
        _id: null,
        allSymptoms: {
          $addToSet: "$symptoms",
        },
      },
    },
    {
      $project: {
        allSymptoms: 1,
        _id: 0,
      },
    },
  ]);
  return AllSymptoms;
};

/* find department document by id */
const findDepartmentById = async (id: string) => {
  /* query for all department */

  const department = await Department.findById(id, {
    medicalHistory: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });
  return department;
};

const departmentService = {
  findAllDepartment,
  findDepartmentById,
  findAllSpecializatios,
  findSpecializatioById,
  findAllProblems,
  findAllSymptoms,
};

export default departmentService;
