import { Router } from "express";
import { userRole } from "../../interfaces/interfaces";
import validateRequest from "../../middleware/ZodValidator";
import auth from "../../middleware/auth";
import jsonParseData from "../../middleware/jsonParseData";
import { upload } from "../../utils/uploadToCloudinary";
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
  upload.single("file"),
  jsonParseData,
  validateRequest(userValidation),
  validateRequest(adminValidation),
  userControllers.createAdmin,
);

/*  2. create doctor */
router.post(
  "/create-doctor",
  auth(userRole.admin),
  upload.single("file"), //multer
  jsonParseData, //text to json
  validateRequest(userValidation),
  validateRequest(DoctorValidation),
  userControllers.createDoctor,
);

/* 3. create Nurse */

router.post(
  "/create-nurse",
  auth(userRole.admin),
  upload.single("file"),
  jsonParseData,
  validateRequest(userValidation),
  validateRequest(NurseValidation),
  userControllers.createNurse,
);

/* 4. create patient */

router.post(
  "/create-patient",
  upload.single("file"),
  jsonParseData,
  validateRequest(userValidation),
  validateRequest(patientValidation),
  userControllers.createPatient,
);

/* 5. create staff */

router.post(
  "/create-staff",
  auth(userRole.admin),
  upload.single("file"),
  jsonParseData,
  validateRequest(userValidation),
  validateRequest(staffValidation),
  userControllers.createStaff,
);

/*
 *  get me routes
 *
 *  return matched id profile/service
 */
router.get(
  "/me",
  auth(
    userRole.admin,
    userRole.doctor,
    userRole.nurse,
    userRole.patient,
    userRole.staff,
  ),
  userControllers.getMe,
);

// get all user
router.get(
  "/",
  //  auth(userRole.admin),
  userControllers.getAllUser,
);
// router.get("/:userId", userControllers.getUserById);
// router.delete("/:userId", userControllers.deleteUserById);
router.put("/:userId", userControllers.updateUserById);

/* delete doctor */
router.delete(
  "/delete-doctor/:userId",
  auth(userRole.admin),
  userControllers.deleteDocById,
);

/* delete doctor */
/* need super admin here */
router.delete("/delete-admin/:userId", userControllers.deleteAdmin);

export const userRoutes = router;
