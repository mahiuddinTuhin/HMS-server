import { RequestHandler } from "express";
import { responseToRequest } from "../../utils/ResponseToServer";
import catchAsync from "../../utils/catchAsync";
import { default as testService } from "./test.service";

const findAllTest: RequestHandler = catchAsync(async (req, res) => {
  const allTest = await testService.findAllTest();
  responseToRequest(res, {
    success: true,
    status: 200,
    message: "Successfully retrieved all test.",
    data: allTest,
  });
});

const findTestById: RequestHandler = catchAsync(async (req, res) => {
  const id: string = req.params?.id;
  const test = await testService.findTestById(id);
  responseToRequest(res, {
    success: true,
    status: 200,
    message: "Successfully retrieved test.",
    data: test,
  });
});

const testController = {
  findAllTest,
  findTestById,
};

export default testController;
