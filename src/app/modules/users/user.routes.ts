import { Router } from "express";

import validateRequest from "../../middleware/ZodValidator";
import isUserExisted from "../../utils/isUserExisted";
import { adminValidation } from "../admin/admin.validation";
import DoctorValidation from "../doctors/doctors.validation";
import NurseValidation from "../nurse/nurse.validation";
import { patientValidation } from "../patients/patient.validation";
import staffValidation from "../staff/staff.validation";
import { userControllers } from "./user.controllers";
import { userValidation } from "./users.zodValidation";

const router = Router();

/* 1. creating admin */
router.post(
  "/create-admin",
  isUserExisted(),
  validateRequest(userValidation),
  validateRequest(adminValidation),
  userControllers.createAdmin,
);

/*  2. create doctor */
router.post(
  "/create-doctor",
  validateRequest(userValidation),
  validateRequest(DoctorValidation),
  userControllers.createDoctor,
);

/* 3. create Nurse */

router.post(
  "/create-nurse",
  validateRequest(userValidation),
  validateRequest(NurseValidation),
  userControllers.createNurse,
);

/* 4. create patient */

router.post(
  "/create-patient",
  validateRequest(userValidation),
  validateRequest(patientValidation),
  userControllers.createPatient,
);

/* 5. create staff */

router.post(
  "/create-staff",
  validateRequest(userValidation),
  validateRequest(staffValidation),
  userControllers.createStaff,
);

router.get("/", userControllers.getAllUser);
router.get("/:userId", userControllers.getUserById);
// router.delete("/:userId", userControllers.deleteUserById);
router.put("/:userId", userControllers.updateUserById);

export const userRoutes = router;
