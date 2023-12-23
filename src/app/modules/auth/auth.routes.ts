import { Router } from "express";
import { userRole } from "../../interfaces/interfaces";
import validateRequest from "../../middleware/ZodValidator";
import auth from "../../middleware/auth";
import authController from "./auth.controller";
import loginValidation, {
  changePasswordValidation,
  forgetPasswordValidation,
  refreshTokenValidation,
} from "./auth.validation";

const router = Router();

/* login routes */
router.post("/login", validateRequest(loginValidation), authController.login);

/* change password routes */
router.post(
  "/change-password",
  auth(
    userRole.admin,
    userRole.doctor,
    userRole.nurse,
    userRole.patient,
    userRole.staff,
  ),
  validateRequest(changePasswordValidation),
  authController.changePassword,
);

/* refresh token create routes */
router.post(
  "/refresh-token",
  validateRequest(refreshTokenValidation),
  authController.refreshToken,
);

/*
 *  forget password routes
 *
 *  return reset link
 */
router.post(
  "/forget-password",
  validateRequest(forgetPasswordValidation),
  authController.forgetPassword,
);

const authRouter = router;

export default authRouter;
