import { Router } from "express";
import { default as testController } from "./test.controller";

const router = Router();

/* find  all test */
router.get("/", testController.findAllTest);

/* find  all symptoms */
router.get("/:id", testController.findTestById);

const testRouter = router;

export default testRouter;
