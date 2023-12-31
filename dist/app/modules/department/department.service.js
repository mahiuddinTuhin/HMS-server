"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const mongoose_1 = require("mongoose");
const department_model_1 = __importDefault(require("./department.model"));
/*
 * query for all department
 * return: "_id","id","departmentName","departmentDetails"
 */
const findAllDepartment = async () => {
    const allDepartment = await department_model_1.default.find({ isDeleted: false }, {
        _id: 1,
        id: 1,
        departmentName: 1,
        departmentDetails: 1,
    });
    return allDepartment;
};
/*
 * query for  find All Specializatios
 * return: "_id","specializations"
 */
const findAllSpecializatios = async () => {
    const allSpecializatios = await department_model_1.default.aggregate([
        {
            $unwind: "$specializations",
        },
        {
            $project: {
                _id: "$specializations._id",
                specializations: "$specializations.specializationName",
            },
        },
    ]);
    return allSpecializatios;
};
/*
 * query for  find Specialization by id
 * return: "allProblems","Specialization name
 */
const findSpecializatioById = async (id) => {
    const Specialization = await department_model_1.default.aggregate([
        {
            $match: {
                "specializations._id": new mongoose_1.Types.ObjectId(id),
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
                "specializations._id": new mongoose_1.Types.ObjectId(id),
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
const findAllProblems = async () => {
    const departments = await department_model_1.default.aggregate([
        {
            $unwind: "$specializations",
        },
        {
            $unwind: "$specializations.problems",
        },
        {
            $replaceRoot: {
                newRoot: {
                    problem: "$specializations.problems",
                    departmentId: "$_id",
                    specializationsId: "$specializations._id",
                },
            },
        },
    ]);
    return departments;
};
/*
 * query for  find All Symptoms
 * return: Symptoms, departmentId, specialization id
 */
const findAllSymptoms = async () => {
    console.log("symptoms");
    const AllSymptoms = await department_model_1.default.aggregate([
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
const findDepartmentById = async (id) => {
    /* query for all department */
    const department = await department_model_1.default.findById(id, {
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
exports.default = departmentService;
