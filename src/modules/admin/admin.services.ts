/* eslint-disable @typescript-eslint/no-explicit-any */

import { TDepartment } from "../department/department.interface";
import Department from "../department/department.mode";
import { TLaboratory } from "../labratory/labratory.interface";
import Laboratory from "../labratory/labrotory.model";
import { Admin } from "./admin.mode";

/* creating department */
const createDepartment = async (data: TDepartment) => {
  const newDepartment: any = await Department.create(data);
  return newDepartment;
};

/* creating labratory */
const createLabratory = async (data: TLaboratory) => {
  const newLabratory: any = await Laboratory.create(data);
  return newLabratory;
};

/**
 * @find_all_admin service
 */

const findAllAdmin = async (query: any) => {
  let searchTerm = "";
  let sort = "-createdAt";
  let limit = 1;
  let page = 1;
  let skip = 0;
  let fields = "-__v";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  if (query?.sort) {
    sort = query?.sort;
  }
  if (query?.limit) {
    limit = query?.limit;
  }
  if (query?.page) {
    page = query?.page;
  }

  if (query?.fields) {
    fields = (query?.fields as string).split(",").join(" ");
    // console.log({ fields });
  }
  // const queryObj: any = { ...query };
  // const excludes = ["searchTerm"];
  // excludes.forEach((el) => delete queryObj[el]);

  skip = (Number(page) - 1) * Number(limit);

  const tempQuery = [
    "contactInfo.email",
    "education.institute",
    "personalInfo.fullName.firstName",
    "personalInfo.fullName.lastName",
    "personalInfo.address.present_address",
    "personalInfo.address.permanent_address",
    "personalInfo.gender",
  ];

  const searchedQuery: any = Admin.find({
    $or: tempQuery.map((field) => ({
      [field]: { $regex: searchTerm },
    })),
  }).populate("user");

  const filteredQuery: any = searchedQuery.find();

  const sortedQuery: any = filteredQuery.sort(sort);

  const paginatedQuery: any = sortedQuery.skip(skip);

  const limitedQuery: any = paginatedQuery.limit(limit);

  const fieldsQuery: any = await limitedQuery.select(fields);

  return fieldsQuery;
};

export const adminServices = {
  createDepartment,
  createLabratory,
  findAllAdmin,
};
