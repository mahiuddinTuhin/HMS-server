/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Test from "./Test.model";

/*
 * query for all test
 * return: test document
 */
const findAllTest = async () => {
  const allTest = await Test.find({ isDeleted: false });
  return allTest;
};

/*
 * query for  find Specialization by id
 * return: "allProblems","Specialization name
 */
const findTestById: any = async (id: string) => {
  const test = await Test.findById(id);
  return test;
};

const testService = {
  findAllTest,
  findTestById,
};

export default testService;
